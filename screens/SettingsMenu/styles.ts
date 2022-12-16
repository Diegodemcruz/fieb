import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	padding: 0px 16px;
	background-color: #0369a1;
`

export const Content = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

export const ProfileContainer = styled.TouchableOpacity`
	margin-top: -80px;
	margin-bottom: 20px;
`

export const ProfileImage = styled.Image`
	width: 155px;
	height: 155px;
	border-radius: 100px;
	margin-bottom: 10px;
`

export const ProfileNameContainer = styled.View`
	margin-bottom: 20px;
`

export const CheckboxContainer = styled.View`
	margin-top: 20px;
	flex-direction: row;
	align-items: center;
`
