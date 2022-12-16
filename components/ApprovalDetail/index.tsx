import React from 'react'

import { FlashList } from '@shopify/flash-list'
import Modal from 'react-native-modal'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import ApprovalListItem, { ApprovalListItemProps } from '@components/ApprovalListItem'
import Button from '@components/Button'
import Icon from '@components/Icon'
import Label from '@components/Label'

import {
	ActionContainer,
	Container,
	Content,
	DescriptionContainer,
	InfoContainer,
	InfoContent,
	ListSeparator,
	RowContainer,
	SuccessContainer,
} from './styles'

export type ApprovalInfoProps = {
	[key: string]: string
	Descrição: string
}

type ApprovalDetailProps<T> = {
	handleCloseRequest?: () => void
	onAccept?: (approval: T) => void
	onReject?: (approval: T) => void
	showSuccessAction?: 'accepted' | 'rejected'
	approvalInfoFieldsAndValues: ApprovalInfoProps[]
	approvalData: T
} & Pick<
	ApprovalListItemProps,
	| 'approvalSvgIcon'
	| 'approvalLeftUpLabel'
	| 'approvalRightUpLabel'
	| 'approvalLeftDownLabel'
	| 'approvalRightDownLabel'
	| 'handleApprovalRightDownLabelCallback'
>

const ApprovalDetail = <T extends object>({
	handleCloseRequest,
	onAccept,
	onReject,
	handleApprovalRightDownLabelCallback: onApprovalRightDownLabelCallback,
	approvalData,
	showSuccessAction,
	approvalInfoFieldsAndValues,
	approvalRightUpLabel,
	approvalRightDownLabel,
	approvalLeftUpLabel,
	approvalLeftDownLabel,
	approvalSvgIcon,
}: ApprovalDetailProps<T>) => {
	const insets = useSafeAreaInsets()

	return (
		<Container>
			<Modal
				style={{
					margin: 0,
					justifyContent: 'flex-end',
				}}
				isVisible={true}
				onBackdropPress={handleCloseRequest}
			>
				<RootSiblingParent>
					<Content>
						<ApprovalListItem
							backgroundColor={
								(showSuccessAction === 'accepted' && '#439859') ||
								(showSuccessAction === 'rejected' && '#c62222') ||
								undefined
							}
							approvalLeftDownLabel={approvalLeftDownLabel}
							approvalLeftUpLabel={approvalLeftUpLabel}
							approvalRightDownLabel={approvalRightDownLabel}
							approvalRightUpLabel={approvalRightUpLabel}
							approvalSvgIcon={approvalSvgIcon}
							handleApprovalRightDownLabelCallback={onApprovalRightDownLabelCallback}
						/>

						<InfoContainer
							backgroundColor={
								(showSuccessAction === 'accepted' && '#4BA963') ||
								(showSuccessAction === 'rejected' && '#DC2626') ||
								undefined
							}
							paddingBottom={Math.max(insets.bottom, 16)}
						>
							{!showSuccessAction ? (
								<>
									<FlashList
										renderItem={({ item: approvalInfo }) => {
											const fields = Object.keys(approvalInfo)

											const fieldsComponent = fields
												.filter((field) => field !== 'Descrição')
												.map((field) => {
													const value = approvalInfo[field]

													return (
														<RowContainer key={`${field}-${value}`}>
															<Label fontWeight={800}>
																{field}:<Label fontWeight={400}> {value}</Label>
															</Label>
														</RowContainer>
													)
												})

											return (
												<InfoContent>
													{fieldsComponent}

													<Label fontWeight={800}>Descrição</Label>

													<DescriptionContainer>
														<Label color='#CECECE'>{approvalInfo.Descrição}</Label>
													</DescriptionContainer>
												</InfoContent>
											)
										}}
										data={approvalInfoFieldsAndValues}
										estimatedItemSize={620}
										ItemSeparatorComponent={() => <ListSeparator />}
									/>
								</>
							) : (
								<SuccessContainer>
									<Icon
										icon={{
											family: 'MaterialCommunityIcons',
											name: 'check-circle',
										}}
										color='#fff'
										size={86}
									/>

									<Label color='#fff' fontSize={15} fontWeight={700}>
										{showSuccessAction === 'accepted' ? 'Aprovado' : 'Reprovado'}
									</Label>
									<Label color='#fff' fontSize={15} fontWeight={700}>
										com sucesso!
									</Label>
								</SuccessContainer>
							)}

							<ActionContainer>
								{!showSuccessAction && (
									<RowContainer spaceBetween>
										<Button
											backgroundColor='#EF4444'
											widthInPercent={48}
											onPress={() => onReject && onReject(approvalData)}
										>
											Reprovar
										</Button>
										<Button
											backgroundColor='#16A34A'
											widthInPercent={48}
											onPress={() => onAccept && onAccept(approvalData)}
										>
											Aprovar
										</Button>
									</RowContainer>
								)}
								<Button
									alignSelf='center'
									backgroundColor={!showSuccessAction ? '#fff' : 'transparent'}
									borderColor={!showSuccessAction ? '#A3A3A3' : '#fff'}
									textColor={!showSuccessAction ? '#A3A3A3' : '#fff'}
									widthInPercent={!showSuccessAction ? 100 : 40}
									onPress={handleCloseRequest}
								>
									Voltar
								</Button>
							</ActionContainer>
						</InfoContainer>
					</Content>
				</RootSiblingParent>
			</Modal>
		</Container>
	)
}

export default ApprovalDetail
