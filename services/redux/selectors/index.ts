const getStatusNotificationPayment = (state: any) =>
	state.ControlNotificationReducers.statusNotificationPayment
const getStatusNotificationTravel = (state: any) =>
	state.ControlNotificationReducers.statusNotificationTravel

const selectors = {
	getStatusNotificationPayment,
	getStatusNotificationTravel,
}

export { selectors }
