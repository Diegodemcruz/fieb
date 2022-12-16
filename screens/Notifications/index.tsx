import { useCallback, useState } from 'react'

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import shallow from 'zustand/shallow'

import Header from '@components/Header'
import { SkipTour } from '@components/Inteface'
import StatusBar from '@components/StatusBar'

import { AppStackParams } from '@routes/app.routes'

import { NotificationPayment, NotificationTravel } from '@services/redux/reducers/Notification'
import { selectors } from '@services/redux/selectors'
import { RootState } from '@services/redux/store'

import { useBottomTabStore } from '@stores/bottomTab'

import { GetStoreData, StoreData } from '@utils/functions'

import {
	Container,
	NotificationItem,
	NotificationItemText,
	NotificationItemTitle,
	Title,
} from './styles'

type NotificationsProps = BottomTabScreenProps<AppStackParams, 'Notifications'>

const Notifications: React.FC<NotificationsProps> = ({ navigation }) => {
	const statusNotPay = useSelector<RootState, NotificationPayment>(
		selectors.getStatusNotificationPayment
	)

	const statusNotTrav = useSelector<RootState, NotificationTravel>(
		selectors.getStatusNotificationTravel
	)
	const [storeDataSkip, setStoreDataSkip] = useState<SkipTour>()

	const { changeTabHollowColor, setDefaultTabHollowColor } = useBottomTabStore(
		(s) => ({
			changeTabHollowColor: s.changeTabHollowColor,
			setDefaultTabHollowColor: s.setDefaultTabHollowColor,
		}),
		shallow
	)

	console.log('DEBUG: ', storeDataSkip?.payment)

	useFocusEffect(
		useCallback(() => {
			changeTabHollowColor('#0369a1')

			async function storeData() {
				try {
					const value = await GetStoreData()
					if (value !== null) {
						setStoreDataSkip(value)
					}
				} catch (e) {
					console.log('Error: ', e)
				}
			}
			storeData()

			return () => {
				setDefaultTabHollowColor()
			}
		}, [changeTabHollowColor, setDefaultTabHollowColor])
	)

	const storeData = useCallback(
		async (value: SkipTour, screen: any) => {
			try {
				const result = await StoreData(value)
				if (result) {
					navigation.navigate('ApprovalsTutorial', {
						afterFinishGoTo: screen,
					})
				}
			} catch (e) {
				console.log('Error: ', e)
			}
		},
		[navigation]
	)

	const handleNavigateToPaymentApprovalsTutorial = useCallback(() => {
		if (storeDataSkip?.payment) {
			navigation.navigate('PaymentApprovals')
		} else {
			const userData: SkipTour = {
				payment: true,
				travel: storeDataSkip?.travel ?? false,
			}
			storeData(userData, 'PaymentApprovals')
		}
	}, [navigation, storeData, storeDataSkip?.payment, storeDataSkip?.travel])

	const handleNavigateToTravelApprovalsTutorial = useCallback(() => {
		if (storeDataSkip?.travel) {
			navigation.navigate('TravelApprovals')
		} else {
			const userData: SkipTour = {
				payment: storeDataSkip?.travel ?? false,
				travel: true,
			}
			storeData(userData, 'TravelApprovals')
		}
	}, [navigation, storeData, storeDataSkip?.travel])

	return (
		<>
			<StatusBar style='light' />
			<Header shouldDisplayArrowIcon={true} shouldDisplayNotificationBadge={true} />
			<Container>
				<Title>Notificações</Title>
				{statusNotPay.status && (
					<TouchableOpacity onPress={handleNavigateToPaymentApprovalsTutorial}>
						<NotificationItem>
							<NotificationItemTitle>Autorização de pagamento</NotificationItemTitle>
							<NotificationItemText color={'blue'}>
								Existe uma autorização pendente
							</NotificationItemText>
							<NotificationItemText color={'gray'}>Clique aqui para ver</NotificationItemText>
						</NotificationItem>
					</TouchableOpacity>
				)}

				{statusNotTrav.status && (
					<TouchableOpacity onPress={handleNavigateToTravelApprovalsTutorial}>
						<NotificationItem>
							<NotificationItemTitle>Autorização de viagem</NotificationItemTitle>
							<NotificationItemText color={'blue'}>
								Existe uma autorização pendente
							</NotificationItemText>
							<NotificationItemText color={'gray'}>Clique aqui para ver</NotificationItemText>
						</NotificationItem>
					</TouchableOpacity>
				)}
			</Container>
		</>
	)
}

export default Notifications
