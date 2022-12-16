import styled from 'styled-components/native'

type ContainerProps = {
	backgroundColor: string
}

export const Container = styled.View<ContainerProps>`
	background-color: ${({ backgroundColor }) => backgroundColor};
	padding: 15px 18px;
	flex-direction: row;
`

export const Content = styled.View`
	justify-content: space-between;
`

export const TextSkeletonContainer = styled.View`
	flex: 1;
	margin-left: 16px;
	justify-content: space-between;
`

export const TextSkeletonContent = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
`
