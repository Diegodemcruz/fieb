type TrimStringProps = {
	string: string
	maxLength: number
}

export function trimString({ string, maxLength }: TrimStringProps) {
	if (string.length <= maxLength) {
		return string
	}

	return string.slice(0, maxLength) + '...'
}
