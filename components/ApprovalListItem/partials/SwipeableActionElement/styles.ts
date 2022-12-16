import styled from 'styled-components/native'

import { SwipeableActionElementProps } from './types'

export const Container = styled.View<SwipeableActionElementProps>`
	flex: 1;
	height: 100%;
	padding: 27px;

	align-items: center;
	flex-direction: row;

	justify-content: ${({ action }) => (action === 'accept' ? 'flex-start' : 'flex-end')};

	background-color: ${({ action }) => (action === 'accept' ? '#4ba963' : '#dc2626')};
`

export const Label = styled.Text<SwipeableActionElementProps>`
	color: #fff;
	font-size: 16px;

	margin-left: 15px;
`
