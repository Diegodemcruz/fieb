import React, { useCallback, useEffect } from 'react'

import * as LocalAuthentication from 'expo-local-authentication'

import backgroundImage from '@assets/login/background/login_background.png'
import logo from '@assets/logo/logo.png'

import Button from '@components/Button'
import StatusBar from '@components/StatusBar'

import { useLocalAuthenticationStore } from '@stores/localAuthentication'
import { useUserStore } from '@stores/user'

import { ActionContainer, Container, Logo } from './styles'

const Authenticate: React.FC = () => {
	const setHasAuthenticatedWithBiometricOrFaceID = useLocalAuthenticationStore(
		(s) => s.setHasAuthenticatedWithBiometricOrFaceID
	)
	const logOut = useUserStore((s) => s.logOut)

	const authenticate = useCallback(async () => {
		const auth = LocalAuthentication.authenticateAsync({
			promptMessage: 'FIEB - Serviços Corporativos',
			fallbackLabel: 'Biometria ativada',
		})

		auth.then((result) => {
			if (result.success) {
				setHasAuthenticatedWithBiometricOrFaceID(true)
			}
		})
	}, [setHasAuthenticatedWithBiometricOrFaceID])

	useEffect(() => {
		authenticate()
	}, [authenticate])

	return (
		<>
			<StatusBar style='dark' />
			<Container resizeMode='cover' source={backgroundImage}>
				<Logo source={logo} />

				<ActionContainer>
					<Button onPress={() => authenticate()}>Entrar</Button>
					<Button
						backgroundColor='transparent'
						borderColor='#0369a1'
						textColor='#0369a1'
						onPress={() => logOut()}
					>
						Sair
					</Button>
				</ActionContainer>
			</Container>
		</>
	)
}

export default Authenticate
