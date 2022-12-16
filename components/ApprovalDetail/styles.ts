import styled, { css } from 'styled-components/native'

type InfoContainerProps = {
	paddingBottom: number
	backgroundColor?: string
}

type RowContainerProps = {
	spaceBetween: boolean
}

export const Container = styled.View``

export const Content = styled.View`
	background-color: #fff;
`

export const InfoContainer = styled.View<InfoContainerProps>`
	padding: 15px 20px 0px 20px;
	padding-bottom: ${(props) => props.paddingBottom + 20}px;

	min-height: 400px;

	justify-content: center;

	${({ backgroundColor }) =>
		backgroundColor &&
		css`
			background-color: ${backgroundColor};
		`};
`

export const InfoContent = styled.View`
	flex: 1;
`

export const ListSeparator = styled.View`
	flex: 1;
	height: 3px;
	background-color: #d9d9d9;

	margin: 20px 10px;
`

export const RowContainer = styled.View<RowContainerProps>`
	flex-direction: row;
	margin-bottom: 10px;

	${({ spaceBetween }) =>
		spaceBetween &&
		css`
			justify-content: space-between;
		`}
`

export const DescriptionContainer = styled.View`
	border-radius: 8px;
	border-width: 1px;
	border-color: #d0d5dd;

	margin-top: 5px;
	padding: 10px;

	min-height: 100px;
`

export const ActionContainer = styled.View`
	margin-top: 20px;
`

export const SuccessContainer = styled.View`
	justify-content: center;
	align-items: center;
	min-height: 180px;
`
