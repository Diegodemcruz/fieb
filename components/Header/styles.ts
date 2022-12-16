import Constants from 'expo-constants'

import styled from 'styled-components/native'

export const Container = styled.View`
	width: 100%;
	height: 90px;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	padding: ${Constants.statusBarHeight}px 24px 12px 24px;
	background-color: #0369a1;
`

export const BackWrapperIcon = styled.View`
	width: 30px;
`

export const BackWrapperTouchable = styled.TouchableOpacity`
	flex: 1;
	justify-content: center;
`

export const LogoWrapper = styled.View`
	flex: 3;
	padding: 0px 20px;
	justify-content: center;
	align-items: center;
`

export const LogoImage = styled.Image`
	max-width: 100%;
	max-height: 100%;
`

export const NotificationWrapperIcon = styled.TouchableOpacity`
	width: 30px;
	justify-content: center;
	align-items: flex-end;
`

export const ActiveNotificationIcon = styled.View`
	width: 9px;
	height: 9px;
	background-color: red;
	border-radius: 9px;
	position: absolute;
	right: 2px;
	top: 6px;
`
