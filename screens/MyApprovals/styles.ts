import styled from 'styled-components/native'

export const Container = styled.View`
	width: 100%;
	height: 100%;
	padding: 0 16px;

	background-color: #f5f5f5;

	display: flex;
	justify-items: center;
`
export const Title = styled.Text`
	color: #141318;
	font-size: 30px;
	margin-top: 65px;
	font-weight: 600;
	margin-bottom: 26px;
`
export const Content = styled.View`
	width: 100%;
	height: 76px;
	background-color: #2977be;
	border-radius: 20px;
	margin-bottom: 10px;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`
export const Text = styled.Text`
	width: 70%;
	color: #ffffff;
	font-size: 16px;
	font-weight: 600;
`
export const Icon = styled.Image`
	width: 35px;
	height: 35px;
	margin-right: 19px;
`
