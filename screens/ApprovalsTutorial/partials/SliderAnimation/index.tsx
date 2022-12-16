import React, { useMemo } from 'react'

import { AnimatePresence } from 'moti'
import { Dimensions } from 'react-native'

import Icon from '@components/Icon'

import SkeletonContainer from '../SkeletonContainer'
import { AnimatedContainer, SkeletonContent } from './styles'

type SliderAnimationProps = {
	canPlay: boolean
	sliderTo: 'left' | 'right'
	backgroundColor: string
}

const SliderAnimation: React.FC<SliderAnimationProps> = ({
	canPlay,
	sliderTo,
	backgroundColor,
}) => {
	const slideLength = useMemo(() => Dimensions.get('window').width / 1.5, [])

	return (
		<AnimatePresence>
			{canPlay && (
				<AnimatedContainer
					animate={{
						translateX: sliderTo === 'right' ? [slideLength, 0] : [-slideLength, 0],
					}}
					alignContent={sliderTo === 'right' ? 'flex-start' : 'flex-end'}
					delay={2000}
					transition={{ loop: true, type: 'spring', delay: 2500 }}
				>
					<SkeletonContent>
						<SkeletonContainer backgroundColor={backgroundColor} />
					</SkeletonContent>
					<Icon
						icon={{
							family: 'EvilIcons',
							name: 'pointer',
						}}
						color='#fff'
						size={64}
					/>
				</AnimatedContainer>
			)}
		</AnimatePresence>
	)
}

export default SliderAnimation
