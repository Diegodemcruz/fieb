import { createPersistedStore } from './'

type ITutorialStore = {
	hasSeenTutorialInPaymentScreen: boolean
	hasSeenTutorialInTravelScreen: boolean
	setHasSeenTutorialInPaymentScreen: (hasSeen: boolean) => void
	setHasSeenTutorialInTravelScreen: (hasSeen: boolean) => void
}

export const useTutorialStore = createPersistedStore<ITutorialStore>('tutorial', (set) => ({
	hasSeenTutorialInPaymentScreen: false,
	hasSeenTutorialInTravelScreen: false,
	setHasSeenTutorialInPaymentScreen: (hasSeen) =>
		set((state) => ({ ...state, hasSeenTutorialInPaymentScreen: hasSeen })),
	setHasSeenTutorialInTravelScreen: (hasSeen) =>
		set((state) => ({ ...state, hasSeenTutorialInTravelScreen: hasSeen })),
}))
