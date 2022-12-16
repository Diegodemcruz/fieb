import { IconFamilyProps } from '../Icon/types'

/**
 * InputProps
 */
export type InputProps<T> = T & {
	name: string
	label?: string
	placeholder?: string
	/**
	 * Object that container `family` of icon and `name`
	 */
	icon?: IconFamilyProps
	forwardedValue?: string
	onInitialValue?: (value: string) => void
}

/**
 * InputRef props that are used with useImperativeHandle
 */
export type InputRefProps = {
	/**
	 * Focus the cursor on the input
	 */
	focus(): void
}
