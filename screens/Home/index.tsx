import React, { useCallback } from 'react'

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { Alert } from 'react-native'
import Toast from 'react-native-root-toast'
import { useDispatch } from 'react-redux'
import shallow from 'zustand/shallow'

import slideImage from '@assets/home/slides/slide.jpg'

import Header from '@components/Header'
import StatusBar from '@components/StatusBar'

import { AppStackParams } from '@routes/app.routes'

import { actionsNotPayment, actionsNotTravel } from '@services/redux/actions'
import listarPagamentos from '@services/useCases/listarPagamentos'
import listarViagens from '@services/useCases/listarViagens'

import { useUserStore } from '@stores/user'

import { buttonHomeList, ButtonHomeListProps } from './__mocks__'
import {
	ButtonContainer,
	ButtonLabel,
	ButtonsList,
	CircleContainer,
	Container,
	Icon,
	ImageContainer,
	Slide,
} from './styles'

export type HomeProps = BottomTabScreenProps<AppStackParams, 'Home'>

const Home: React.FC<HomeProps> = ({ navigation }) => {
	const dispatch = useDispatch()
	const { loggedUserId } = useUserStore(
		(s) => ({
			loggedUserId: s.id,
		}),
		shallow
	)
	const loggedUserEmail = useUserStore((s) => s.email)

	const verifiesPayment = useCallback(async () => {
		try {
			const response = await listarPagamentos({
				func_id: Number(loggedUserId),
			})

			if (response.data.length > 0) {
				dispatch(actionsNotPayment.addStatusTrue())
			} else {
				dispatch(actionsNotPayment.addStatusFalse())
			}

			if (typeof response.data === 'string') {
				throw new AxiosError(response.data)
			}
		} catch (err) {
			dispatch(actionsNotPayment.addStatusFalse())
		}
	}, [dispatch, loggedUserId])

	const verifiesTravel = useCallback(async () => {
		try {
			const response = await listarViagens({
				email: loggedUserEmail,
			})

			if (response.data.length > 0) {
				dispatch(actionsNotTravel.addStatusTrue())
			} else {
				dispatch(actionsNotTravel.addStatusFalse())
			}

			if (typeof response.data === 'string') {
				throw new AxiosError(response.data)
			}
		} catch (err: unknown) {
			dispatch(actionsNotTravel.addStatusFalse())
		}
	}, [dispatch, loggedUserEmail])

	useFocusEffect(
		useCallback(() => {
			verifiesPayment()
			verifiesTravel()
		}, [verifiesPayment, verifiesTravel])
	)

	return (
		<>
			<StatusBar style='light' />
			<Header shouldDisplayArrowIcon={false} shouldDisplayNotificationBadge={true} />
			<Container>
				<ImageContainer>
					<Slide resizeMode='cover' source={slideImage} />
				</ImageContainer>

				<ButtonsList
					renderItem={({ item }: { item: ButtonHomeListProps }) => {
						const { id, onPressGoToScreen, imagePath, imagePadding, label, enabled } = item

						return (
							<ButtonContainer
								key={id}
								onPress={() =>
									onPressGoToScreen
										? navigation.navigate('MyApprovals')
										: Alert.alert('Disponível em breve')
								}
							>
								<>
									<CircleContainer disabled={!enabled} imagePadding={imagePadding}>
										<Icon source={imagePath} />
									</CircleContainer>

									<ButtonLabel>{label}</ButtonLabel>
								</>
							</ButtonContainer>
						)
					}}
					data={buttonHomeList}
					keyExtractor={(item: ButtonHomeListProps) => item.id}
				/>
			</Container>
		</>
	)
}

export default Home
