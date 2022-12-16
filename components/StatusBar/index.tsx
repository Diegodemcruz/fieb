import React from 'react'

import { StatusBar as ExpoStatusBar, StatusBarProps } from 'expo-status-bar'

import { useIsFocused } from '@react-navigation/native'

/**
 *  Return expo status bar that auto update status bar when the screen is focused
 *
 * @param props The component props.
 * @returns The component JSX.
 */
const StatusBar: React.FC<StatusBarProps> = (props: StatusBarProps) => {
	const isFocused = useIsFocused()

	return isFocused ? <ExpoStatusBar {...props} /> : <></>
}

export default StatusBar
