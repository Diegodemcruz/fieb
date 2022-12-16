/* eslint-disable @typescript-eslint/no-explicit-any */
export type listarViagensProps = {
	email: string
}

type CustomFieldOnlyInFrontend = {
	totalPlanejadoFormatado: string
}

export type TravelProps = CustomFieldOnlyInFrontend & {
	id: number
	nome: string
	descricao: string
	tipo: Tipo
	moeda: string
	status: string
	area: string
	dataInicio: string
	dataFim: string
	empresa: Empresa
	centrosDeCusto: CentrosDeCusto[]
	projeto: Projeto
	atividade: Atividade
	solicitante: Solicitante
	favorecido: Favorecido
	despesas: any[]
	itensDePlanejamento: ItensDePlanejamento[]
	servicos: Servico2[]
	totalDeDespesas: number
	totalPlanejado: number
	totalAutorizacaoDespesas: number
	totalAutorizacaoPlanejamento: number
	politicas: Politica3[]
	dataCriacao: string
	dataAlteracao: string
	conferencias: any[]
	autorizacoes: Autorizac[]
	pagamentos: any[]
	devolucoes: any[]
	geradoAutomaticamente: boolean
	modoDeUsoCentroDeCusto: string
	saldosReembolsaveis: any[]
	historicos: Historico[]
	camposExtras: CamposExtra[]
	orcamentoTransacoes: any[]
	tags: any[]
	liberarAlteracaoDoPeriodo: boolean
	quantidadePoliticasCumpridas: number
	quantidadePoliticasVioladas: number
	bloqueiaItemSemPoliticaAssociada: boolean
}

type Tipo = {
	id: number
	nome: string
	categoria: string
	empresa: any
	moeda: string
	servicoViagem: string
	ocultaPeriodo: boolean
	exibeSumario: boolean
	permiteComprovante: boolean
	perfilPolitica: PerfilPolitica
	valorUnitario: number
	classe: any
	permiteDataForaVigencia: boolean
	unidade: any
	tipoVeiculo: any
	adiantamentoNaoRequerPagamento: boolean
	semValorContabil: boolean
	despesaAutomatica: boolean
	formasPagto: any
	formaPagtoPadrao: any
	contaContabil: any
	despesaPossuiPeriodo: boolean
	usaValorAdicional: boolean
	mascaraValorAdicional: any
	usaRateioFavorecido: boolean
	especial: boolean
	usaDesconto: boolean
	mascaraDesconto: any
	usaDescricao: boolean
	usaComprovante: boolean
	usaData: boolean
	itemDeDiaria: boolean
}

type PerfilPolitica = {
	id: number
	nome: string
	bloqueiaItemSemPoliticaAssociada: boolean
}

type Empresa = {
	id: number
	nome: string
	empresaPagadora: boolean
	apelido: string
	grupo: Grupo
	parametros: Parametros
}

type Grupo = {
	id: number
	nome: string
	idLicenciadoExpense: number
}

type Parametros = {
	menorTarifa: boolean
	rotuloProjeto: string
	usaMotivoDoGrupo: boolean
	projetoObrigatorio: boolean
	usaCentroDeCusto: boolean
	usaAutorizacaoPorDelegacao: boolean
	ocultaBlogEmPedidos: boolean
	formaPagtoPedido: string[]
	solicitanteCadastraCentroDeCusto: boolean
	usa99Taxis: boolean
	usaAtividade: boolean
	criarTipoDePlanoAPartirDaReservaPadrao: boolean
	comprovanteDevolucaoObrigatorio: boolean
	usaProjeto: boolean
	solicitanteCadastraMotivo: boolean
	usaAtividadeDoGrupo: boolean
	usaMapaAutorizacao: boolean
	centroDeCustoObrigatorio: boolean
	usaMotivo: boolean
	modoDeExibicaoDoAutorizador: string
	motivoObrigatorio: boolean
	solicitanteCadastraProjeto: boolean
	limiteCentrosDeCustoRateio: number
	rotuloAtividade: string
	permiteCadastrarNovoPaxNoPedido: boolean
	menorTarifaEmAeroportosDiferentes: boolean
	usaRateioCentroDeCusto: number
	diasParaExpiracaoDaSenha: any
	usaCentroDeCustoDoGrupo: any
	atividadeObrigatoria: boolean
	servicosPermitidos: string[]
	autorizadorEscolheReserva: boolean
	modoDeUsoCentroDeCusto: string
	usuarioEditaDadosBancarios: boolean
	usaProjetoDoGrupo: boolean
	permiteSolicitanteAdicionarReservaEmPedido: boolean
	solicitanteCadastraAtividade: boolean
	exigeVoucherComoComprovante: boolean
	diasRetroativos: any
}

type CentrosDeCusto = {
	id: number
	tipo: string
	rateio: number
	centroDeCusto: CentroDeCusto
	nome: any
}

type CentroDeCusto = {
	id: number
	nome: string
	excluido: boolean
	centroDeCusto: any
	rateio: number
}

type Projeto = {
	id: number
	nome: string
}

type Atividade = {
	id: number
	nome: string
}

type Solicitante = {
	id: number
	nome: string
	empresa: Empresa2
	expense: Expense
	departamento: Departamento
	registraDespesa: boolean
	criaPlano: boolean
	editaPlano: boolean
	excluiPlano: boolean
	usuarioAgencia: boolean
}

type Empresa2 = {
	id: number
	nome: string
	empresaPagadora: boolean
	apelido: string
	grupo: any
	parametros: any
}

type Expense = {
	solicitante: boolean
	autorizador: boolean
	financeiro: boolean
	autorizaGrupoEmpresa: boolean
	solicitaAdiantamentos: boolean
	autorizaPropriosPlanos: boolean
	autorizaPlanosSolicitados: boolean
	recebeSolicitacaoAutorizacao: boolean
	recebeSolicitacaoPagamento: boolean
	recebeConfirmacaoAutorizacao: boolean
	favorecido: boolean
}

type Departamento = {
	id: number
	nome: string
}

type Favorecido = {
	id: number
	nome: string
	primeiroNome: string
	sobrenome: string
	rg: string
	cpf: string
	matricula: string
	email: string
	empresa: Empresa3
	contaBancaria: any
	veiculos: any[]
	grupos: Grupo2[]
	departamento: Departamento2
	registraDespesa: boolean
	criaPlano: boolean
	editaPlano: boolean
	excluiPlano: boolean
	usuarioAgencia: boolean
}

type Empresa3 = {
	id: number
	nome: string
	empresaPagadora: boolean
	apelido: string
	grupo: any
	parametros: any
}

type Grupo2 = {
	id: number
	nome: string
	idLicenciadoExpense: number
}

type Departamento2 = {
	id: number
	nome: string
}

type ItensDePlanejamento = {
	tipoDeItem: string
	id: number
	valorDiario: ValorDiario
	nome: string
	adiantamentoPago: boolean
	tipo: Tipo2
	data: string
	valor: Valor
	valorOriginal: ValorOriginal
	valorSolicitado: ValorSolicitado
	moeda: string
	cambio: number
	solicitante: Solicitante2
	area: string
	valorUnitario: number
	unidade?: string
	status: string
	idPlano: number
	dataCriacao: string
	plano: Plano
	origem: Origem
	destino: Destino
	dataFim: string
	valorConferido?: ValorConferido
	valorAutorizado?: ValorAutorizado
	servico?: Servico
	valorAdicional?: number
	dataSolicitacao: string
	observacoesSolicitante?: string
}

type ValorDiario = {
	valorBase: number
	total: number
	totalConvertido: number
}

type Tipo2 = {
	id: number
	nome: string
	categoria: string
	empresa: any
	moeda: any
	servicoViagem: any
	ocultaPeriodo: boolean
	exibeSumario: boolean
	permiteComprovante: boolean
	perfilPolitica: any
	valorUnitario: number
	classe: string
	permiteDataForaVigencia: boolean
	unidade: string
	tipoVeiculo: string
	adiantamentoNaoRequerPagamento: boolean
	semValorContabil: boolean
	despesaAutomatica: boolean
	formasPagto: string[]
	formaPagtoPadrao: string
	contaContabil: ContaContabil
	despesaPossuiPeriodo: boolean
	usaValorAdicional: boolean
	mascaraValorAdicional: string
	usaRateioFavorecido: boolean
	especial: boolean
	usaDesconto: boolean
	mascaraDesconto: string
	usaDescricao: boolean
	usaComprovante: boolean
	usaData: boolean
	itemDeDiaria: boolean
}

type ContaContabil = {
	id: number
	descricao: string
}

type Valor = {
	valorBase: number
	total: number
	totalConvertido: number
	id: number
	nome: any
	obrigatorio: boolean
	permiteRateio: boolean
}

type ValorOriginal = {
	valorBase: number
	total: number
	totalConvertido: number
}

type ValorSolicitado = {
	valorBase: number
	total: number
	totalConvertido: number
}

type Solicitante2 = {
	id: number
	nome: string
	empresa: any
	expense: any
	departamento: any
	registraDespesa: boolean
	criaPlano: boolean
	editaPlano: boolean
	excluiPlano: boolean
	usuarioAgencia: boolean
}

type Plano = {
	id: number
	nome: string
	status: string
}

type Origem = any

type Destino = any

type ValorConferido = {
	valorBase: number
	total: number
	totalConvertido: number
}

type ValorAutorizado = {
	valorBase: number
	total: number
	totalConvertido: number
}

type Servico = {
	id: number
	tipo: string
	viagem: Viagem
	idViagem: number
	status: string
	excluido: boolean
}

type Viagem = {
	id: number
	tipoServico: string
	status: string
	solicitante: Solicitante3
	passageiros: Passageiro[]
	reservaEscolhida: ReservaEscolhida
	itensSolicitados: ItensSolicitado[]
	centrosDeCusto: CentrosDeCusto2[]
	centroDeCusto: CentroDeCusto3
	statusAutorizacao: string
	integrado: boolean
	remarcacao: boolean
	dadosDePagamento: DadosDePagamento
}

type Solicitante3 = {
	id: number
	nome: string
	empresa: any
	expense: any
	departamento: any
	registraDespesa: boolean
	criaPlano: boolean
	editaPlano: boolean
	excluiPlano: boolean
	usuarioAgencia: boolean
}

type Passageiro = {
	id: number
	nomeCompleto: string
	primeiroNome: string
	sobrenome: string
	bilhete: any
	usuario: Usuario
	usuarioTitular: UsuarioTitular
	tipo: string
}

type Usuario = {
	idUsuario: number
	login: any
	senha: any
	role: any
	urlCrm: any
	urlToken: any
	urlRecurso: any
	ativo: boolean
}

type UsuarioTitular = {
	id: number
	nome: string
	email: string
	registraDespesa: boolean
	criaPlano: boolean
	editaPlano: boolean
	excluiPlano: boolean
	usuarioAgencia: boolean
}

type ReservaEscolhida = {
	indice: number
	codReserva: string
	codSisRes: string
	itens: Iten[]
	total: number
	totalPorPassageiro: number
	cambio: number
	moedaTarifa: string
	status: string
	tarifa: number
	taxas: number
	taxaDeServico: number
	dataCriacao: string
	prazo: string
	politicas: Politica[]
	prazoIgnorado: boolean
	tipo: string
	online: boolean
	assentos: any[]
	taxasInclusas: boolean
	tarifaReferencia: number
	tarifaPromocional: number
	tarifaAcordo: number
	menorTarifa: number
	menorTarifaTaxas: number
	menorTarifaTaxasServico: number
	maiorTarifa: number
	maiorTarifaTaxas: number
	maiorTarifaTaxasServico: number
}

type Iten = {
	id: number
	codOrigem: string
	origem: string
	codDestino: string
	destino: string
	dataInicio: string
	dataFim: string
	tipoOnibus: any
	numeroDoVoo: string
	codCiaVenda: string
	nomeCiaVenda: string
	codCiaOperadora: string
	classe: string
	franquiaBagagem: number
	itemPai: any
	valorRateio: number
	valor: any
}

type Politica = {
	tipo: string
	valor: any
	status: string
	tratamento: string
	valorMenorTarifa: number
	moedaMenorTarifa?: string
	id: number
	valorPlano: any
	area: any
	itensPoliticaViolada: any
	adiantamentoAutomatico: boolean
	gruposASeremNotificados: any
	gruposDePalavras: any
	periodicidade: any
	limitarValorAutorizado: any
	tipoLimiteOcorrencias: any
	comprovanteObrigatorio: any
	requerAdiantamentoPrevio: any
	tipoDePlano: any
	validarComprovanteDuplicado: any
	validarItensNaoPermitidosNosComprovantes: any
	tipoItemPlano: any
	antecedenciaMinimaParaSolicitacao: any
}

type ItensSolicitado = {
	id: number
	codOrigem: string
	origem: string
	codDestino: string
	destino: string
	dataInicio: string
	dataFim: string
	tipoOnibus: any
	classe: string
}

type CentrosDeCusto2 = {
	id: number
	tipo: any
	rateio: number
	centroDeCusto: CentroDeCusto2
	nome: string
}

type CentroDeCusto2 = {
	id: number
	nome: string
	excluido: boolean
	centroDeCusto: any
	rateio: number
}

type CentroDeCusto3 = {
	id: number
	nome: string
	excluido: boolean
	centroDeCusto: CentroDeCusto4
	rateio: number
}

type CentroDeCusto4 = {
	id: number
	nome: string
	excluido: boolean
	centroDeCusto: any
	rateio: number
}

type DadosDePagamento = {
	rotulo: string
	cartao: string
	bandeira: string
	dinamico: boolean
}

type Servico2 = {
	id: number
	tipo: string
	viagem: Viagem2
	idViagem: number
	status: string
	excluido: boolean
}

type Viagem2 = {
	id: number
	tipoServico: string
	status: string
	solicitante: Solicitante4
	passageiros: Passageiro2[]
	reservaEscolhida: ReservaEscolhida2
	itensSolicitados: ItensSolicitado2[]
	centrosDeCusto: CentrosDeCusto3[]
	centroDeCusto: CentroDeCusto6
	statusAutorizacao: string
	integrado: boolean
	remarcacao: boolean
	dadosDePagamento: DadosDePagamento2
}

type Solicitante4 = {
	id: number
	nome: string
	empresa: any
	expense: any
	departamento: any
	registraDespesa: boolean
	criaPlano: boolean
	editaPlano: boolean
	excluiPlano: boolean
	usuarioAgencia: boolean
}

type Passageiro2 = {
	id: number
	nomeCompleto: string
	primeiroNome: string
	sobrenome: string
	bilhete: any
	usuario: Usuario2
	usuarioTitular: UsuarioTitular2
	tipo: string
}

type Usuario2 = {
	idUsuario: number
	login: any
	senha: any
	role: any
	urlCrm: any
	urlToken: any
	urlRecurso: any
	ativo: boolean
}

type UsuarioTitular2 = {
	id: number
	nome: string
	email: string
	registraDespesa: boolean
	criaPlano: boolean
	editaPlano: boolean
	excluiPlano: boolean
	usuarioAgencia: boolean
}

type ReservaEscolhida2 = {
	indice: number
	codReserva: string
	codSisRes: string
	itens: Iten2[]
	total: number
	totalPorPassageiro: number
	cambio: number
	moedaTarifa: string
	status: string
	tarifa: number
	taxas: number
	taxaDeServico: number
	dataCriacao: string
	prazo: string
	politicas: Politica2[]
	prazoIgnorado: boolean
	tipo: string
	online: boolean
	assentos: any[]
	taxasInclusas: boolean
	tarifaReferencia: number
	tarifaPromocional: number
	tarifaAcordo: number
	menorTarifa: number
	menorTarifaTaxas: number
	menorTarifaTaxasServico: number
	maiorTarifa: number
	maiorTarifaTaxas: number
	maiorTarifaTaxasServico: number
}

type Iten2 = {
	id: number
	codOrigem: string
	origem: string
	codDestino: string
	destino: string
	dataInicio: string
	dataFim: string
	tipoOnibus: any
	numeroDoVoo: string
	codCiaVenda: string
	nomeCiaVenda: string
	codCiaOperadora: string
	classe: string
	franquiaBagagem: number
	itemPai: any
	valorRateio: number
	valor: any
}

type Politica2 = {
	tipo: string
	valor: any
	status: string
	tratamento: string
	valorMenorTarifa: number
	moedaMenorTarifa?: string
	id: number
	valorPlano: any
	area: any
	itensPoliticaViolada: any
	adiantamentoAutomatico: boolean
	gruposASeremNotificados: any
	gruposDePalavras: any
	periodicidade: any
	limitarValorAutorizado: any
	tipoLimiteOcorrencias: any
	comprovanteObrigatorio: any
	requerAdiantamentoPrevio: any
	tipoDePlano: any
	validarComprovanteDuplicado: any
	validarItensNaoPermitidosNosComprovantes: any
	tipoItemPlano: any
	antecedenciaMinimaParaSolicitacao: any
}

type ItensSolicitado2 = {
	id: number
	codOrigem: string
	origem: string
	codDestino: string
	destino: string
	dataInicio: string
	dataFim: string
	tipoOnibus: any
	classe: string
}

type CentrosDeCusto3 = {
	id: number
	tipo: any
	rateio: number
	centroDeCusto: CentroDeCusto5
	nome: string
}

type CentroDeCusto5 = {
	id: number
	nome: string
	excluido: boolean
	centroDeCusto: any
	rateio: number
}

type CentroDeCusto6 = {
	id: number
	nome: string
	excluido: boolean
	centroDeCusto: CentroDeCusto7
	rateio: number
}

type CentroDeCusto7 = {
	id: number
	nome: string
	excluido: boolean
	centroDeCusto: any
	rateio: number
}

type DadosDePagamento2 = {
	rotulo: string
	cartao: string
	bandeira: string
	dinamico: boolean
}

type Politica3 = {
	tipo: string
	valor?: number
	status: string
	tratamento: string
	valorMenorTarifa: number
	moedaMenorTarifa: any
	id: number
	valorPlano?: string
	area?: string
	itensPoliticaViolada: any[]
	adiantamentoAutomatico: boolean
	gruposASeremNotificados: any[]
	gruposDePalavras: any[]
	periodicidade?: string
	limitarValorAutorizado?: boolean
	tipoLimiteOcorrencias?: string
	comprovanteObrigatorio?: boolean
	requerAdiantamentoPrevio?: boolean
	tipoDePlano?: TipoDePlano
	validarComprovanteDuplicado?: boolean
	validarItensNaoPermitidosNosComprovantes?: boolean
	tipoItemPlano: any
	antecedenciaMinimaParaSolicitacao: any
}

type TipoDePlano = {
	id: number
	nome: string
}

type Autorizac = {
	id: number
	idItem: number
	autorizadorNotificado: AutorizadorNotificado
	autorizador: any
	dataAutorizacao: string
	nivel: number
	autorizado: boolean
}

type AutorizadorNotificado = {
	id: number
	nome: string
	suspenso: boolean
	autorizadorDelegado: any
	inicioVigenciaDaAutorizacaoDelegada: string
	vigenciaDaAutorizacaoDelegada: string
	registraDespesa: boolean
	criaPlano: boolean
	editaPlano: boolean
	excluiPlano: boolean
	usuarioAgencia: boolean
}

type Historico = {
	id: number
	data: string
	operacao: string
	usuario: Usuario3
}

type Usuario3 = {
	id: number
	nome: string
	email: any
	registraDespesa: boolean
	criaPlano: boolean
	editaPlano: boolean
	excluiPlano: boolean
	usuarioAgencia: boolean
	primeiroNome: string
	sobrenome: string
}

type CamposExtra = {
	id: number
	valor: Valor2
	itens: Iten3[]
}

type Valor2 = {
	valorBase: number
	total: number
	totalConvertido: number
	id: number
	nome: string
	obrigatorio: boolean
	permiteRateio: boolean
}

type Iten3 = {
	id: number
	codOrigem: any
	origem: any
	codDestino: any
	destino: any
	dataInicio: string
	dataFim: string
	tipoOnibus: any
	numeroDoVoo: any
	codCiaVenda: any
	nomeCiaVenda: any
	codCiaOperadora: any
	classe: any
	franquiaBagagem: any
	itemPai: ItemPai
	valorRateio: number
	valor: Valor3
}

type ItemPai = {
	id: number
}

type Valor3 = {
	valorBase: number
	total: number
	totalConvertido: number
	id: number
	nome: string
	obrigatorio: boolean
	permiteRateio: boolean
}
