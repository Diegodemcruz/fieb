import React, { createRef, RefObject, useCallback, useMemo, useRef, useState } from 'react'

import { useFocusEffect } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { Form } from '@unform/mobile'
import { AxiosError } from 'axios'
import { format, parseISO } from 'date-fns'
import { TouchableOpacity } from 'react-native'
import { formatCurrency } from 'react-native-format-currency'
import { Swipeable } from 'react-native-gesture-handler'
import Toast from 'react-native-root-toast'
import { useDispatch } from 'react-redux'
import shallow from 'zustand/shallow'

import bb from '@assets/bancos/bb.svg'
import bn from '@assets/bancos/bn.svg'
import bradesco from '@assets/bancos/bradesco.svg'
import caixa from '@assets/bancos/caixa.svg'

import ApprovalDetail from '@components/ApprovalDetail'
import ApprovalListItem from '@components/ApprovalListItem'
import Header from '@components/Header'
import Input from '@components/Input'
import Label from '@components/Label'
import MultipleApprovalAction from '@components/MultipleApprovalAction'
import StatusBar from '@components/StatusBar'

import api from '@services/api'
import { actionsNotPayment } from '@services/redux/actions'
import listarHistoricoDePagamentos from '@services/useCases/listarHistoricoDePagamentos'
import listarPagamentos, { PaymentProps } from '@services/useCases/listarPagamentos'

import { useUserStore } from '@stores/user'

import { trimString } from '@utils/trimString'

import {
	Container,
	FlashListContainer,
	ListHeaderContainer,
	ListSeparator,
	Title,
	TitleContainer,
} from './styles'

type PaymentPropsWithRef = PaymentProps & {
	ref: React.RefObject<Swipeable>
}

type PaymentRequestProps = {
	cod_cnab : string
	funC_ID : number
	funC_NOME: string
}


const PaymentApprovals: React.FC = () => {
	const dispatch = useDispatch()
	const paymentListRefs = useRef<RefObject<Swipeable>[]>([])
	const [paymentList, setPaymentList] = useState<PaymentPropsWithRef[]>([])
	const [selectedPayment, setSelectedPayment] = useState<PaymentPropsWithRef>()
	const [selectedPayments, setSelectedPayments] = useState<PaymentPropsWithRef[]>([])
	const [approveAction, setApproveAction] = useState<'accepted' | 'rejected'>()
	const [filterByText, setFilterByText] = useState('')
	const [loading, setLoading] = useState(false)
	const { loggedUserName, loggedUserId } = useUserStore(
		(s) => ({
			loggedUserName: s.nome,
			loggedUserId: s.id,
		}),
		shallow
	)

	const handleLoadPaymentList = useCallback(async () => {
		try {
			if (loading) {
				return
			}

			setLoading(true)

			const response = await listarPagamentos({
				func_id: Number(loggedUserId),
			}).finally(() => setLoading(false))

			if (response.data.length > 0) {
				dispatch(actionsNotPayment.addStatusTrue())
			} else {
				dispatch(actionsNotPayment.addStatusFalse())
			}

			if (typeof response.data === 'string') {
				throw new AxiosError(response.data)
			}

			paymentListRefs.current = []

			const parsedPaymentList = response.data.map((payment) => {
				const ref = createRef<Swipeable>()

				paymentListRefs.current.push(ref)

				return {
					ref,
					...payment,
					parsed_dtc_geracao: format(parseISO(payment.dtc_geracao), 'dd/MM/yyyy'),
					formatted_val_arquivo_total: formatCurrency({
						amount: payment.val_arquivo_total,
						code: 'BRL',
					})[0],
				}
			})

			setPaymentList(parsedPaymentList)
		} catch (err) {
			dispatch(actionsNotPayment.addStatusFalse())
			const errorMessage = 'Erro ao carregar lista de pagamentos, tente novamente mais tarde'

			if (err instanceof AxiosError) {
				Toast.show(err.message || errorMessage, {
					position: Toast.positions.CENTER,
				})

				return
			}

			Toast.show(errorMessage, {
				position: Toast.positions.CENTER,
			})
		}
	}, [dispatch, loading, loggedUserId])

	useFocusEffect(
		useCallback(() => {
			handleLoadPaymentList()

			return () => {
				setLoading(false)
				setPaymentList([])
				setSelectedPayments([])
				setApproveAction(undefined)
				setFilterByText('')
			}
			/**
			 * handleLoadPaymentList dependes on loading, so if loading is changed
			 * handleLoadPaymentList will be updated and this useFocusEffect
			 * will be called again, causing a loop.
			 */
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [])
	)

	const filteredPaymentList = useMemo(
		() =>
			paymentList.filter((payment) => {
				if (filterByText) {
					const filterByLabelResult = payment.ENTI_NOME.toLowerCase().includes(filterByText)

					const filterByValueResult = payment.formatted_val_arquivo_total.includes(filterByText)

					const filterByDateResult = payment.parsed_dtc_geracao.includes(filterByText)

					return filterByLabelResult || filterByValueResult || filterByDateResult
				}

				return true
			}),

		[filterByText, paymentList]
	)

	const getBankImage = useCallback((bankCode: string) => {
		switch (bankCode) {
			case '237':
				return bradesco
			case '104':
				return caixa
			case '004':
				return bn
			case '001':
				return bb
			default:
				Toast.show('Banco não encontrado, exibindo ícone do banco do Brasil')
				return bb
		}
	}, [])

	const handleApprovePayment = useCallback(
		async (payment: PaymentPropsWithRef) => {
			if (loading) {
				return
			}

			try {
				const toast = Toast.show('Aprovando pagamento...', {
					duration: 0,
					position: Toast.positions.BOTTOM,
					backgroundColor: '#ffa500',
					containerStyle: {
						marginTop: 20,
					},
					opacity: 1,
				})

				// const requestData = payment. .reduce<PaymentRequestProps[]>((acc, item) => {
				// 	const request: PaymentRequestProps = {
				// 		cod_cnab: payment.cod_cnab,
				// 		func_id: loggedUserId,
				// 		funC_NOME: loggedUserName,
				// 	}

					

				// 	acc.push(request)

				// 	return acc
				// }, [])

				const result = await api
					.post('Spef/aprovar_titulo', {
						nr: 1,
						lista: [
							{
								cod_cnab: String(payment.cod_cnab),
								funC_ID: Number(loggedUserId),
								funC_NOME: loggedUserName,
							},
						],
					})
					.finally(() => Toast.hide(toast) )
				Toast.show(result.data, {
					duration: 15000,
					position: Toast.positions.TOP,
					backgroundColor: '#16A34A',
					containerStyle: {
						marginTop: 20,
					},
					opacity: 1,
				})

				setSelectedPayment({
					...payment,
					history: {
						Mensagem: '',
						NomeArquivo: '',
						Remetente: '',
						TipoConta: '',
						ValorCnab: '',
						ListaCnab: [
							{
								Valor: payment.formatted_val_arquivo_total,
								Favorecido: payment.conta_destino,
								DataPagamento: payment.parsed_dtc_geracao,
								Banco: payment.num_banco_rem,
								Agencia: payment.num_agencia_rem,
								Conta: payment.num_conta_rem,
								Filial: payment.filial,
								Historico: payment.historico,
							},
						],
					},
				})

				payment.ref.current?.close()

				setApproveAction('accepted')

				handleLoadPaymentList()
			} catch (err: unknown) {
				if (err instanceof AxiosError) {
					Toast.show(err?.response?.data?.title || 'Erro inesperado, tente novamente mais tarde', {
						position: Toast.positions.BOTTOM,
					})

					return
				}

				Toast.show('Erro inesperado, tente novamente mais tarde', {
					position: Toast.positions.BOTTOM,
				})
			}
		},
		[handleLoadPaymentList, loading, loggedUserId, loggedUserName]
	)

	const handleReprovePayment = useCallback(
		async (payment: PaymentPropsWithRef) => {
			if (loading) {
				return
			}

			try {
				const toast = Toast.show('Reprovando pagamento...', {
					duration: 0,
					position: Toast.positions.BOTTOM,
					backgroundColor: '#ffa500',
					containerStyle: {
						marginTop: 20,
					},
					opacity: 1,
				})

				await api
					.post('Spef/reprovar_titulo', {
						nr: 1,
						lista: [
							{
								cod_cnab: String(payment.cod_cnab),
								funC_ID: Number(loggedUserId),
								funC_NOME: loggedUserName,
							},
						],
					})
					.finally(() => Toast.hide(toast))

				setSelectedPayment({
					...payment,
					history: {
						Mensagem: '',
						NomeArquivo: '',
						Remetente: '',
						TipoConta: '',
						ValorCnab: '',
						ListaCnab: [
							{
								Valor: payment.formatted_val_arquivo_total,
								Favorecido: payment.conta_destino,
								DataPagamento: payment.parsed_dtc_geracao,
								Banco: payment.num_banco_rem,
								Agencia: payment.num_agencia_rem,
								Conta: payment.num_conta_rem,
								Filial: payment.filial,
								Historico: payment.historico,
							},
						],
					},
				})

				payment.ref.current?.close()

				setApproveAction('rejected')

				handleLoadPaymentList()
			} catch (err: unknown) {
				if (err instanceof AxiosError) {
					Toast.show(err?.response?.data?.title || 'Erro inesperado, tente novamente mais tarde', {
						position: Toast.positions.BOTTOM,
					})

					return
				}

				Toast.show('Erro inesperado, tente novamente mais tarde', {
					position: Toast.positions.BOTTOM,
				})
			}
		},
		[handleLoadPaymentList, loading, loggedUserId, loggedUserName]
	)

	const handleApproveOrReproveSelectedPayments = useCallback(
		async (action: 'approve' | 'reprove') => {
			if (loading) {
				return
			}

			try {
				const toast = Toast.show(
					action === 'approve' ? 'Aprovando pagamentos...' : 'Reprovando pagamentos...',
					{
						duration: 0,
						position: Toast.positions.BOTTOM,
						backgroundColor: '#ffa500',
						containerStyle: {
							marginTop: 20,
						},
						opacity: 1,
					}
				)

				const lista = selectedPayments.map((payment) => ({
					cod_cnab: String(payment.cod_cnab),
					funC_ID: Number(loggedUserId),
					funC_NOME: loggedUserName,
				}))
				// console.log('DEBUG: ', lista)

				await api
					.post(`Spef/${action === 'approve' ? 'aprovar_titulo' : 'reprovar_titulo'}`, {
						nr: selectedPayments.length,
						lista,
						// lista: selectedPayments.map((payment) => ({
						// 	cod_cnab: String(payment.cod_cnab),
						// 	funC_ID: Number(loggedUserId),
						// 	funC_NOME: loggedUserName,
						// })),
					})
					.finally(() => Toast.hide(toast))

				handleLoadPaymentList()
			} catch (err) {
				setSelectedPayments([])

				if (err instanceof AxiosError) {
					Toast.show(err?.response?.data?.title || 'Erro inesperado, tente novamente mais tarde', {
						position: Toast.positions.BOTTOM,
					})

					return
				}

				Toast.show('Erro inesperado, tente novamente mais tarde', {
					position: Toast.positions.BOTTOM,
				})
			}
		},
		[handleLoadPaymentList, loading, loggedUserId, loggedUserName, selectedPayments]
	)

	const handleCloseDetail = useCallback(() => {
		setSelectedPayment(undefined)
		setApproveAction(undefined)
	}, [])

	const handleToggleSelection = useCallback(() => {
		if (selectedPayments.length > 0) {
			setSelectedPayments([])

			return
		}

		setSelectedPayments(paymentList)
	}, [paymentList, selectedPayments.length])

	const handleAddPaymentToSelectedPaymentsList = useCallback((payment: PaymentPropsWithRef) => {
		setSelectedPayments((selectedPayments) => {
			const alreadySelected = selectedPayments.find(
				(selectedPayment) => selectedPayment.cod_cnab == payment.cod_cnab
			)

			if (alreadySelected) {
				const filteredList = selectedPayments.filter(
					(selectedPayment) => selectedPayment.cod_cnab != payment.cod_cnab
				)

				return filteredList
			}

			return [...selectedPayments, payment]
		})
	}, [])

	const handleSelectPayment = useCallback(
		async (payment: PaymentPropsWithRef) => {
			if (selectedPayments.length > 0) {
				handleAddPaymentToSelectedPaymentsList(payment)

				return
			}

			try {
				const toast = Toast.show('Carregando detalhes do pagamento...', {
					duration: 0,
					position: Toast.positions.CENTER,
					backgroundColor: '#0369a1',
				})

				const paymentHistory = await listarHistoricoDePagamentos({
					cod_cnab: String(payment.cod_cnab),
					des_arquivo: payment.des_arquivo,
				}).finally(() => Toast.hide(toast))

				if (typeof paymentHistory.data === 'string') {
					setSelectedPayment({
						...payment,
						history: {
							Mensagem: '',
							NomeArquivo: '',
							Remetente: '',
							TipoConta: '',
							ValorCnab: '',
							ListaCnab: [
								{
									Valor: payment.formatted_val_arquivo_total,
									Favorecido: payment.conta_destino,
									DataPagamento: payment.parsed_dtc_geracao,
									Banco: payment.num_banco_rem,
									Agencia: payment.num_agencia_rem,
									Conta: payment.num_conta_rem,
									Filial: payment.filial,
									Historico: payment.historico,
								},
							],
						},
					})

					return
				}

				setSelectedPayment({
					...payment,
					history: paymentHistory.data,
				})
			} catch (err) {
				if (err instanceof AxiosError) {
					Toast.show(err?.response?.data?.title || 'Erro inesperado, tente novamente mais tarde', {
						position: Toast.positions.BOTTOM,
					})

					return
				}

				Toast.show('Erro inesperado, tente novamente mais tarde', {
					position: Toast.positions.BOTTOM,
				})
			}
		},
		[handleAddPaymentToSelectedPaymentsList, selectedPayments.length]
	)

	return (
		<>
			<StatusBar style='light' />
			<Header shouldDisplayArrowIcon={true} onReturnNavigateTo='MyApprovals' />
			<Container>
				<TitleContainer>
					<Title>Aprovações de Pagamentos</Title>
				</TitleContainer>

				<Form onSubmit={() => undefined}>
					<Input
						icon={{
							family: 'Ionicons',
							name: 'search-sharp',
						}}
						name='search'
						placeholder='Pesquisa'
						onChange={(e) => setFilterByText(e.nativeEvent.text.toLocaleLowerCase())}
					/>
				</Form>

				<ListHeaderContainer>
					<Label uppercase>Aprovações</Label>
					<TouchableOpacity onPress={handleToggleSelection}>
						<Label
							uppercase
							color={selectedPayments.length > 0 ? '#E51636' : '#00439a'}
							fontWeight={500}
						>
							{selectedPayments.length > 0 ? 'Cancelar seleção' : 'Selecionar Todos'}
						</Label>
					</TouchableOpacity>
				</ListHeaderContainer>

				<FlashListContainer>
					<FlashList
						renderItem={({ item }) => (
							<ApprovalListItem
								ref={item.ref}
								approvalLeftUpLabel={trimString({
									string: item.ENTI_NOME,
									maxLength: 20,
								})}
								approvalLeftDownLabel={item.parsed_dtc_geracao}
								approvalRightDownLabel='Ver detalhes'
								approvalRightUpLabel={item.formatted_val_arquivo_total}
								approvalSvgIcon={getBankImage(item.num_banco_rem)}
								disableSwapActions={selectedPayments.length > 0}
								handleLongPress={() => handleAddPaymentToSelectedPaymentsList(item)}
								handlePress={() => handleSelectPayment(item)}
								handleSwipeableLeftOpen={() => handleApprovePayment(item)}
								handleSwipeableRightOpen={() => handleReprovePayment(item)}
								isSelected={selectedPayments.includes(item)}
							/>
						)}
						data={filteredPaymentList}
						estimatedItemSize={79}
						extraData={selectedPayments}
						ItemSeparatorComponent={() => <ListSeparator />}
						refreshing={loading}
						onRefresh={handleLoadPaymentList}
					/>
				</FlashListContainer>

				{selectedPayments.length > 0 && (
					<MultipleApprovalAction
						onClose={() => {
							setSelectedPayments([])
							handleLoadPaymentList()
						}}
						onAccept={async () => await handleApproveOrReproveSelectedPayments('approve')}
						onReject={async () => await handleApproveOrReproveSelectedPayments('reprove')}
					/>
				)}

				{selectedPayment && (
					<ApprovalDetail<PaymentPropsWithRef>
						approvalInfoFieldsAndValues={selectedPayment.history.ListaCnab.map((history) => ({
							Valor: history.Valor,
							Favorecido: history.Favorecido,
							'Data de Pagamento': history.DataPagamento,
							Banco: history.Banco,
							Agência: history.Agencia,
							Conta: history.Conta,
							Filial: history.Filial,
							Descrição: history.Historico,
						}))}
						approvalLeftUpLabel={trimString({
							string: selectedPayment.ENTI_NOME,
							maxLength: 20,
						})}
						approvalData={selectedPayment}
						approvalLeftDownLabel={selectedPayment.parsed_dtc_geracao}
						approvalRightDownLabel='Ocultar detalhes'
						approvalRightUpLabel={selectedPayment.formatted_val_arquivo_total}
						approvalSvgIcon={getBankImage(selectedPayment.num_banco_rem)}
						handleApprovalRightDownLabelCallback={() => handleCloseDetail()}
						handleCloseRequest={() => handleCloseDetail()}
						showSuccessAction={approveAction}
						onAccept={(approvalData) => handleApprovePayment(approvalData)}
						onReject={(approvalData) => handleReprovePayment(approvalData)}
					/>
				)}
			</Container>
		</>
	)
}

export default PaymentApprovals
