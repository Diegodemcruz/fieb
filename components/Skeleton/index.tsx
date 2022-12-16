import React from 'react'

import { Container } from './styles'
import { SkeletonProps } from './types'

const Skeleton: React.FC<SkeletonProps> = ({ color, size }) => {
	return <Container color={color} size={size} />
}

export default Skeleton
