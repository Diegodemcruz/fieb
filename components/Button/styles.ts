import { Dimensions } from 'react-native'
import styled, { css } from 'styled-components/native'

type ContainerProps = {
	widthInPercent?: number
	backgroundColor?: string
	borderColor?: string
	textAlign?: 'left' | 'center' | 'right'
	alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
}

type ButtonText = {
	color?: string
}

export const Container = styled.TouchableOpacity<ContainerProps>`
	height: 48px;
	width: ${({ widthInPercent }) =>
		widthInPercent ? `${widthInPercent}%` : `${Dimensions.get('window').width - 32}px`};
	background: ${({ backgroundColor }) => backgroundColor || '#0369a1'};
	border-radius: 8px;

	align-items: ${({ textAlign }) => textAlign || 'center'};

	${({ alignSelf }) => {
		switch (alignSelf) {
			case 'baseline':
				return css`
					align-self: baseline;
				`
			case 'center':
				return css`
					align-self: center;
				`
			case 'flex-end':
				return css`
					align-self: flex-end;
				`
			case 'flex-start':
				return css`
					align-self: flex-start;
				`
			case 'stretch':
				return css`
					align-self: stretch;
				`
		}
	}}

	${({ borderColor }) =>
		borderColor &&
		css`
			border-width: 1px;
			border-color: ${borderColor};
		`}

	justify-content: center;
	padding: 0 32px;
`

export const ButtonText = styled.Text<ButtonText>`
	color: ${({ color }) => color || '#fff'};
	font-size: 16px;
`
