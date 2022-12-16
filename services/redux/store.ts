import { createStore } from 'redux'

import { Reducers } from '../redux/reducers'
import { NotificationPayment, NotificationTravel } from './reducers/Notification'

const store = createStore(Reducers)

export interface RootState {
	NotificationPayment: NotificationPayment
	NotificationTravel: NotificationTravel
}

export { store }
