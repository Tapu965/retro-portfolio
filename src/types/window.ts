import type { AppKey } from './icon';

export type WindowState = {
  id: string;

  appKey: AppKey;

  title: string;
  iconKey: AppKey;

  x: number;
  y: number;
  width: number;
  height: number;

  isMinimized: boolean;
  isMaximized: boolean;

  prevBounds?: { x: number; y: number; width: number; height: number };
};
