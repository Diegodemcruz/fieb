import { MotiView } from 'moti'
import { darken } from 'polished'
import styled from 'styled-components/native'

import Icon from '@components/Icon'

type ApprovalContainerProps = {
	isSelected: boolean
	backgroundColor?: string
}

export const ApprovalContainer = styled.View<ApprovalContainerProps>`
	width: 100%;
	height: 78px;
	background-color: ${({ isSelected, backgroundColor: customBackgroundColor }) => {
		let backgroundColor = '#fff'

		if (customBackgroundColor) {
			backgroundColor = customBackgroundColor
		}

		if (isSelected) {
			backgroundColor = darken(0.15, backgroundColor)
		}

		return backgroundColor
	}};
	padding: 0 0 0 19px;
	align-items: center;
	flex-direction: row;
`

export const ApprovalIconContainer = styled.View``

export const ApprovalIconAnimatedView = styled(MotiView).attrs({
	from: {
		scale: 0.2,
	},
	animate: {
		scale: 1,
	},
	exit: {
		scale: 0.2,
	},
	transition: {
		type: 'timing',
	},
})`
	position: absolute;
	top: -10px;
	right: -10px;

	background-color: #fff;
	border-radius: 24px;
`

export const CheckIcon = styled(Icon).attrs({
	icon: {
		family: 'AntDesign',
		name: 'checkcircle',
	},
	color: '#29b5bd',
	size: 24,
})``

export const ApprovalContent = styled.View`
	flex: 1;
	height: 100%;
	margin-left: 10px;
	padding: 15px 29px 15px 0;

	justify-content: space-between;

	border-bottom-width: 1.5px;
	border-bottom-color: #f2eceb;
`
export const ApprovalLineContent = styled.View`
	max-height: 50%;
	flex-direction: row;
	justify-content: space-between;
`

export const ListSeparator = styled.View`
	flex: 1;
	height: 1px;
	background-color: #f2eceb;
`
