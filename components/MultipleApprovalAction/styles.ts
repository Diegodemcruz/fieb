import { MotiView } from 'moti'
import styled from 'styled-components/native'

type ContentProps = {
	paddingBottom: number
	backgroundColor: string
}

export const MultiSelectPaymentsContainer = styled(MotiView).attrs({
	from: {
		opacity: 0,
		translateY: 100,
	},
	animate: {
		opacity: 1,
		translateY: 0,
	},
	transition: {
		type: 'timing',
		duration: 150,
	},
})`
	flex: 1;
	align-items: center;
	justify-content: center;
`

export const MultiSelectPaymentsContent = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
`

export const Content = styled.View<ContentProps>`
	background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};

	padding: 15px 20px 0px 20px;
	padding-bottom: ${({ paddingBottom }) => paddingBottom + 20}px;
`

export const ActionContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;

	margin-bottom: 20px;
`
