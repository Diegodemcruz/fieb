import React from 'react'

import Icon from '@components/Icon'

import { Container, Label } from './styles'
import { SwipeableActionElementProps } from './types'

const SwipeableActionElement: React.FC<SwipeableActionElementProps> = ({ action }) => {
	return (
		<Container action={action}>
			<Icon
				icon={{
					family: 'AntDesign',
					name: action === 'accept' ? 'checkcircle' : 'closecircle',
				}}
				color='#fff'
				size={24}
			/>

			<Label action={action}>
				{action === 'accept' ? 'Aprovar a solicitação' : 'Reprovar a solicitação'}
			</Label>
		</Container>
	)
}

export default SwipeableActionElement
