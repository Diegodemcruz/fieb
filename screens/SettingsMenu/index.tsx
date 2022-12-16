import React, { useCallback, useState } from 'react'

import Checkbox from 'expo-checkbox'
import * as ImagePicker from 'expo-image-picker'

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import shallow from 'zustand/shallow'

import Header from '@components/Header'
import Label from '@components/Label'
import StatusBar from '@components/StatusBar'

import { AppStackParams } from '@routes/app.routes'

import { useAppSettingsStore } from '@stores/appSettings'
import { useBottomTabStore } from '@stores/bottomTab'
import { useUserStore } from '@stores/user'

import {
	CheckboxContainer,
	Container,
	Content,
	ProfileContainer,
	ProfileImage,
	ProfileNameContainer,
} from './styles'

type ImagePicker = {
	uri: string
}

type SettingsMenuProps = BottomTabScreenProps<AppStackParams, 'SettingsMenu'>

const SettingsMenu: React.FC<SettingsMenuProps> = () => {
	const [imageFile, setImageFile] = useState<ImagePicker | undefined>()
	const [receiveNotifications, setReceiveNotifications] = useState(true)
	const [biometricOrFaceIDIsEnabled, setBiometricOrFaceIDIsEnabled] = useAppSettingsStore(
		(s) => [s.biometricOrFaceIDIsEnabled, s.setBiometricOrFaceIDIsEnabled],
		shallow
	)

	const userName = useUserStore((s) => s.nome)

	const { changeTabHollowColor, setDefaultTabHollowColor } = useBottomTabStore(
		(s) => ({
			changeTabHollowColor: s.changeTabHollowColor,
			setDefaultTabHollowColor: s.setDefaultTabHollowColor,
		}),
		shallow
	)

	useFocusEffect(
		useCallback(() => {
			changeTabHollowColor('#0369a1')
			setImageFile(undefined)

			return () => {
				setDefaultTabHollowColor()
			}
		}, [changeTabHollowColor, setDefaultTabHollowColor])
	)

	const handleSelectImage = useCallback(async () => {
		const image = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [1, 1],
			allowsEditing: true,
			allowsMultipleSelection: false,
		})

		if (image.cancelled) {
			return
		}

		setImageFile(image)
	}, [])

	return (
		<>
			<StatusBar style='light' />
			<Header shouldDisplayArrowIcon={true} shouldDisplayNotificationBadge={true} />
			<Container>
				<Content>
					<ProfileContainer onPress={handleSelectImage}>
						<ProfileImage
							source={{
								uri: imageFile?.uri || `https://ui-avatars.com/api/?name=${userName}&size=155`,
							}}
							resizeMode='contain'
						/>
					</ProfileContainer>

					<ProfileNameContainer>
						<Label color='#fff' fontSize={18}>
							{userName}
						</Label>
					</ProfileNameContainer>

					<CheckboxContainer>
						<Checkbox
							style={{
								backgroundColor: '#0369a1',
								borderColor: '#fff',
							}}
							value={receiveNotifications}
							onValueChange={(value) => setReceiveNotifications(value)}
						/>
						<Label color='#fff' fontSize={18} fontWeight={400}>
							{'      '}
							Receber notificações
						</Label>
					</CheckboxContainer>

					<CheckboxContainer>
						<Checkbox
							style={{
								backgroundColor: '#0369a1',
								borderColor: '#fff',
							}}
							value={biometricOrFaceIDIsEnabled}
							onValueChange={(value) => setBiometricOrFaceIDIsEnabled(value)}
						/>
						<Label color='#fff' fontSize={18} fontWeight={400}>
							{'      '}
							Acesso por biometria
						</Label>
					</CheckboxContainer>
				</Content>
			</Container>
		</>
	)
}

export default SettingsMenu
