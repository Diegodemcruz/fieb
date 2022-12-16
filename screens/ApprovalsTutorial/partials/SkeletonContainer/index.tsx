import React from 'react'

import Skeleton from '@components/Skeleton'

import { Container, Content, TextSkeletonContainer, TextSkeletonContent } from './styles'

type SkeletonContainerProps = {
	backgroundColor: string
}

const SkeletonContainer: React.FC<SkeletonContainerProps> = ({ backgroundColor }) => {
	return (
		<Container backgroundColor={backgroundColor}>
			<Content>
				<Skeleton
					size={{
						width: '48px',
						height: '48px',
					}}
					color='rgba(0,0,0,0.15)'
				/>
			</Content>
			<TextSkeletonContainer>
				<TextSkeletonContent>
					<Skeleton
						size={{
							width: '45%',
							height: '25px',
						}}
						color='rgba(0,0,0,0.15)'
					/>
					<Skeleton
						size={{
							width: '25%',
							height: '25px',
						}}
						color='rgba(0,0,0,0.15)'
					/>
				</TextSkeletonContent>
				<TextSkeletonContent>
					<Skeleton
						size={{
							width: '35%',
							height: '14px',
						}}
						color='rgba(0,0,0,0.15)'
					/>
					<Skeleton
						size={{
							width: '20%',
							height: '14px',
						}}
						color='rgba(0,0,0,0.15)'
					/>
				</TextSkeletonContent>
			</TextSkeletonContainer>
		</Container>
	)
}

export default SkeletonContainer
