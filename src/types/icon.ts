import type { ComponentType } from 'react';

export type AppKey = 'about' | 'projects' | 'skills' | 'contact' | 'resume' | 'readme';

export type IconDef = {
  /** Unique app id matches a registry key in `appRegistry.ts` */
  appKey: AppKey;
  /** Label shown under the icon on the desktop */
  label: string;
  /** Filename shown in taskbar / terminal  e.g. "about.exe" */
  filename: string;
  /** SVG icon component */
  Icon: ComponentType<{ className?: string }>;
  /** Optional default window size hint*/
  defaultSize?: { width: number; height: number };
};
