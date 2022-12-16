import { MMKV } from 'react-native-mmkv'
import create, { StateCreator } from 'zustand'
import { persist, StateStorage } from 'zustand/middleware'

function createPersistedStore<T>(
	storeName: string,
	store: StateCreator<T, [['zustand/persist', unknown]], [], T>
) {
	const storage = new MMKV({
		id: storeName,
		encryptionKey: `${storeName}Sd6EqQm4N8xtEAxt`,
	})

	const zustandIntegrationWithMMKV: StateStorage = {
		setItem: (name, value) => {
			return storage.set(name, value)
		},
		getItem: (name) => {
			const value = storage.getString(name)
			return value ?? null
		},
		removeItem: (name) => {
			return storage.delete(name)
		},
	}

	const persistStorage = persist(store, {
		name: storeName,
		getStorage: () => zustandIntegrationWithMMKV,
	})

	return create(persistStorage)
}

export { createPersistedStore }
