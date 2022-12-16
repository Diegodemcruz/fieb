import { Dimensions, FlatList } from 'react-native'
import styled from 'styled-components/native'

const { width } = Dimensions.get('window')

type CircleContainerProps = {
	imagePadding?: number
	disabled: boolean
}

export const Container = styled.View`
	flex: 1;
	padding: 0 16px;
`

export const ImageContainer = styled.View`
	margin-left: -16px;

	margin-bottom: 35px;
`

export const Slide = styled.Image`
	width: ${width}px;
	height: auto;
	aspect-ratio: 2;
`

export const Icon = styled.Image`
	flex: 1;
	width: 100%;
`

export const ButtonsList = styled.FlatList.attrs<FlatList>({
	numColumns: 3,
	contentContainerStyle: {
		alignItems: 'stretch',
	},
})`
	flex: 1;
	width: 100%;
`

export const ButtonContainer = styled.TouchableOpacity`
	flex-grow: 1;

	margin: 4px;

	padding: 8px;

	align-items: center;
`

export const CircleContainer = styled.View<CircleContainerProps>`
	width: ${(width - 130) / 3}px;
	height: ${(width - 130) / 3}px;
	border-radius: ${(width - 130) / 3}px;

	justify-content: center;
	align-items: center;

	padding: ${({ imagePadding }) => imagePadding || 20}px;
	background-color: ${({ disabled }) => (disabled ? '#C4D6E7' : '#0369a1')};
`

export const ButtonLabel = styled.Text`
	font-size: 12px;
	margin-top: 5px;
`
