import Constants from 'expo-constants'

import { Image, ImageBackground } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.ImageBackground.attrs<ImageBackground>({
	imageStyle: {
		opacity: 0.1,
	},
})`
	flex: 1;
	justify-content: center;
	align-items: center;

	padding: ${Constants.statusBarHeight}px 16px ${Constants.statusBarHeight}px 16px;
`

export const Logo = styled.Image.attrs<Image>({
	resizeMethod: 'resize',
	resizeMode: 'contain',
})`
	margin-top: 119px;
	height: 57px;
`

export const ActionContainer = styled.View`
	margin-top: 64px;

	height: 120px;
	justify-content: space-around;
`
