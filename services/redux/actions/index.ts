import { createAction } from 'redux-actions'

import { typeNotificationPayment, typeNotificationTravel } from '../types'

const actionsNotPayment = {
	addStatusTrue: createAction(typeNotificationPayment.STATUS_PAYMENT_TRUE),
	addStatusFalse: createAction(typeNotificationPayment.STATUS_PAYMENT_FALSE),
}

const actionsNotTravel = {
	addStatusTrue: createAction(typeNotificationTravel.STATUS_TRAVEL_TRUE),
	addStatusFalse: createAction(typeNotificationTravel.STATUS_TRAVEL_FALSE),
}
export { actionsNotPayment, actionsNotTravel }
