import create from 'zustand'

type ILocalAuthenticationStore = {
	hasAuthenticatedWithBiometricOrFaceID: boolean
	setHasAuthenticatedWithBiometricOrFaceID: (enable: boolean) => void
}

export const useLocalAuthenticationStore = create<ILocalAuthenticationStore>((set) => ({
	hasAuthenticatedWithBiometricOrFaceID: false,
	setHasAuthenticatedWithBiometricOrFaceID: (has: boolean) =>
		set((state) => ({ ...state, hasAuthenticatedWithBiometricOrFaceID: has })),
}))
