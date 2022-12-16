export type ListarHistoricoDePagamentosProps = {
	cod_cnab: string
	des_arquivo: string
}

type ListaCnab = {
	Agencia: string
	Banco: string
	Conta: string
	DataPagamento: string
	Favorecido: string
	Filial: string
	Historico: string
	Valor: string
}

export type HistoricoProps = {
	ListaCnab: ListaCnab[]
	Mensagem: string
	NomeArquivo: string
	Remetente: string
	TipoConta: string
	ValorCnab: string
}
