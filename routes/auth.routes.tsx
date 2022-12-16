import { createStackNavigator } from '@react-navigation/stack'

import Authenticate from '@screens/Authenticate'
import Login from '@screens/Login'

export type AuthStackParams = {
	Login: undefined
	Authenticate: undefined
}

const AuthStack = createStackNavigator<AuthStackParams>()

const Routes = () => {
	return (
		<AuthStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName='Login'
		>
			<AuthStack.Screen component={Login} name='Login' />
			<AuthStack.Screen component={Authenticate} name='Authenticate' />
		</AuthStack.Navigator>
	)
}

export default Routes
