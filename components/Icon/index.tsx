import { useCallback } from 'react'

import * as VectorIcon from '@expo/vector-icons'
import { StyleProp, TextStyle } from 'react-native'

import { IconFamilyProps } from './types'

export type IconProps = {
	size: number
	color: string
	style?: StyleProp<TextStyle> | undefined
	icon: IconFamilyProps
}

const Icon: React.FC<IconProps> = ({ icon, size, color, style }: IconProps) => {
	const GetIcon = useCallback(() => {
		const IconComponent = VectorIcon[icon.family] as unknown as React.FC<{
			size: IconProps['size']
			color: IconProps['color']
			name: IconProps['icon']['name']
			style: StyleProp<TextStyle> | undefined
		}>

		return <IconComponent color={color} name={icon.name} size={size} style={style} />
	}, [color, icon.family, icon.name, size, style])

	return <GetIcon />
}

export default Icon
