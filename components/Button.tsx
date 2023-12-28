import { Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({
	label,
	theme,
	onPress,
}: {
	label: String;
	theme?: string;
	onPress?: () => void;
}) {
	if (theme === "primary") {
		return (
			<View
				style={[
					styles.buttonContainer,
					{ borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
				]}>
				<Pressable
					onPress={onPress}
					style={[styles.button, { backgroundColor: "#fff" }]}>
					<FontAwesome
						name="picture-o"
						size={18}
						color="#25292e"
						style={styles.buttonIcon}
					/>
					<Text style={[styles.buttonLabel, { color: "#25292e" }]}>
						{label}
					</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<View style={styles.buttonContainer}>
			<Pressable
				style={styles.button}
				onPress={onPress}>
				<Text style={styles.buttonLabel}>{label}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: 320,
		height: 68,
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "center",
		padding: 3,
	},
	button: {
		borderRadius: 10,
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	buttonIcon: {
		paddingRight: 8,
	},
	buttonLabel: {
		color: "#fff",
		fontSize: 16,
	},
});
