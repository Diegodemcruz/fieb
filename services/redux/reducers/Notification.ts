import { combineReducers } from 'redux'

import {
	typeNotificationPayment as typePayment,
	typeNotificationTravel as typeTravel,
} from '../types'

export interface NotificationPayment {
	status: boolean
}

export interface NotificationTravel {
	status: boolean
}

const initialStatePayment = {
	status: false,
}

const initialStateTravel = {
	status: false,
}

interface ActionPayment {
	type: string
	payload: NotificationPayment
}

interface ActionTravel {
	type: string
	payload: NotificationTravel
}

const statusNotificationPayment = (state = initialStatePayment, action: ActionPayment) => {
	switch (action.type) {
		case typePayment.STATUS_PAYMENT_TRUE:
			return {
				...state,
				status: true,
			}
		case typePayment.STATUS_PAYMENT_FALSE:
			return {
				status: false,
			}
		default:
			return state
	}
}

const statusNotificationTravel = (state = initialStateTravel, action: ActionTravel) => {
	switch (action.type) {
		case typeTravel.STATUS_TRAVEL_TRUE:
			return {
				...state,
				status: true,
			}
		case typeTravel.STATUS_TRAVEL_FALSE:
			return {
				status: false,
			}
		default:
			return state
	}
}

const ControlNotificationReducers = combineReducers({
	statusNotificationPayment,
	statusNotificationTravel,
})

export { ControlNotificationReducers }
