import { createPersistedStore } from '@stores'

type IAppSettingsStore = {
	biometricOrFaceIDIsEnabled: boolean
	setBiometricOrFaceIDIsEnabled: (enable: boolean) => void
}

export const useAppSettingsStore = createPersistedStore<IAppSettingsStore>(
	'appSettings',
	(set) => ({
		biometricOrFaceIDIsEnabled: false,
		setBiometricOrFaceIDIsEnabled: (enable: boolean) =>
			set((state) => ({ ...state, biometricOrFaceIDIsEnabled: enable })),
	})
)
