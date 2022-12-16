import { ValidationError } from 'yup'

interface Errors {
	[key: string]: string
}

/**
 *
 * @param err The error object from yup
 * @returns An object with the error key and the error message
 */
export default function getValidationErrors(err: ValidationError): Errors {
	const validationErrors: Errors = {}

	err.inner.forEach((error) => {
		if (!error.path) {
			throw new Error('Validation error path not found')
		}

		validationErrors[error.path] = error.message
	})

	return validationErrors
}
