import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import { AntDesign } from '@expo/vector-icons'
import { useField } from '@unform/core'
import { TextInputProps } from 'react-native'

import IconComponent from '@components/Icon'

import { Container, PlaceholderText, TextInput } from './styles'
import { InputProps, InputRefProps } from './types'

const Input: React.ForwardRefRenderFunction<InputRefProps, InputProps<TextInputProps>> = (
	{ name, label, placeholder, icon, forwardedValue, onInitialValue, secureTextEntry, ...rest },
	ref
) => {
	const { registerField, defaultValue = '', fieldName, error } = useField(name)

	const inputRef = useRef<TextInputProps & InputRefProps>(null)

	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(false)
	const [showPassword, setShowPassword] = useState(secureTextEntry)

	const handleInputFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleInputBlur = useCallback(() => {
		setIsFocused(false)

		setIsFilled(!!inputRef.current?.value)
	}, [])

	useImperativeHandle(ref, () => ({
		focus() {
			inputRef.current?.focus()
		},
	}))

	useEffect(() => {
		registerField<string>({
			name: fieldName,
			ref: inputRef.current,
			getValue({ value }) {
				if (forwardedValue) {
					return forwardedValue
				}

				return value
			},
			setValue({ setNativeProps }, value) {
				setNativeProps({ text: value })

				if (inputRef.current) {
					inputRef.current.value = value
				}
			},
			clearValue({ clear, ...rest }) {
				rest.value = ''
				clear()

				if (onInitialValue) {
					onInitialValue('')
				}
			},
		})
	}, [fieldName, registerField, inputRef, forwardedValue, onInitialValue])

	useEffect(() => {
		if (defaultValue !== '') {
			if (inputRef.current) {
				inputRef.current.value = defaultValue
			}

			if (onInitialValue) {
				onInitialValue(defaultValue)
			}
		}
	}, [defaultValue, onInitialValue])

	return (
		<>
			<Container isErrored={!!error} isFocused={isFocused}>
				<PlaceholderText isErrored={!!error} isFocused={isFocused}>
					{error || label}
				</PlaceholderText>

				{icon && (
					<IconComponent
						style={{
							marginRight: 8,
						}}
						color={isFocused || isFilled ? '#0369a1' : '#d0d5dd'}
						icon={icon}
						size={20}
					/>
				)}

				<TextInput
					ref={inputRef}
					defaultValue={defaultValue}
					placeholder={placeholder}
					secureTextEntry={showPassword}
					onChangeText={(value: string) => {
						if (inputRef.current) {
							inputRef.current.value = value
						}
					}}
					onBlur={handleInputBlur}
					onFocus={handleInputFocus}
					{...rest}
				/>

				{secureTextEntry && (
					<AntDesign
						color={showPassword ? '#d0d5dd' : '#0369A1'}
						name={'eyeo'}
						size={20}
						onPress={() => setShowPassword(!showPassword)}
					/>
				)}
			</Container>
		</>
	)
}

export default forwardRef(Input)
