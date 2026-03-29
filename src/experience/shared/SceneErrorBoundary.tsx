'use client';

/**
 * SceneErrorBoundary — React class component error boundary for scene components.
 *
 * Catches render errors thrown by scene components and replaces them with the
 * provided fallback, without crashing the rest of the page.
 *
 * Must be a class component — React does not support hooks-based error boundaries.
 */

import React from 'react';

interface Props {
  sceneId: string;
  fallback: React.ReactNode;
  onError?: (error: Error) => void;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SceneErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error(
      `[SceneErrorBoundary] Scene "${this.props.sceneId}" threw:`,
      error,
      info.componentStack
    );
    this.props.onError?.(error);
  }

  override render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
