import CryptoJS from 'crypto-js'

const secretKey = 'Sd6EqQm4N8xtEAxt'

const encodedSecretKey = CryptoJS.enc.Utf8.parse(secretKey)

const settings = {
	keySize: 128 / 8,
	iv: encodedSecretKey,
	mode: CryptoJS.mode.CBC,
	padding: CryptoJS.pad.Pkcs7,
}

const encryptPassword = (password: string): string => {
	const encodedPassword = CryptoJS.enc.Utf8.parse(password)

	const encrypted = CryptoJS.AES.encrypt(encodedPassword, encodedSecretKey, settings)

	return encrypted.toString()
}

const decryptPassword = (password: string): string => {
	const decrypted = CryptoJS.AES.decrypt(password, encodedSecretKey, settings)

	return decrypted.toString(CryptoJS.enc.Utf8)
}

export { encryptPassword, decryptPassword }
