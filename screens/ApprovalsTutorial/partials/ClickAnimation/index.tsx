import React from 'react'

import { AnimatePresence, MotiView } from 'moti'

import Icon from '@components/Icon'

import SkeletonContainer from '../SkeletonContainer'
import { Container } from './styles'

type ClickAnimationProps = {
	canPlay: boolean
}

const ClickAnimation: React.FC<ClickAnimationProps> = ({ canPlay }: ClickAnimationProps) => {
	return (
		<AnimatePresence>
			{canPlay && (
				<Container>
					<MotiView
						animate={{
							opacity: [
								{
									value: 1,
									delay: 100,
								},
								{
									value: 1,
									delay: 1900,
								},
								0.5,
							],
						}}
						style={{
							width: '100%',
							marginBottom: -10,
						}}
						transition={{
							loop: true,
							repeatReverse: false,
						}}
					>
						<SkeletonContainer backgroundColor={'#4893d7'}></SkeletonContainer>
					</MotiView>

					<MotiView
						animate={{
							scale: [
								1,
								{
									value: 1.5,
									delay: 2000,
								},
								1,
							],
						}}
						transition={{
							loop: true,
							repeatReverse: false,
						}}
					>
						<Icon
							icon={{
								family: 'EvilIcons',
								name: 'pointer',
							}}
							color='#fff'
							size={64}
						/>
					</MotiView>
				</Container>
			)}
		</AnimatePresence>
	)
}

export default ClickAnimation
