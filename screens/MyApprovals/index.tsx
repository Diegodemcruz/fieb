import React, { useCallback, useState } from 'react'

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

import car from '@assets/car/car.png'
import wallet from '@assets/wallet/wallet.png'

import Header from '@components/Header'
import { SkipTour } from '@components/Inteface'
import StatusBar from '@components/StatusBar'

import { AppStackParams } from '@routes/app.routes'

import { GetStoreData, StoreData } from '@utils/functions'

import { Container, Content, Icon, Text, Title } from './styles'

type MyApprovalsProps = BottomTabScreenProps<AppStackParams, 'MyApprovals'>

/**
 * get MyApprovals  Component
 *
 * @returns React.FC
 */
const MyApprovals: React.FC<MyApprovalsProps> = ({ navigation }) => {
	const [storeDataSkip, setStoreDataSkip] = useState<SkipTour>()

	useFocusEffect(
		useCallback(() => {
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
		}, [])
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
			<Header shouldDisplayArrowIcon={true} />
			<Container>
				<Title>Minhas aprovações</Title>
				<TouchableOpacity onPress={handleNavigateToPaymentApprovalsTutorial}>
					<Content>
						<Icon source={wallet} />
						<Text>Aprovações de pagamentos</Text>
					</Content>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleNavigateToTravelApprovalsTutorial}>
					<Content>
						<Icon source={car} />
						<Text>Aprovações de viagens</Text>
					</Content>
				</TouchableOpacity>
			</Container>
		</>
	)
}

export default MyApprovals
