import { LogBox } from 'react-native'

const errorsToIgnore = [
	"Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45.",
]

LogBox.ignoreLogs(errorsToIgnore)
