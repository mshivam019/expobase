import React from "react";
import { View, Dimensions } from "react-native";
import Animated, {
	Extrapolation,
	SharedValue,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { SBImageItem } from "./SBImage";

const window = Dimensions.get("window");
const PAGE_WIDTH = window.width;
const PAGE_HEIGHT = window.height;
const colors = [
	"#ffe190",
	"#8fa6da",
	"#6dd3f7",
	"#9dd0b5",
	"#f8a977",
	"#398cd5",
];

function Cards() {
	const progressValue = useSharedValue<number>(0);

	return (
		<View
			style={{
				alignItems: "center",
			}}
		>
			<Carousel
				vertical={false}
				width={PAGE_WIDTH}
				height={PAGE_WIDTH * 0.8}
				style={{
					width: PAGE_WIDTH,
				}}
				loop
				pagingEnabled={true}
				snapEnabled={true}
				autoPlay={true}
				autoPlayInterval={8000}
				onProgressChange={(_, absoluteProgress) =>
					(progressValue.value = absoluteProgress)
				}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 50,
				}}
				panGestureHandlerProps={{
					activeOffsetX: [-10, 10],
				}}
				data={colors}
				renderItem={({ index }) => <SBImageItem index={index} />}
			/>
			{!!progressValue && (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: 100,
						alignSelf: "center",
					}}
				>
					{colors.map((backgroundColor, index) => {
						return (
							<PaginationItem
								backgroundColor={backgroundColor}
								animValue={progressValue}
								index={index}
								key={index}
								isRotate={false}
								length={colors.length}
							/>
						);
					})}
				</View>
			)}
		</View>
	);
}

const PaginationItem: React.FC<{
	index: number;
	backgroundColor: string;
	length: number;
	animValue: SharedValue<number>;
	isRotate?: boolean;
}> = (props) => {
	const { animValue, index, length, backgroundColor, isRotate } = props;
	const width = 10;

	const animStyle = useAnimatedStyle(() => {
		let inputRange = [index - 1, index, index + 1];
		let outputRange = [-width, 0, width];

		if (index === 0 && animValue?.value > length - 1) {
			inputRange = [length - 1, length, length + 1];
			outputRange = [-width, 0, width];
		}

		return {
			transform: [
				{
					translateX: interpolate(
						animValue?.value,
						inputRange,
						outputRange,
						Extrapolation.CLAMP
					),
				},
			],
		};
	}, [animValue, index, length]);
	return (
		<View
			style={{
				backgroundColor: "#a8a8a8a6",
				width,
				height: width,
				borderRadius: 50,
				overflow: "hidden",
				transform: [
					{
						rotateZ: isRotate ? "90deg" : "0deg",
					},
				],
			}}
		>
			<Animated.View
				style={[
					{
						borderRadius: 50,
						backgroundColor,
						flex: 1,
					},
					animStyle,
				]}
			/>
		</View>
	);
};

export default Cards;
