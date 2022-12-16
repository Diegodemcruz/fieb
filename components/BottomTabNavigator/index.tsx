import React, { useCallback, useMemo } from 'react'

import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { curveBasis, line } from 'd3-shape'
import { Alert, Dimensions } from 'react-native'
import { Path, Svg } from 'react-native-svg'

import HomeSvg from '@assets/bottomTab/home.svg'
import IntranetSvg from '@assets/bottomTab/intranet.svg'
import MenuSvg from '@assets/bottomTab/menu.svg'
import MenuActivatedSvg from '@assets/bottomTab/menuActivated.svg'
import NewsSvg from '@assets/bottomTab/news.svg'
import RHSvg from '@assets/bottomTab/rh.svg'

import { useBottomTabStore } from '@stores/bottomTab'

import BottomTabItem from './partials/BottomTabItem'
import { BottomTabContainer, Container, PrimaryBottomTabItemContainer } from './styles'

type BottomTabNavigatorProps = BottomTabBarProps

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ navigation }) => {
	const tabHollowColor = useBottomTabStore((s) => s.tabHollowColor)

	// TODO: Receive that from props
	const routes = [
		{
			name: 'RH',
			icon: <RHSvg height={24} width={24} />,
		},
		{
			name: 'News',
			icon: <NewsSvg height={24} width={24} />,
		},
		{
			primary: true,
			name: 'Home',
			goTo: 'Home',
			icon:
				tabHollowColor !== '#f5f5f5' ? (
					<MenuActivatedSvg height={24} width={24} />
				) : (
					<HomeSvg height={24} width={24} />
				),
		},
		{
			name: 'Intranet',
			icon: <IntranetSvg height={24} width={24} />,
		},
		{
			name: 'SettingsMenu',
			goTo: 'SettingsMenu',
			icon: <MenuSvg height={24} width={24} />,
		},
	]

	// TODO: Receive that from props
	const activeItemIndex = useMemo(() => 3, [])

	const screenWidth = useMemo(() => Math.ceil(Dimensions.get('window').width), [])
	const tabHeight = useMemo(() => 75, [])

	const lineGenerator = useMemo(
		() =>
			line()
				.x(([x]) => x)
				.y(([, y]) => y),
		[]
	)

	const backgroundPath = useMemo(
		() =>
			`${lineGenerator([
				[0, 0],
				[screenWidth, 0],
				[screenWidth, tabHeight],
				[0, tabHeight],
			])}`,
		[lineGenerator, screenWidth, tabHeight]
	)

	const tabItems = routes.length

	const selectedItemCurveWidth = useMemo(() => screenWidth / tabItems, [screenWidth, tabItems])

	const selectedItemPositionStart = useMemo(
		() => selectedItemCurveWidth * (activeItemIndex - 1),
		[activeItemIndex, selectedItemCurveWidth]
	)
	const selectedItemPositionEnd = useMemo(
		() => selectedItemCurveWidth * activeItemIndex,
		[activeItemIndex, selectedItemCurveWidth]
	)

	const curveHeight = useMemo(() => 48, [])

	const hollowCurvePath = useMemo(
		() =>
			`${lineGenerator.curve(curveBasis)([
				[selectedItemPositionStart - 10, 0],
				[selectedItemPositionStart, 10],
				[selectedItemPositionStart + 10, curveHeight],
				[selectedItemPositionStart + selectedItemCurveWidth / 1.5, curveHeight],
				// Middle below
				[selectedItemPositionStart + selectedItemCurveWidth / 2, curveHeight],
				// Middle above
				[selectedItemPositionEnd - selectedItemCurveWidth / 1.5, curveHeight],
				[selectedItemPositionEnd - 10, curveHeight],
				[selectedItemPositionEnd, 10],
				[selectedItemPositionEnd + 10, 0],
			])}`,
		[
			curveHeight,
			lineGenerator,
			selectedItemCurveWidth,
			selectedItemPositionEnd,
			selectedItemPositionStart,
		]
	)

	const handleNotImplementedYet = useCallback(() => {
		Alert.alert('Disponível em breve')
	}, [])

	return (
		<Container backgroundColor={tabHollowColor}>
			<Svg height={tabHeight} width={screenWidth}>
				<Path d={backgroundPath} fill='white' />
				<Path d={hollowCurvePath} fill={tabHollowColor} />
			</Svg>
			<BottomTabContainer>
				{routes.map((route) => {
					const { primary, goTo, name, icon } = route

					const onPress = goTo ? () => navigation.navigate(goTo) : handleNotImplementedYet

					if (primary) {
						return (
							<PrimaryBottomTabItemContainer key={name}>
								<BottomTabItem
									color={tabHollowColor !== '#f5f5f5' ? '#fff' : '#2977BE'}
									handlePress={onPress}
								>
									{icon}
								</BottomTabItem>
							</PrimaryBottomTabItemContainer>
						)
					} else {
						return (
							<BottomTabItem key={name} handlePress={onPress}>
								{icon}
							</BottomTabItem>
						)
					}
				})}
			</BottomTabContainer>
		</Container>
	)
}

export default BottomTabNavigator
