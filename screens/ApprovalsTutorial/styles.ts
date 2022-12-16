import Constants from 'expo-constants'

import { Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import styled, { css } from 'styled-components/native'

type ItemContainerProps = {
	alignTo?: 'left' | 'right'
	color: string
}

export const Container = styled.View`
	flex: 1;
`

export const Content = styled(Animated.View)`
	align-items: center;
	justify-content: space-evenly;

	width: ${Dimensions.get('window').width}px;

	${() => css`
		padding: ${Constants.statusBarHeight}px 0;
	`}
`

export const Header = styled.Text`
	font-size: 30px;
	color: #fff;
	margin: 38px;
	text-align: center;
`

export const ItemAnimationContainer = styled.View`
	width: 100%;
`

export const ItemContainer = styled.View<ItemContainerProps>`
	width: 100%;
	height: 78px;
	padding: 0 19px;
	align-items: center;
	justify-content: flex-start;
	flex-direction: ${({ alignTo }) => (alignTo === 'left' ? 'row' : 'row-reverse')};
	background-color: ${({ color }) => color};
`

export const ItemListLabel = styled.Text`
	color: #fff;
	margin: 0 13px;
	font-size: 16px;
	font-weight: 600;
`

export const Button = styled.TouchableOpacity`
	padding: 11px 56px;
	border-color: #fafafa;
	border-width: 1px;
	border-radius: 8px;
`

export const ButtonLabel = styled.Text`
	color: #fafafa;
	font-size: 16px;
`
