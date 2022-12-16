import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { RootSiblingParent } from 'react-native-root-siblings'
import { Provider } from 'react-redux'

import { store } from '@services/redux/store'

import '@utils/ignoreWarnings'

import Routes from './routes'

const App: React.FC = () => (
	<Provider store={store}>
		<GestureHandlerRootView
			style={{
				flex: 1,
			}}
		>
			<RootSiblingParent>
				<NavigationContainer>
					<Routes />
				</NavigationContainer>
			</RootSiblingParent>
		</GestureHandlerRootView>
	</Provider>
)

export default App
