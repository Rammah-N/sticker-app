import { StyleSheet, View, Platform } from "react-native";
import { useRef, useState } from "react";
import domtoimage from "dom-to-image";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Button from "./components/Button";
import ImageViewer from "./components/ImageViewer";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiModal from "./components/EmojiModal";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
	const imageRef = useRef<any>(null);
	const [status, requestPermission] = MediaLibrary.usePermissions();
	const [image, setImage] = useState<string | null>(null);
	const [emoji, setEmoji] = useState<any>(null);
	const [showEmojiModal, setShowEmoji] = useState(false);
	const [showOptions, setShowOptions] = useState(false);

	if (status === null) {
		requestPermission();
	}

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			setShowOptions(true);
		} else {
			alert("You did not select an image!");
		}
	};

	const onReset = () => {
		setShowOptions(false);
	};

	const onAddSticker = () => {
		setShowEmoji(true);
	};

	const onModalClose = () => {
		setShowEmoji(false);
	};

	console.log(emoji);

	const onSaveImage = async () => {
		if (Platform.OS !== "web") {
			try {
				const localUri = await captureRef(imageRef, {
					height: 440,
					quality: 1,
				});

				await MediaLibrary.saveToLibraryAsync(localUri);

				if (localUri) {
					alert("Saved!");
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const dataUrl = await domtoimage.toJpeg(imageRef.current, {
					quality: 0.95,
					width: 320,
					height: 440,
				});
				let link = document.createElement("a");
				link.download = "sticker-smash.jpeg";
				link.href = dataUrl;
				link.click();
			} catch (e) {
				console.log(e);
			}
		}
	};

	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.imageContainer}>
				<View ref={imageRef} collapsable={false}>
					<ImageViewer img={PlaceholderImage} selectedImage={image} />
					{emoji ? <EmojiSticker size={40} source={emoji} /> : null}
				</View>
			</View>
			{showOptions ? (
				<View style={styles.optionsContainer}>
					<View style={styles.optionsRow}>
						<IconButton icon="refresh" label="Reset" onPress={onReset} />
						<CircleButton onPress={onAddSticker} />
						<IconButton icon="save-alt" label="Save" onPress={onSaveImage} />
					</View>
				</View>
			) : (
				<View style={styles.footerContainer}>
					<Button
						label="Choose a photo"
						theme="primary"
						onPress={pickImageAsync}
					/>
					<Button label="Use this photo" onPress={() => setShowOptions(true)} />
				</View>
			)}
			<EmojiModal isVisible={showEmojiModal} onClose={onModalClose}>
				<EmojiList onSelect={setEmoji} onCloseModal={onModalClose}></EmojiList>
			</EmojiModal>
			<StatusBar style="light" />
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		alignItems: "center",
		justifyContent: "center",
	},

	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
	imageContainer: {
		flex: 1,
		paddingTop: 58,
	},

	footerContainer: {
		flex: 1 / 3,
		alignItems: "center",
	},

	optionsContainer: {
		position: "absolute",
		bottom: 80,
	},
	optionsRow: {
		alignItems: "center",
		flexDirection: "row",
	},
});
