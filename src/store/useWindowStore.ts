import { create } from 'zustand';
import type { WindowState } from '../types/window';
import type { AppKey } from '../types/icon';
import { DESKTOP_ICONS } from '../data/icons';

type OpenOptions = {
  appKey: AppKey;
  /** Optional override */
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

interface WindowStore {
  windows: WindowState[];

  open: (opts: OpenOptions) => void;
  close: (id: string) => void;
  closeAll: () => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  restore: (id: string) => void;
  toggleMaximize: (id: string) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, width: number, height: number, x?: number, y?: number) => void;

  /** Brings minimized window to front or opens fresh */
  taskbarClick: (id: string) => void;
}

let idCounter = 0;
const nextId = () => `w${++idCounter}`;

/** Cascade positions so windows don't stack perfectly */
function cascadeIndex(count: number) {
  return {
    x: 80 + (count % 5) * 32,
    y: 60 + (count % 5) * 32,
  };
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],

  open: ({ appKey, x, y, width, height }) => {
    const state = get();

    // If the app is already open → focus it (don't duplicate)
    const existing = state.windows.find((w) => w.appKey === appKey);
    if (existing) {
      state.restore(existing.id);
      return;
    }

    const def = DESKTOP_ICONS.find((i) => i.appKey === appKey);
    const size = def?.defaultSize ?? { width: 520, height: 400 };
    const pos = cascadeIndex(state.windows.length);

    const newWindow: WindowState = {
      id: nextId(),
      appKey,
      iconKey: appKey,
      title: def?.label ?? appKey,
      x: x ?? pos.x,
      y: y ?? pos.y,
      width: width ?? size.width,
      height: height ?? size.height,
      isMinimized: false,
      isMaximized: false,
    };

    set({ windows: [...state.windows, newWindow] });
  },

  close: (id) => {
    set((state) => ({ windows: state.windows.filter((w) => w.id !== id) }));
  },

  closeAll: () => set({ windows: [] }),

  focus: (id) => {
    set((state) => {
      const target = state.windows.find((w) => w.id === id);
      if (!target) return state;

      // Already at the end → no change
      const idx = state.windows.findIndex((w) => w.id === id);
      if (idx === state.windows.length - 1 && !target.isMinimized) return state;

      const others = state.windows.filter((w) => w.id !== id);
      return {
        windows: [...others, { ...target, isMinimized: false }],
      };
    });
  },

  minimize: (id) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
    }));
  },

  restore: (id) => {
    set((state) => {
      const target = state.windows.find((w) => w.id === id);
      if (!target) return state;
      const others = state.windows.filter((w) => w.id !== id);
      return {
        windows: [...others, { ...target, isMinimized: false }],
      };
    });
  },

  toggleMaximize: (id) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id !== id) return w;

        if (w.isMaximized && w.prevBounds) {
          // Restore
          return {
            ...w,
            ...w.prevBounds,
            isMaximized: false,
            prevBounds: undefined,
          };
        }

        // Maximize
        return {
          ...w,
          prevBounds: { x: w.x, y: w.y, width: w.width, height: w.height },
          x: 8,
          y: 8,
          width: window.innerWidth - 16,
          height: window.innerHeight - 64, // leave room for taskbar
          isMaximized: true,
        };
      }),
    }));
  },

  move: (id, x, y) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    }));
  },

  resize: (id, width, height, x, y) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, width, height, x: x ?? w.x, y: y ?? w.y } : w
      ),
    }));
  },

  taskbarClick: (id) => {
    const { windows, restore, focus, minimize } = get();
    const win = windows.find((w) => w.id === id);
    if (!win) return;

    if (win.isMinimized) {
      restore(id);
    } else if (windows[windows.length - 1]?.id === id) {
      // Already focused → minimize
      minimize(id);
    } else {
      focus(id);
    }
  },
}));
