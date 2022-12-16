import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import Toast from 'react-native-root-toast'

import { useTutorialStore } from '@stores/tutorial'
import { useUserStore } from '@stores/user'

const api = axios.create({
	baseURL: 'https://h-sistemas.sesibahia.com.br/apiappaorporativo/api',
})

api.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token = useUserStore.getState().token

		if (token) {
			Object.assign(config, {
				headers: {
					...config.headers,
					Authorization: `Bearer ${token}`,
				},
			})
		}

		return Promise.resolve(config)
	},
	(error) => {
		return Promise.reject(error)
	}
)

api.interceptors.response.use(
	(response) => {
		return response
	},
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			useUserStore.setState({
				token: undefined,
			})

			useTutorialStore.setState({
				hasSeenTutorialInPaymentScreen: false,
				hasSeenTutorialInTravelScreen: false,
			})

			Toast.show('Sua sessão expirou, faça login novamente', {
				position: Toast.positions.BOTTOM,
				duration: 4000,
			})
		}

		return Promise.reject(error)
	}
)

export default api
