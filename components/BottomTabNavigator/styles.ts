import styled from 'styled-components/native'

type ContainerProps = {
	backgroundColor: string
}

export const Container = styled.View<ContainerProps>`
	height: 95px;
	width: 100%;
	justify-content: flex-end;
	background-color: ${({ backgroundColor }) => backgroundColor};
`

export const BottomTabContainer = styled.View`
	width: 100%;
	position: absolute;
	top: 0;
	flex-direction: row;
	justify-content: space-around;
	padding: 0px 20px;
	margin-top: 28px;
`
export const PrimaryBottomTabItemContainer = styled.View`
	margin-top: -25px;
`
