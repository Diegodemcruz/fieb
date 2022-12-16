import { HistoricoProps } from '@services/useCases/listarHistoricoDePagamentos/types'

export type ListarPagamentosProps = {
	func_id: number
}

type CustomFieldOnlyInFrontend = {
	formatted_val_arquivo_total: string
	parsed_dtc_geracao: string
	history: HistoricoProps
}

export type PaymentProps = CustomFieldOnlyInFrontend & {
	cod_cnab: number
	des_arquivo: string
	dtc_geracao: string
	dtc_limite: string
	ENTI_ID: number
	COD_EMPRESA: string
	ENTI_NOME: string
	cod_alcada: number
	cod_status: number
	des_justificativa: unknown
	num_bordero: unknown
	cod_estab_pagto: unknown
	cod_portador: unknown
	dtc_atualizacao: string
	des_retorno: unknown
	cod_usuario: number
	des_status: string
	des_alcada: string
	cod_origem_cnab: number
	val_arquivo_total: number
	val_arquivo_bruto: number
	des_arquivo_original: string
	flag_banco: number
	dtc_envio: unknown
	dtc_envio_date: unknown
	tipo_conta: string
	num_agencia_rem: string
	num_banco_rem: string
	num_conta_rem: string
	nome_conta: string
	filial: string
	idcnab: string
	historico: string
	conta_destino: string
	num_digito_conta_rem: string
	tipo_conta_destino: string
	cod_usuario_prim_assin: unknown
	pri_assinante: unknown
	cod_usuario_segu_assin: unknown
	seg_assinante: unknown
	cod_usuario_terc_assin: unknown
	ter_assinante: unknown
	data_prim_assinante: unknown
	data_segun_assinante: unknown
	data_terc_assinante: unknown
}
