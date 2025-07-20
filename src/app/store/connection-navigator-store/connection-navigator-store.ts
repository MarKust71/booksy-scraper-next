import { create } from 'zustand'

import { NavigatorState } from '@/app/store/connection-navigator-store/connection-navigator-store.types'

export const useConnectionNavigatorStore = create<NavigatorState>()((set) => ({
  index: 0,
  connection: null,
  setIndex: (i) => set({ index: i }),
  setConnection: (c) => set({ connection: c })
}))
