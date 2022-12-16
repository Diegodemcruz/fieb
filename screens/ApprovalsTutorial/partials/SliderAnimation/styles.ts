import { MotiView } from 'moti'
import styled from 'styled-components/native'

type AnimatedContainerProps = {
	alignContent: 'flex-end' | 'flex-start'
}

export const AnimatedContainer = styled(MotiView)<AnimatedContainerProps>`
	width: 100%;
	position: absolute;
	align-items: ${({ alignContent }) => alignContent};
`

export const SkeletonContent = styled.View`
	height: 78px;
	width: 100%;
	margin-bottom: -20px;
`
