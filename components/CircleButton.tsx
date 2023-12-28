import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const CircleButton = ({ onPress }: { onPress: (item: any) => void }) => {
	return (
		<View style={styles.circleButtonContainer}>
			<Pressable style={styles.circleButton} onPress={onPress}>
				<MaterialIcons name="add" size={38} color="#25292e" />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	circleButtonContainer: {
		width: 84,
		height: 84,
		marginHorizontal: 60,
		borderWidth: 4,
		borderColor: "#ffd33d",
		borderRadius: 42,
		padding: 3,
	},
	circleButton: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 42,
		backgroundColor: "#fff",
	},
});

export default CircleButton;
