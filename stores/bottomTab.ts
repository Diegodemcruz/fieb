import create from 'zustand'

type IBottomTabStore = {
	showTab: boolean
	tabHollowColor: string
	changeTabVisibility: (showTab: boolean) => void
	changeTabHollowColor: (color: string) => void
	setDefaultTabHollowColor: () => void
}

export const useBottomTabStore = create<IBottomTabStore>((set) => ({
	showTab: true,
	tabHollowColor: '#f5f5f5',
	changeTabVisibility: (showTab) => set((state) => ({ ...state, showTab })),
	changeTabHollowColor: (tabHollowColor) => set((state) => ({ ...state, tabHollowColor })),
	setDefaultTabHollowColor: () => set((state) => ({ ...state, tabHollowColor: '#f5f5f5' })),
}))
