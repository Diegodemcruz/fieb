import styled from 'styled-components/native'

export type ContainerProps = {
	color?: string
}

export const Container = styled.TouchableOpacity<ContainerProps>`
	width: 50px;
	height: 50px;
	align-items: center;
	justify-content: center;
	padding: 0px 15px;
	background-color: ${({ color }) => color || 'transparent'};
	border-radius: 25px;
`
