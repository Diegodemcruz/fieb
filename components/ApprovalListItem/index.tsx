import React, { forwardRef } from 'react'

import { AnimatePresence } from 'moti'
import { Pressable, TouchableOpacity } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'

import Label from '@components/Label'

import SwipeableActionElement from './partials/SwipeableActionElement'
import {
	ApprovalContainer,
	ApprovalContent,
	ApprovalIconAnimatedView,
	ApprovalIconContainer,
	ApprovalLineContent,
	CheckIcon,
} from './styles'

export type ApprovalListItemProps = {
	handlePress?: () => void
	handleLongPress?: () => void
	handleSwipeableLeftOpen?: () => void
	handleSwipeableRightOpen?: () => void
	handleApprovalRightDownLabelCallback?: () => void
	approvalSvgIcon: React.FC
	approvalLeftUpLabel: string
	approvalRightUpLabel: string
	approvalLeftDownLabel: string
	approvalRightDownLabel: string
	backgroundColor?: string
	disableSwapActions?: boolean
	isSelected?: boolean
}

const ApprovalListItem: React.ForwardRefRenderFunction<Swipeable, ApprovalListItemProps> = (
	{
		handlePress,
		handleLongPress,
		handleSwipeableLeftOpen,
		handleSwipeableRightOpen,
		handleApprovalRightDownLabelCallback,
		approvalSvgIcon: ApprovalSvgIcon,
		approvalLeftUpLabel,
		approvalLeftDownLabel,
		approvalRightUpLabel,
		approvalRightDownLabel,
		backgroundColor,
		isSelected,
		disableSwapActions = false,
	},
	ref
) => {
	return (
		<Swipeable
			ref={ref}
			renderLeftActions={() =>
				!disableSwapActions && handleSwipeableLeftOpen && <SwipeableActionElement action='accept' />
			}
			renderRightActions={() =>
				!disableSwapActions &&
				handleSwipeableRightOpen && <SwipeableActionElement action='reject' />
			}
			onSwipeableLeftOpen={handleSwipeableLeftOpen}
			onSwipeableRightOpen={handleSwipeableRightOpen}
		>
			<Pressable onLongPress={handleLongPress} onPress={handlePress}>
				<ApprovalContainer backgroundColor={backgroundColor}>
					<ApprovalIconContainer>
						<ApprovalSvgIcon />
						<AnimatePresence>
							{isSelected && (
								<ApprovalIconAnimatedView>
									<CheckIcon />
								</ApprovalIconAnimatedView>
							)}
						</AnimatePresence>
					</ApprovalIconContainer>
					<ApprovalContent>
						<ApprovalLineContent>
							<Label color={backgroundColor && '#fff'} fontWeight={800}>
								{approvalLeftUpLabel}
							</Label>
							<Label color={backgroundColor && '#fff'} fontWeight={800}>
								{approvalRightUpLabel}
							</Label>
						</ApprovalLineContent>
						<ApprovalLineContent>
							<Label color={backgroundColor && '#fff'} fontWeight={400}>
								{approvalLeftDownLabel}
							</Label>
							<TouchableOpacity onPress={handleApprovalRightDownLabelCallback || handlePress}>
								<Label color={backgroundColor ? '#fff' : '#2977be'} fontWeight={400}>
									{approvalRightDownLabel}
								</Label>
							</TouchableOpacity>
						</ApprovalLineContent>
					</ApprovalContent>
				</ApprovalContainer>
			</Pressable>
		</Swipeable>
	)
}

export default forwardRef(ApprovalListItem)
