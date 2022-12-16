import React from 'react'

import { StyledLabel } from './styles'
import { StyledLabelProps } from './types'

type LabelProps = StyledLabelProps & {
	children: React.ReactNode | string
}

const Label: React.FC<LabelProps> = ({ children, ...rest }) => {
	return <StyledLabel {...rest}>{children}</StyledLabel>
}

export default Label
