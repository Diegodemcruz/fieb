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

import travelIcon from '@assets/travel.svg'

import ApprovalDetail, { ApprovalInfoProps } from '@components/ApprovalDetail'
import ApprovalListItem from '@components/ApprovalListItem'
import Header from '@components/Header'
import Input from '@components/Input'
import Label from '@components/Label'
import MultipleApprovalAction from '@components/MultipleApprovalAction'
import StatusBar from '@components/StatusBar'

import api from '@services/api'
import { actionsNotTravel } from '@services/redux/actions'
import listarViagens, { TravelProps } from '@services/useCases/listarViagens'

import { useUserStore } from '@stores/user'

import { trimString } from '@utils/trimString'

import {
	Container,
	// FlashListContainer,
	ListHeaderContainer,
	ListSeparator,
	Title,
	TitleContainer,
} from './styles'

type TravelPropsWithRef = TravelProps & {
	ref: React.RefObject<Swipeable>
}

type TravelRequestProps = {
	idPlano: number
	autorizado: boolean
	idItem: number
	valorAutorizado: number
}

const TravelApprovals: React.FC = () => {
	const dispatch = useDispatch()
	const travelListRefs = useRef<RefObject<Swipeable>[]>([])
	const [travelList, setTravelList] = useState<TravelPropsWithRef[]>([])
	const [selectedTravel, setSelectedTravel] = useState<TravelPropsWithRef>()
	const [selectedTravels, setSelectedTravels] = useState<TravelPropsWithRef[]>([])
	const [approveAction, setApproveAction] = useState<'accepted' | 'rejected'>()
	const [filterByText, setFilterByText] = useState('')
	const [loading, setLoading] = useState(false)
	const loggedUserEmail = useUserStore((s) => s.email)

	const handleLoadTravelList = useCallback(async () => {
		try {
			if (loading) {
				return
			}

			setLoading(true)

			const response = await listarViagens({
				email: loggedUserEmail,
			}).finally(() => setLoading(false))

			if (response.data.length > 0) {
				dispatch(actionsNotTravel.addStatusTrue())
			} else {
				dispatch(actionsNotTravel.addStatusFalse())
			}

			if (typeof response.data === 'string') {
				throw new AxiosError(response.data)
			}

			travelListRefs.current = []

			const parsedTravelList = response.data.map((approval) => {
				const ref = createRef<Swipeable>()
				travelListRefs.current.push(ref)

				
					const parsed_dtc_geracao = format(parseISO(approval.dataCriacao), 'dd/MM/yyyy');
					const amount = Number(approval.totalPlanejado);
					const totalPlanejadoFormatado = formatCurrency({
						amount: amount.toFixed(2),
						code: 'BRL',
					})[0];
					return {
						ref,
						parsed_dtc_geracao,
						totalPlanejadoFormatado,
						...approval,
					
				}
			})

			setTravelList(parsedTravelList)

			
		} catch (err: unknown) {
			dispatch(actionsNotTravel.addStatusFalse())
			const errorMessage = 'Erro ao carregar lista de viagens, tente novamente mais tarde'

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
	}, [dispatch, loading, loggedUserEmail])

	useFocusEffect(
		useCallback(() => {
			handleLoadTravelList()

			return () => {
				setLoading(false)
				setTravelList([])
				setSelectedTravels([])
				setApproveAction(undefined)
				setFilterByText('')
			}
			/**
			 * handleLoadTravelList dependes on loading, so if loading is changed
			 * handleLoadTravelList will be updated and this useFocusEffect
			 * will be called again, causing a loop.
			 */
			//eslint-disable-next-line react-hooks/exhaustive-deps
		}, [])
	)

	const filteredTravelList = useMemo(
		() =>
			travelList.filter((travel) => {
				if (filterByText) {
					const filterByLabelResult = travel.nome.toLowerCase().includes(filterByText)

					const filterByRequestResult = travel.solicitante.nome.toLowerCase().includes(filterByText)

					const filterByValueResult = travel.totalPlanejadoFormatado.includes(filterByText)

					return filterByLabelResult || filterByRequestResult || filterByValueResult
				}

				return true
			}),

		[filterByText, travelList]
	)

	const handleApproveTravel = useCallback(
		async (travel: TravelPropsWithRef) => {
			if (loading) {
				return
			}

			try {
				const toast = Toast.show('Aprovando viagem...', {
					duration: 0,
					position: Toast.positions.BOTTOM,
					backgroundColor: '#ffa500',
					containerStyle: {
						marginTop: 20,
					},
					opacity: 1,
				})

				const requestData = travel.itensDePlanejamento.reduce<TravelRequestProps[]>((acc, item) => {
					const request: TravelRequestProps = {
						idPlano: travel.id,
						autorizado: true,
						idItem: item.id,
						valorAutorizado: item.valor.totalConvertido,
					}

					acc.push(request)

					return acc
				}, [])

				const result = await api
					.post('Reserve/autorizar_planejamento', {
						lista: requestData,
					})
					.finally(() => Toast.hide(toast))

				Toast.show(result.data?.message, {
					duration: 15000,
					position: Toast.positions.TOP,
					backgroundColor: '#16A34A',
					containerStyle: {
						marginTop: 20,
					},
					opacity: 1,
				})

				setSelectedTravel(travel)

				travel.ref.current?.close()

				setApproveAction('accepted')

				handleLoadTravelList()
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
		[handleLoadTravelList, loading]
	)

	const handleReproveTravel = useCallback(
		async (travel: TravelPropsWithRef) => {
			if (loading) {
				return
			}

			try {
				const toast = Toast.show('Reprovando viagem...', {
					duration: 0,
					position: Toast.positions.BOTTOM,
					backgroundColor: '#ffa500',
					containerStyle: {
						marginTop: 20,
					},
					opacity: 1,
				})

				const requestData = travel.itensDePlanejamento.reduce<TravelRequestProps[]>((acc, item) => {
					const request: TravelRequestProps = {
						idPlano: travel.id,
						autorizado: false,
						idItem: item.id,
						valorAutorizado: item.valor.totalConvertido,
					}

					acc.push(request)

					return acc
				}, [])

				await api
					.post('Reserve/autorizar_planejamento', {
						lista: requestData,
					})
					.finally(() => Toast.hide(toast))

				setSelectedTravel(travel)

				travel.ref.current?.close()

				setApproveAction('rejected')

				handleLoadTravelList()
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
		[handleLoadTravelList, loading]
	)

	const handleApproveOrReproveSelectedTravels = useCallback(
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

				const requestData = selectedTravels.reduce<TravelRequestProps[]>((acc, travel) => {
					travel.itensDePlanejamento.forEach((item) => {
						const request: TravelRequestProps = {
							idPlano: travel.id,
							autorizado: action === 'approve',
							idItem: item.id,
							valorAutorizado: item.valor.totalConvertido,
						}

						acc.push(request)
					}, [])

					return acc
				}, [])

				await api
					.post('Reserve/autorizar_planejamento', {
						lista: requestData,
					})
					.finally(() => Toast.hide(toast))
			} catch (err) {
				setSelectedTravels([])

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
		[loading, selectedTravels]
	)

	const handleCloseDetail = useCallback(() => {
		setSelectedTravel(undefined)
		setApproveAction(undefined)
	}, [])

	const handleToggleSelection = useCallback(() => {
		if (selectedTravels.length > 0) {
			setSelectedTravels([])

			return
		}

		setSelectedTravels(travelList)
	}, [travelList, selectedTravels.length])

	const handleAddTravelToSelectedTravelsList = useCallback((travel: TravelPropsWithRef) => {
		setSelectedTravels((selectedTravels) => {
			const alreadySelected = selectedTravels.find(
				(selectedTravel) => selectedTravel.id == travel.id
			)

			if (alreadySelected) {
				const filteredList = selectedTravels.filter(
					(selectedTravel) => selectedTravel.id != travel.id
				)

				return filteredList
			}

			return [...selectedTravels, travel]
		})
	}, [])

	const handleSelectTravel = useCallback(
		(travel: TravelPropsWithRef) => {
			if (selectedTravels.length > 0) {
				handleAddTravelToSelectedTravelsList(travel)

				return
			}

			setSelectedTravel(travel)
		},
		[handleAddTravelToSelectedTravelsList, selectedTravels.length]
	)

	const getTravelInfo = useCallback(() => {
		const travelInfo: ApprovalInfoProps[] = [
			{
				Período: `${selectedTravel?.dataInicio} - ${selectedTravel?.dataFim}`,
				Area: `${selectedTravel?.area}`,
				Descrição: `${selectedTravel?.descricao}`,
			},
		]

		const itensPlanejamento = selectedTravel?.itensDePlanejamento.map(
			(i) => `${i.tipo.nome} - ${i.valor.total}`
		)

		Object.assign(travelInfo[0], { 'Itens planejamento': itensPlanejamento?.join(', ') })

		const servicos = selectedTravel?.servicos.map(
			(s) => `${s.tipo} - ${s.viagem.reservaEscolhida.total}`
		)

		Object.assign(travelInfo[0], {
			Serviços: servicos?.join(', '),
		})

		return travelInfo
	}, [selectedTravel])

	return (
		<>
			<StatusBar style='light' />
			<Header shouldDisplayArrowIcon={true} onReturnNavigateTo='MyApprovals' />
			<Container>
				<TitleContainer>
					<Title>Aprovações de Viagens</Title>
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
							color={selectedTravels.length > 0 ? '#E51636' : '#00439a'}
							fontWeight={500}
						>
							{selectedTravels.length > 0 ? 'Cancelar seleção' : 'Selecionar Todos'}
						</Label>
					</TouchableOpacity>
				</ListHeaderContainer>

				{/* <FlashListContainer> */}
					<FlashList
						renderItem={({ item }) => (
							<ApprovalListItem
								ref={item.ref}
								approvalLeftDownLabel={trimString({
									string: item.solicitante.nome,
									maxLength: 20,
								})}
								approvalLeftUpLabel={trimString({
									string: item.nome,
									maxLength: 20,
								})}
								approvalRightDownLabel='Ver detalhes'
								approvalRightUpLabel={item.totalPlanejadoFormatado}
								approvalSvgIcon={travelIcon}
								disableSwapActions={selectedTravels.length > 0}
								handleLongPress={() => handleAddTravelToSelectedTravelsList(item)}
								handlePress={() => handleSelectTravel(item)}
								handleSwipeableLeftOpen={() => handleApproveTravel(item)}
								handleSwipeableRightOpen={() => handleReproveTravel(item)}
								isSelected={selectedTravels.includes(item)}
							/>
						)}
						data={filteredTravelList}
						estimatedItemSize={79}
						extraData={selectedTravels}
						ItemSeparatorComponent={() => <ListSeparator />}
						refreshing={loading}
						onRefresh={handleLoadTravelList}
					/>
				{/* </FlashListContainer> */}

				{selectedTravels.length > 0 && (
					<MultipleApprovalAction
						onClose={() => {
							setSelectedTravels([])
							handleLoadTravelList()
						}}
						onAccept={async () => await handleApproveOrReproveSelectedTravels('approve')}
						onReject={async () => await handleApproveOrReproveSelectedTravels('reprove')}
					/>
				)}

				{selectedTravel && (
					<ApprovalDetail<TravelPropsWithRef>
						approvalLeftDownLabel={trimString({
							string: selectedTravel.solicitante.nome,
							maxLength: 20,
						})}
						approvalLeftUpLabel={trimString({
							string: selectedTravel.nome,
							maxLength: 20,
						})}
						approvalData={selectedTravel}
						approvalInfoFieldsAndValues={getTravelInfo()}
						approvalRightDownLabel='Ocultar detalhes'
						approvalRightUpLabel={selectedTravel.totalPlanejadoFormatado}
						approvalSvgIcon={travelIcon}
						handleApprovalRightDownLabelCallback={() => handleCloseDetail()}
						handleCloseRequest={() => handleCloseDetail()}
						showSuccessAction={approveAction}
						onAccept={(approvalData) => handleApproveTravel(approvalData)}
						onReject={(approvalData) => handleReproveTravel(approvalData)}
					/>
				)}
			</Container>
		</>
	)
}

export default TravelApprovals
