import React, { useCallback, useRef, useState } from 'react'

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { NativeScrollEvent } from 'react-native'
import { interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { SwiperFlatListRefProps } from 'react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps'
import shallow from 'zustand/shallow'

import Icon from '@components/Icon'
import StatusBar from '@components/StatusBar'

import { AppStackParams } from '@routes/app.routes'

import { useBottomTabStore } from '@stores/bottomTab'
import { useTutorialStore } from '@stores/tutorial'

import ClickAnimation from './partials/ClickAnimation'
import SliderAnimation from './partials/SliderAnimation'
import {
	Button,
	ButtonLabel,
	Container,
	Content,
	Header,
	ItemAnimationContainer,
	ItemContainer,
	ItemListLabel,
} from './styles'

type ApprovalsTutorialProps = BottomTabScreenProps<AppStackParams, 'ApprovalsTutorial'>

const ApprovalsTutorial: React.FC<ApprovalsTutorialProps> = ({ navigation, route }) => {
	const [page, setPage] = useState(0)
	const swiperFlatListRef = useRef<SwiperFlatListRefProps>(null)
	const screenProgress = useSharedValue(0)
	const afterFinishGoTo = route.params?.afterFinishGoTo
	const changeTabVisibility = useBottomTabStore((s) => s.changeTabVisibility)
	const { setHasSeenTutorialInPaymentScreen, setHasSeenTutorialInTravelScreen } = useTutorialStore(
		(s) => ({
			setHasSeenTutorialInPaymentScreen: s.setHasSeenTutorialInPaymentScreen,
			setHasSeenTutorialInTravelScreen: s.setHasSeenTutorialInTravelScreen,
		}),
		shallow
	)

	useFocusEffect(
		useCallback(() => {
			changeTabVisibility(false)

			return () => {
				swiperFlatListRef.current?.scrollToIndex({ index: 0 })
				changeTabVisibility(true)
			}
		}, [changeTabVisibility])
	)

	const screens = [
		{
			title: 'Arraste para a direita\npara aprovar uma solicitação',
			actionLabel: 'Aprovar a solicitação',
			itemContainerColor: '#4ba963',
			alignTo: 'left',
			iconName: 'checkcircle',
			animationElement: (
				<SliderAnimation backgroundColor='#3f8850' canPlay={page === 0} sliderTo='right' />
			),
		},
		{
			title: 'Arraste para a\nesquerda para reprovar uma solicitação',
			actionLabel: 'Reprovar a solicitação',
			itemContainerColor: '#df3b3b',
			alignTo: 'right',
			iconName: 'closecircle',
			animationElement: (
				<SliderAnimation backgroundColor='#c62222' canPlay={page === 1} sliderTo='left' />
			),
		},
		{
			title: 'Clique para ver os\ndetalhes da\nsolicitação',
			itemContainerColor: '#162f46',
			animationElement: <ClickAnimation canPlay={page === 2} />,
		},
	]

	const contentAnimatedStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			screenProgress.value,
			[0, 1, 2],
			['#449859', '#DC2626', '#2977BE']
		)

		return {
			backgroundColor,
		}
	})

	const handleAnimation = useCallback(
		(nativeEvent: NativeScrollEvent) => {
			const { contentOffset, layoutMeasurement } = nativeEvent

			const progress = contentOffset.x / layoutMeasurement.width

			screenProgress.value = progress
		},
		[screenProgress]
	)

	const handleNext = useCallback(() => {
		if (page === 2) {
			let navigateTo: keyof AppStackParams = 'Home'

			switch (afterFinishGoTo) {
				case 'PaymentApprovals':
					navigateTo = 'PaymentApprovals'
					setHasSeenTutorialInPaymentScreen(true)
					break
				case 'TravelApprovals':
					navigateTo = 'TravelApprovals'
					setHasSeenTutorialInTravelScreen(true)
					break
			}

			navigation.navigate(navigateTo)

			return
		}

		if (page === screens.length - 1) {
			return
		}

		swiperFlatListRef.current?.scrollToIndex({ index: page + 1 })
	}, [
		afterFinishGoTo,
		navigation,
		page,
		screens.length,
		setHasSeenTutorialInPaymentScreen,
		setHasSeenTutorialInTravelScreen,
	])

	return (
		<>
			<StatusBar style='light' />
			<Container>
				<SwiperFlatList
					ref={swiperFlatListRef}
					renderItem={({ item }) => (
						<>
							<Content style={contentAnimatedStyle}>
								<Header>{item.title}</Header>
								<ItemAnimationContainer>
									<ItemContainer alignTo={item.alignTo} color={item.itemContainerColor}>
										<Icon
											icon={{
												family: 'AntDesign',
												name: item.iconName,
											}}
											color='#fff'
											size={24}
										/>
										<ItemListLabel>{item.actionLabel}</ItemListLabel>
									</ItemContainer>
									{item.animationElement}
								</ItemAnimationContainer>
								<Button onPress={handleNext}>
									<ButtonLabel>Entendi!</ButtonLabel>
								</Button>
							</Content>
						</>
					)}
					data={screens}
					index={page}
					scrollEnabled={false}
					showPagination={true}
					onChangeIndex={({ index }) => setPage(index)}
					onScroll={({ nativeEvent }) => handleAnimation(nativeEvent)}
				/>
			</Container>
		</>
	)
}

export default ApprovalsTutorial
