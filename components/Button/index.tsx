import { ActivityIndicator, TouchableOpacityProps } from 'react-native'

import { ButtonText, Container } from './styles'

interface ButtonProps extends TouchableOpacityProps {
	children: string | React.ReactNode
	loading?: boolean
	onPress?: () => void
	widthInPercent?: number
	backgroundColor?: string
	borderColor?: string
	textColor?: string
	textAlign?: 'flex-start' | 'center' | 'flex-end'
	alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
}

const Button: React.FC<ButtonProps> = ({
	children,
	loading,
	onPress,
	widthInPercent,
	backgroundColor,
	borderColor,
	textColor,
	alignSelf,
	...rest
}: ButtonProps) => {
	return (
		<Container
			alignSelf={alignSelf}
			backgroundColor={backgroundColor}
			borderColor={borderColor}
			widthInPercent={widthInPercent}
			onPress={() => {
				if (onPress && !loading) {
					onPress()
				}
			}}
			{...rest}
		>
			{loading ? (
				<ActivityIndicator color='#fff' />
			) : (
				<ButtonText color={textColor}>{children}</ButtonText>
			)}
		</Container>
	)
}

export default Button
