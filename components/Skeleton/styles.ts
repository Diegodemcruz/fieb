import styled from 'styled-components/native'

import { SkeletonProps } from './types'

export const Container = styled.View<SkeletonProps>`
	border-radius: 5px;
	width: ${({ size }) => size.width};
	height: ${({ size }) => size.height};
	background-color: ${({ color }) => color};
`
