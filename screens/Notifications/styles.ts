import styled from 'styled-components/native'

type NotificationItemTextColorType = {
	color: 'blue' | 'gray'
}
export const Container = styled.View`
	flex: 1;
	padding: 0 23px;
	background-color: #0369a1;
`

export const Title = styled.Text`
	font-weight: 600;
	font-size: 30px;
	line-height: 37px;
	margin-top: 65px;
	margin-bottom: 24px;
	color: #ffffff;
`
export const NotificationItem = styled.View`
	content: 'fill';
	border-radius: 14px;
	padding: 14px 28px 22px 28px;
	margin-bottom: 12px;
	background: #f2f2f2;
	border: 1px solid #2977be;
`
export const NotificationItemTitle = styled.Text`
	font-weight: 600;
	font-size: 22px;
	line-height: 27px;
	color: #2977be;
`

export const NotificationItemText = styled.Text<NotificationItemTextColorType>`
	font-weight: 400;
	font-size: 14px;
	line-height: 17px;
	margin-top: 10px;
	color: #2977be;
	color: ${({ color }) => (color === 'blue' ? '#2977be' : '#ACACAC')};
`
