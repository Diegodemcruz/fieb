import { createPersistedStore } from '@stores'

import { useAppSettingsStore } from './appSettings'

export type IUserStore = {
	id: string
	Ativo: boolean
	token: string
	email: string
	login: string
	nome: string
	urlFoto: string
	setUser: (user: Omit<IUserStore, 'setToken' | 'setUser' | 'logOut'>) => void
	logOut: () => void
}

const initialData = {
	id: '',
	Ativo: false,
	token: '',
	email: '',
	login: '',
	nome: '',
	foto: '',
	urlFoto: '',
}

export const useUserStore = createPersistedStore<IUserStore>('user', (set) => ({
	...initialData,
	setUser: (user) => set((state) => ({ ...state, ...user })),
	logOut: () => {
		useAppSettingsStore.setState({
			biometricOrFaceIDIsEnabled: false,
		})

		set((state) => ({
			...state,
			...initialData,
		}))
	},
}))
