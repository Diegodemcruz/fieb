import Constants from 'expo-constants'

import { Image, ImageBackground } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.ImageBackground.attrs<ImageBackground>({
	imageStyle: {
		opacity: 0.1,
	},
})`
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	padding: ${Constants.statusBarHeight}px 16px 0px 16px;
`

export const Logo = styled.Image.attrs<Image>({
	resizeMethod: 'resize',
	resizeMode: 'contain',
})`
	margin-top: 119px;
	height: 57px;
`

export const BottomContainer = styled.View`
	flex-direction: row;
`

export const BottomLinkContainer = styled.TouchableOpacity``

export const BottomText = styled.Text`
	color: #7d7d7d;
`

export const BottomLinkText = styled.Text`
	color: #2977be;
	margin-left: 3px;
	margin-bottom: 24px;
`
