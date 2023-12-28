import { StyleSheet, Image, ImageSourcePropType } from "react-native";

export default function ImageViewer({
	img,
	selectedImage,
}: {
	img: ImageSourcePropType;
	selectedImage?: string | null;
}) {
	const source = selectedImage ? { uri: selectedImage } : img;
	return <Image source={source} style={styles.image} />;
}

const styles = StyleSheet.create({
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
});
