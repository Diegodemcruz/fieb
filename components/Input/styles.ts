import styled, { css } from 'styled-components/native'

type ContainerProps = {
	isFocused: boolean
	isErrored: boolean
}

type PlaceholderTextProps = ContainerProps

export const Container = styled.View<ContainerProps>`
	width: 100%;
	height: 50px;
	padding: 0 16px;
	border-radius: 8px;
	margin-bottom: 16px;
	border-width: 1px;
	border-color: #d0d5dd;

	flex-direction: row;
	align-items: center;

	background-color: #fff;

	${(props) =>
		props.isFocused &&
		css`
			border-color: #0369a1;
		`}

	${(props) =>
		props.isErrored &&
		css`
			border-color: #ef4444;
		`}
`

export const TextInput = styled.TextInput`
	flex: 1;
	color: #222222;
	font-size: 16px;
	font-weight: 400;
`

export const PlaceholderText = styled.Text<PlaceholderTextProps>`
	top: 0;
	margin: -10px 14px;
	position: absolute;

	border-radius: 3px;
	padding: 0px 3px;

	color: #d0d5dd;
	font-weight: 500;

	${(props) =>
		props.isFocused &&
		css`
			color: #0369a1;
		`}

	${(props) =>
		props.isErrored &&
		css`
			color: #ef4444;
			background-color: #fff;
		`}
`
