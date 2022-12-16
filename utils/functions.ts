import AsyncStorage from '@react-native-async-storage/async-storage'

import { SkipTour } from '@components/Inteface'

export const StoreData = async (value: SkipTour) => {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem('@storage_SkipTour_Key', jsonValue)
		return true
	} catch (_) {
		return false
	}
}

export const GetStoreData = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem('@storage_SkipTour_Key')
		return jsonValue != null ? JSON.parse(jsonValue) : null
	} catch (_) {
		return null
	}
}
