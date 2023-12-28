import { View, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

const EmojiSticker = ({ size, source }: { size: number; source: any }) => {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const scaleImage = useSharedValue(size);
	const doubleTap = Gesture.Tap()
		.numberOfTaps(2)
		.onStart(() => {
			if (scaleImage.value !== size * 2) {
				scaleImage.value = scaleImage.value * 2;
			}
		});

	const drag = Gesture.Pan().onChange((e) => {
		translateX.value += e.changeX;
		translateY.value += e.changeY;
	});

	const containerStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
		],
	}));

	const imageStyle = useAnimatedStyle(() => {
		return {
			width: withSpring(scaleImage.value),
			height: withSpring(scaleImage.value),
		};
	});

	return (
		<GestureDetector gesture={drag}>
			<Animated.View style={[containerStyle, { top: -350 }]}>
				<GestureDetector gesture={doubleTap}>
					<Animated.Image
						source={source}
						resizeMode="contain"
						style={[imageStyle, { width: size, height: size }]}
					/>
				</GestureDetector>
			</Animated.View>
		</GestureDetector>
	);
};

export default EmojiSticker;
