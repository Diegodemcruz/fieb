const tsconfig = require('./tsconfig.json')

const { baseUrl, paths } = tsconfig.compilerOptions

module.exports = function (api) {
	api.cache(true)

	const aliases = Object.keys(paths).reduce((acc, key) => {
		paths[key].forEach((path) => {
			const alias = key.replace('/*', '')

			acc[alias] = `./${path.replace('/*', '')}`
		})

		return acc
	}, {})

	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'react-native-reanimated/plugin',
			[
				'module-resolver',
				{
					root: baseUrl,
					extensions: ['.ts', '.tsx'],
					alias: aliases,
				},
			],
			[
				'module:react-native-dotenv',
				{
					moduleName: '@env',
					path: '.env',
					blacklist: null,
					whitelist: null,
					safe: false,
					allowUndefined: true,
				},
			],
		],
	}
}
