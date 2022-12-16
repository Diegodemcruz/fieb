import React, { useState } from 'react'

import Modal from 'react-native-modal'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Button from '@components/Button'
import Icon from '@components/Icon'
import Label from '@components/Label'

import {
	ActionContainer,
	Content,
	MultiSelectPaymentsContainer,
	MultiSelectPaymentsContent,
} from './styles'

type MultipleApprovalActionProps = {
	onAccept?: () => Promise<void>
	onReject?: () => Promise<void>
	onClose?: () => void
}

const MultipleApprovalAction: React.FC<MultipleApprovalActionProps> = ({
	onAccept,
	onReject,
	onClose,
}) => {
	const [hasConfirm, setHasConfirm] = useState(false)
	const [action, setAction] = useState<'accept' | 'reject' | undefined>()

	const insets = useSafeAreaInsets()

	return (
		<MultiSelectPaymentsContainer>
			{!hasConfirm && (
				<MultiSelectPaymentsContent onPress={() => setHasConfirm(true)}>
					<Label uppercase color='#2977BE' fontSize={24} fontWeight={500}>
						Continuar{'   '}
					</Label>
					<Icon
						icon={{
							family: 'AntDesign',
							name: 'arrowright',
						}}
						color='#2977BE'
						size={24}
					/>
				</MultiSelectPaymentsContent>
			)}

			{hasConfirm && (
				<Modal
					style={{
						margin: 0,
						justifyContent: 'flex-end',
					}}
					isVisible={true}
					onBackdropPress={() => onClose && onClose()}
				>
					<RootSiblingParent>
						<Content
							backgroundColor={() => {
								if (action === 'accept') {
									return '#439859'
								}

								if (action === 'reject') {
									return '#c62222'
								}

								return '#fff'
							}}
							paddingBottom={Math.max(insets.bottom, 16)}
						>
							<Icon
								icon={{
									family: 'AntDesign',
									name:
										action === undefined
											? 'questioncircle'
											: action === 'accept'
											? 'checkcircle'
											: 'closecircle',
								}}
								color={action ? '#fff' : '#615f5f'}
								size={86}
								style={{ alignSelf: 'center' }}
							/>
							<Label
								color={action !== undefined ? '#fff' : undefined}
								fontWeight={800}
								marginBottom={20}
								marginTop={20}
								textAlign='center'
							>
								{action === undefined
									? 'Deseja aprovar ou reprovar todas as solicitações selecionadas?'
									: action === 'accept'
									? 'Todas as solicitações foram aprovadas'
									: 'Todas as solicitações foram reprovadas'}
							</Label>

							{action === undefined && (
								<ActionContainer>
									<Button
										backgroundColor='#ef4444'
										widthInPercent={48}
										onPress={async () => {
											if (onReject) {
												await onReject()
											}

											setAction('reject')
										}}
									>
										Reprovar
									</Button>
									<Button
										backgroundColor='#16a34a'
										widthInPercent={48}
										onPress={async () => {
											if (onAccept) {
												await onAccept()
											}

											setAction('accept')
										}}
									>
										Aprovar
									</Button>
								</ActionContainer>
							)}

							<Button
								backgroundColor='transparent'
								borderColor={action !== undefined ? '#fff' : '#494949'}
								textColor={action !== undefined ? '#fff' : '#494949'}
								widthInPercent={100}
								onPress={() => onClose && onClose()}
							>
								Voltar
							</Button>
						</Content>
					</RootSiblingParent>
				</Modal>
			)}
		</MultiSelectPaymentsContainer>
	)
}

export default MultipleApprovalAction
