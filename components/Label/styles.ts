import styled, { css } from 'styled-components/native'

import { StyledLabelProps } from './types'

export const StyledLabel = styled.Text<StyledLabelProps>`
	color: ${({ color }) => color || '#737373'};
	font-size: ${({ fontSize }) => fontSize || 13}px;
	font-weight: ${({ fontWeight }) => fontWeight || 600};
	text-align: ${({ textAlign }) => textAlign || 'left'};
	margin-top: ${({ marginTop }) => marginTop || 0}px;
	margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
	margin-left: ${({ marginLeft }) => marginLeft || 0}px;
	margin-right: ${({ marginRight }) => marginRight || 0}px;

	${({ uppercase }) =>
		uppercase &&
		css`
			text-transform: uppercase;
		`}
`
