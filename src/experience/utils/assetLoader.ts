/**
 * Asset loader for the Experience Engine.
 * Fetches and caches scene assets (textures, models, JSON).
 * Returns typed promises with progress reporting.
 */

import type { AssetFile, AssetManifest } from '../types/core';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LoadProgress {
  loaded: number;     // bytes loaded so far
  total: number;      // total bytes expected
  ratio: number;      // 0–1
  filesComplete: number;
  filesTotal: number;
}

export type ProgressCallback = (progress: LoadProgress) => void;

export interface LoadResult {
  path: string;
  type: AssetFile['type'];
  data: string | ArrayBuffer | object | null;
}

// ─── Cache ────────────────────────────────────────────────────────────────────

const _cache = new Map<string, LoadResult>();

export function clearAssetCache(): void {
  _cache.clear();
}

export function isAssetCached(path: string): boolean {
  return _cache.has(path);
}

// ─── Single Asset Fetch ───────────────────────────────────────────────────────

async function fetchAsset(
  file: AssetFile,
  signal?: AbortSignal
): Promise<LoadResult> {
  if (_cache.has(file.path)) {
    return _cache.get(file.path)!;
  }

  const response = await fetch(file.path, { signal });

  if (!response.ok) {
    throw new Error(
      `Asset load failed: ${file.path} (HTTP ${response.status})`
    );
  }

  let data: LoadResult['data'] = null;

  switch (file.type) {
    case 'texture': {
      const blob = await response.blob();
      data = URL.createObjectURL(blob);
      break;
    }
    case 'model': {
      data = await response.arrayBuffer();
      break;
    }
    case 'json': {
      data = await response.json() as object;
      break;
    }
    case 'audio': {
      data = await response.arrayBuffer();
      break;
    }
    default: {
      data = await response.text();
    }
  }

  const result: LoadResult = { path: file.path, type: file.type, data };
  _cache.set(file.path, result);
  return result;
}

// ─── Manifest Load ────────────────────────────────────────────────────────────

export interface ManifestLoadResult {
  required: LoadResult[];
  optional: LoadResult[];
  failed: Array<{ file: AssetFile; error: Error }>;
}

/**
 * Loads all assets in a manifest.
 * Required assets must all succeed before the promise resolves.
 * Optional asset failures are collected but do not reject.
 */
export async function loadAssetManifest(
  manifest: AssetManifest,
  options: {
    onProgress?: ProgressCallback;
    signal?: AbortSignal;
  } = {}
): Promise<ManifestLoadResult> {
  const { onProgress, signal } = options;
  const { files, totalBytes } = manifest;

  if (files.length === 0) {
    return { required: [], optional: [], failed: [] };
  }

  const required: LoadResult[] = [];
  const optional: LoadResult[] = [];
  const failed: Array<{ file: AssetFile; error: Error }> = [];

  let bytesLoaded = 0;
  let filesComplete = 0;
  const filesTotal = files.length;

  const emitProgress = () => {
    if (onProgress) {
      onProgress({
        loaded: bytesLoaded,
        total: totalBytes,
        ratio: totalBytes > 0 ? bytesLoaded / totalBytes : 1,
        filesComplete,
        filesTotal,
      });
    }
  };

  emitProgress();

  // Load required assets first (parallel)
  const requiredFiles = files.filter((f) => f.required);
  const optionalFiles = files.filter((f) => !f.required);

  await Promise.all(
    requiredFiles.map(async (file) => {
      try {
        const result = await fetchAsset(file, signal);
        required.push(result);
        bytesLoaded += file.bytes;
        filesComplete++;
        emitProgress();
      } catch (error) {
        if (signal?.aborted) throw error; // re-throw abort
        failed.push({ file, error: error as Error });
        filesComplete++;
        emitProgress();
        // Rethrow required asset failures
        throw new Error(`Required asset failed: ${file.path}`);
      }
    })
  );

  // Load optional assets (parallel, failures tolerated)
  await Promise.allSettled(
    optionalFiles.map(async (file) => {
      try {
        const result = await fetchAsset(file, signal);
        optional.push(result);
        bytesLoaded += file.bytes;
      } catch (error) {
        if (signal?.aborted) return;
        failed.push({ file, error: error as Error });
      } finally {
        filesComplete++;
        emitProgress();
      }
    })
  );

  return { required, optional, failed };
}
