import React from 'react'

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import whiteLogo from '@assets/whiteLogo.png'

import Icon from '@components/Icon'

import { AppStackParams } from '@routes/app.routes'

import { NotificationPayment, NotificationTravel } from '@services/redux/reducers/Notification'
import { selectors } from '@services/redux/selectors'
import { RootState } from '@services/redux/store'

import {
	ActiveNotificationIcon,
	BackWrapperIcon,
	BackWrapperTouchable,
	Container,
	LogoImage,
	LogoWrapper,
	NotificationWrapperIcon,
} from './styles'

type HeaderProps = {
	shouldDisplayArrowIcon: boolean
	shouldDisplayNotificationBadge?: boolean
	onReturnNavigateTo?: keyof AppStackParams
}

type useNavigationProps = BottomTabScreenProps<AppStackParams, 'Notifications'>

const Header: React.FC<HeaderProps> = ({ shouldDisplayArrowIcon, onReturnNavigateTo }) => {
	const navigation = useNavigation<useNavigationProps['navigation']>()
	const statusNotPay = useSelector<RootState, NotificationPayment>(
		selectors.getStatusNotificationPayment
	)

	const statusNotTrav = useSelector<RootState, NotificationTravel>(
		selectors.getStatusNotificationTravel
	)

	return (
		<Container>
			<BackWrapperIcon>
				{shouldDisplayArrowIcon && (
					<BackWrapperTouchable
						onPress={() => {
							if (onReturnNavigateTo) {
								navigation.navigate(onReturnNavigateTo)

								return
							}

							navigation.goBack()
						}}
					>
						<Icon
							icon={{
								family: 'AntDesign',
								name: 'arrowleft',
							}}
							color='#fff'
							size={25}
						/>
					</BackWrapperTouchable>
				)}
			</BackWrapperIcon>

			<LogoWrapper>
				<LogoImage resizeMode='contain' source={whiteLogo} />
			</LogoWrapper>

			<NotificationWrapperIcon onPress={() => navigation.navigate('Notifications')}>
				<Icon
					icon={{
						family: 'Ionicons',
						name: 'ios-notifications',
					}}
					color='#fff'
					size={25}
				/>
				{(statusNotPay.status || statusNotTrav.status) && <ActiveNotificationIcon />}
			</NotificationWrapperIcon>
		</Container>
	)
}

export default Header
