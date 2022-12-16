// import * as Linking from 'expo-linking'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import type { StackNavigationProp } from '@react-navigation/stack'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import { AxiosError } from 'axios'
import Toast from 'react-native-root-toast'
import * as Yup from 'yup'

import backgroundImage from '@assets/login/background/login_background.png'
import logo from '@assets/logo/logo.png'

import Button from '@components/Button'
import Input from '@components/Input'
import StatusBar from '@components/StatusBar'

import { FIEB_AUTO_LOGIN_PASSWORD, FIEB_AUTO_LOGIN_USER } from '@env'

import { AuthStackParams } from '@routes/auth.routes'

import api from '@services/api'

import { useUserStore } from '@stores/user'

import { encryptPassword } from '@utils/cryptojs'
import getValidationErrors from '@utils/getValidationsErrors'

import { BottomContainer, Container, Logo } from './styles'

type LoginFormData = {
	usuario: string
	senha: string
}

type LoginProps = StackNavigationProp<AuthStackParams, 'Login'>

const Login: React.FC<LoginProps> = () => {
	const formRef = useRef<FormHandles>(null)
	const [loading, setLoading] = useState(false)
	const setUser = useUserStore((s) => s.setUser)

	const handleSubmit = useCallback(
		async (data: LoginFormData) => {
			try {
				setLoading(true)

				formRef.current?.setErrors({})

				const schema = Yup.object().shape({
					usuario: Yup.string().required('Usuário obrigatório'),
					senha: Yup.string().min(8, 'Digite no mínimo 8 caracteres').required('Senha obrigatória'),
				})

				await schema.validate(data, {
					abortEarly: false,
				})

				const dataWithEncryptedPassword = {
					usuario: data.usuario,
					senha: encryptPassword(data.senha),
					codigoSistema: 'APPCORP',
				}

				const response = await api.post('Spef/autenticacao', dataWithEncryptedPassword)

				const { id, Ativo, email, login, nome, urlFoto, token } = response.data.data

				setUser({ id, Ativo, email, login, nome, urlFoto, token })
			} catch (err: unknown) {
				setLoading(false)

				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err)

					formRef.current?.setErrors(errors)

					return
				}

				if (err instanceof AxiosError) {
					Toast.show(err?.response?.data?.title || 'Usuário ou senha inválida', {
						position: Toast.positions.BOTTOM,
					})

					return
				}

				Toast.show('Usuário ou senha inválida', {
					position: Toast.positions.BOTTOM,
				})
			}
		},
		[setUser]
	)

	useEffect(() => {
		if (__DEV__ && FIEB_AUTO_LOGIN_USER && FIEB_AUTO_LOGIN_PASSWORD) {
			Toast.show(
				'Developer mode and auto login credentials detected, doing auto login with credentials from .env file, please wait...',
				{
					position: Toast.positions.TOP,
					duration: 9000,
				}
			)

			handleSubmit({
				usuario: FIEB_AUTO_LOGIN_USER,
				senha: FIEB_AUTO_LOGIN_PASSWORD,
			})
		}
	}, [handleSubmit])

	return (
		<>
			<StatusBar style='dark' />
			<Container resizeMode='cover' source={backgroundImage}>
				{/* TODO: Ajeitar logo da FIEB */}
				<Logo source={logo} />

				<Form ref={formRef} onSubmit={handleSubmit}>
					<Input name='usuario' placeholder='Digite seu usuário' />
					<Input secureTextEntry name='senha' placeholder='Digite sua senha' />

					<Button loading={loading} onPress={() => formRef.current?.submitForm()}>
						Continuar
					</Button>
				</Form>

				<BottomContainer>
					{/* <BottomText>Esqueceu a senha?</BottomText>
				<BottomLinkContainer onPress={() => Linking.openURL('https://www.fieb.org.br')}>
					<BottomLinkText>Clique aqui!</BottomLinkText>
				</BottomLinkContainer> */}
				</BottomContainer>
			</Container>
		</>
	)
}

export default Login
