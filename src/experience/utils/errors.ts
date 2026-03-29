/**
 * Error types for the Experience Engine.
 * All scene-related errors extend SceneError so they can be caught and handled
 * uniformly by SceneErrorBoundary and the lifecycle manager.
 */

import type { FallbackReason } from '../types/core';

// ─── Base Scene Error ─────────────────────────────────────────────────────────

export class SceneError extends Error {
  readonly sceneId: string;
  readonly fallbackReason: FallbackReason;

  constructor(
    message: string,
    sceneId: string,
    fallbackReason: FallbackReason = 'unknown'
  ) {
    super(message);
    this.name = 'SceneError';
    this.sceneId = sceneId;
    this.fallbackReason = fallbackReason;
  }
}

// ─── Specific Error Types ─────────────────────────────────────────────────────

export class SceneNotFoundError extends SceneError {
  constructor(sceneId: string) {
    super(
      `Scene "${sceneId}" is not registered in SCENE_REGISTRY.`,
      sceneId,
      'unknown'
    );
    this.name = 'SceneNotFoundError';
  }
}

export class SceneAssetError extends SceneError {
  constructor(sceneId: string, assetPath: string) {
    super(
      `Failed to load required asset "${assetPath}" for scene "${sceneId}".`,
      sceneId,
      'asset-load-failed'
    );
    this.name = 'SceneAssetError';
  }
}

export class SceneChunkError extends SceneError {
  constructor(sceneId: string, originalError: Error) {
    super(
      `Failed to load scene component chunk for "${sceneId}": ${originalError.message}`,
      sceneId,
      'chunk-load-failed'
    );
    this.name = 'SceneChunkError';
  }
}

export class SceneRenderError extends SceneError {
  constructor(sceneId: string, originalError: Error) {
    super(
      `Scene "${sceneId}" threw a render error: ${originalError.message}`,
      sceneId,
      'scene-error'
    );
    this.name = 'SceneRenderError';
  }
}

export class SceneWebGLError extends SceneError {
  constructor(sceneId: string) {
    super(
      `WebGL context is unavailable for scene "${sceneId}".`,
      sceneId,
      'webgl-unavailable'
    );
    this.name = 'SceneWebGLError';
  }
}

// ─── Type guard ───────────────────────────────────────────────────────────────

export function isSceneError(error: unknown): error is SceneError {
  return error instanceof SceneError;
}
