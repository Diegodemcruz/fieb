import api from '@services/api'

import { ListarPagamentosProps, PaymentProps } from './types'

const listarPagamentos = ({ func_id }: ListarPagamentosProps) => {
	return api.post<PaymentProps[]>('Spef/listar_aprovacoes', { func_id })
}

export { PaymentProps, listarPagamentos as default }
