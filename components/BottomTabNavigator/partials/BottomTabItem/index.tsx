import React from 'react'

import { Container, ContainerProps } from './styles'

type BottomTabItemProps = ContainerProps & {
	children: JSX.Element
	handlePress?: () => void
}

const BottomTabItem: React.FC<BottomTabItemProps> = ({ children, color, handlePress }) => {
	return (
		<Container color={color} onPress={handlePress}>
			{children}
		</Container>
	)
}

export default BottomTabItem
