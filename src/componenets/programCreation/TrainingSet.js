import React from "react";
import { TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";
import { Card } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const TrainingSet = ({ set, setSet, deleteSet }) => {
	return (
		<Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
			<TouchableOpacity onPress={() => deleteSet(set.number)} style={styles.deleteLogo}>
				<AntDesign name="delete" size={16} color="black" />
			</TouchableOpacity>
			<Text style={styles.title}>סט {set.number}</Text>
			<TextInput
				placeholder={"חזרות"}
				value={set.replications}
				onChangeText={(value) => setSet({ ...set, replications: value })}
				keyboardType={"numeric"}
			/>
			<TextInput
				placeholder={"משקל"}
				value={set.weight}
				onChangeText={(value) => setSet({ ...set, weight: value })}
				keyboardType={"numeric"}
			/>
		</Card>
	);
};

export default TrainingSet;

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		marginTop: 0,
		marginBottom: 10,
		padding: 5,
	},
	wrapper: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	title: {
		fontWeight: "bold",
		marginLeft: 20,
	},
	deleteLogo: {
		alignItems: "flex-start",
		justifyContent: "flex-start",
		position: "absolute",
		top: 0,
		left: 0,
	},
});
