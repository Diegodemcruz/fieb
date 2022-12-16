import { useEffect, useState } from 'react'

import * as LocalAuthentication from 'expo-local-authentication'

import AppRoutes from '@routes/app.routes'
import AuthRoutes from '@routes/auth.routes'

import Authenticate from '@screens/Authenticate'

import { useAppSettingsStore } from '@stores/appSettings'
import { useLocalAuthenticationStore } from '@stores/localAuthentication'
import { useUserStore } from '@stores/user'

const Routes = () => {
	const [hasBiometricSupport, setHasBiometricSupport] = useState(false)
	const token = useUserStore((s) => s.token)
	const biometricOrFaceIDIsEnabled = useAppSettingsStore((s) => s.biometricOrFaceIDIsEnabled)
	const hasAuthenticatedWithBiometricOrFaceID = useLocalAuthenticationStore(
		(s) => s.hasAuthenticatedWithBiometricOrFaceID
	)

	useEffect(() => {
		;(async () => {
			const compatible = await LocalAuthentication.hasHardwareAsync()
			setHasBiometricSupport(compatible)
		})()
	})

	if (!token) {
		return <AuthRoutes />
	} else {
		if (
			hasBiometricSupport &&
			biometricOrFaceIDIsEnabled &&
			!hasAuthenticatedWithBiometricOrFaceID
		) {
			return <Authenticate />
		}

		return <AppRoutes />
	}
}

export default Routes
