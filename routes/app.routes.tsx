import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import BottomTabNavigator from '@components/BottomTabNavigator'

import ApprovalsTutorial from '@screens/ApprovalsTutorial'
import Home from '@screens/Home'
import MyApprovals from '@screens/MyApprovals'
import Notifications from '@screens/Notifications'
import PaymentApprovals from '@screens/PaymentApprovals'
import SettingsMenu from '@screens/SettingsMenu'
import TravelApprovals from '@screens/TravelApprovals'

import { useBottomTabStore } from '@stores/bottomTab'

export type AppStackParams = {
	Home: undefined
	MyApprovals: undefined
	ApprovalsTutorial: { afterFinishGoTo: keyof AppStackParams } | undefined
	PaymentApprovals: undefined
	TravelApprovals: undefined
	SettingsMenu: undefined
	Notifications: undefined
}

const AppTabStack = createBottomTabNavigator<AppStackParams>()

const Routes = () => {
	const showTab = useBottomTabStore((s) => s.showTab)

	return (
		<AppTabStack.Navigator
			sceneContainerStyle={{
				// Put a background color on all AppTabStack.Screen's
				backgroundColor: '#f5f5f5',
			}}
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName='Home'
			tabBar={(props) => (showTab ? <BottomTabNavigator {...props} /> : undefined)}
		>
			<AppTabStack.Screen component={Home} name='Home' />
			<AppTabStack.Screen component={MyApprovals} name='MyApprovals' />
			<AppTabStack.Screen component={ApprovalsTutorial} name='ApprovalsTutorial' />
			<AppTabStack.Screen component={PaymentApprovals} name='PaymentApprovals' />
			<AppTabStack.Screen component={TravelApprovals} name='TravelApprovals' />
			<AppTabStack.Screen component={SettingsMenu} name='SettingsMenu' />
			<AppTabStack.Screen component={Notifications} name='Notifications' />
		</AppTabStack.Navigator>
	)
}

export default Routes
