import api from '@services/api'

import { listarViagensProps, TravelProps } from './types'

const listarViagens = ({ email }: listarViagensProps) => {
	return api.post<TravelProps[]>(`Reserve/consultar_planos_reserve?email=${email}`)
}

export { TravelProps, listarViagens as default }
