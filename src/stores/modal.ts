import type { Show } from '@/types';
import { create } from 'zustand';

interface ModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
  firstLoad: boolean;
  show: Show | null;
  setShow: (show: Show | null) => void;
  play: boolean;
  setPlay: (play: boolean) => void;
  // track navigation context
  previousPath: string | null;
  setPreviousPath: (path: string | null) => void;
  pushedSlug: boolean; // true if we changed the URL to a slug when opening
  setPushedSlug: (value: boolean) => void;
  reset: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  open: false,
  setOpen: (open: boolean) => set(() => ({ open })),
  firstLoad: false,
  setFirstLoad: (firstLoad: boolean) => set(() => ({ firstLoad })),
  show: null,
  setShow: (show: Show | null) => set(() => ({ show })),
  play: false,
  setPlay: (play: boolean) => set(() => ({ play })),
  previousPath: null,
  setPreviousPath: (path: string | null) => set(() => ({ previousPath: path })),
  pushedSlug: false,
  setPushedSlug: (value: boolean) => set(() => ({ pushedSlug: value })),
  reset: () =>
    set(() => ({
      show: null,
      open: false,
      play: false,
      firstLoad: false,
      previousPath: null,
      pushedSlug: false,
    })),
}));
