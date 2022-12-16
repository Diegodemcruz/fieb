import api from '@services/api'

import { HistoricoProps, ListarHistoricoDePagamentosProps } from './types'

const listarHistoricoDePagamentos = ({
	cod_cnab,
	des_arquivo,
}: ListarHistoricoDePagamentosProps) => {
	return api.post<HistoricoProps | string>('Spef/listar_historico', { cod_cnab, des_arquivo })
}

export { HistoricoProps, listarHistoricoDePagamentos as default }
