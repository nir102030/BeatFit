import React, { useState, useContext } from "react";
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import { Button } from "react-native-elements";
import { getPrograms } from "../../data/programData";
import { generateDailysTrainings } from "../../functions/trainingsFunctions";
import { generateDailysMenus } from "../../functions/nutritionFunctions";
import { Context as ProgramContext } from "../../context/ProgramContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const CreateProgramScreen = ({ navigation }) => {
	const {
		state: { programs },
		addProgram,
	} = useContext(ProgramContext);

	const generateDummyPrograms = () => {
		const tempPrograms = getPrograms();
		const trainingProgram = generateDailysTrainings(tempPrograms.training);
		const nutritionProgram = generateDailysMenus(tempPrograms.nutrition);
		addProgram(trainingProgram);
		addProgram(nutritionProgram);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>ברוכים הבאים ל - BeatFit!</Text>
			<Image source={require("../../../assets/adaptive-icon.png")} style={styles.backgroundImage} />
			<View style={styles.buttonsContainer}>
				{programs.training ? null : (
					<Button
						buttonStyle={styles.button}
						title="צור תכנית אימון"
						onPress={() => navigation.navigate("programTargets", { programType: "training" })}
					/>
				)}
				{programs.nutrition ? null : (
					<Button
						buttonStyle={styles.button}
						title="צור תכנית תזונה"
						onPress={() => navigation.navigate("programTargets", { programType: "nutrition" })}
					/>
				)}
				{!programs.nutrition && !programs.training ? (
					<TouchableOpacity onPress={generateDummyPrograms} style={styles.dummyContainer}>
						<Text style={styles.dummyText}>השתמש בתכניות דמה</Text>
					</TouchableOpacity>
				) : null}
			</View>
		</View>
	);
};

export default CreateProgramScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgba(255,255,255,0.5)",
	},
	buttonsContainer: {
		justifyContent: "center",
		position: "absolute",
		right: 0,
		left: 0,
		bottom: 15,
	},
	title: {
		alignSelf: "center",
		fontSize: 50,
		fontWeight: "bold",
		marginTop: Dimensions.get("window").height * 0.02,
		color: "rgba(255,255,255,1)",
		textShadowColor: "rgba(0,0,0,0.5)",
		textShadowRadius: 10,
		flexWrap: "wrap",
		textAlign: "center",
	},
	button: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderRadius: 15,
		backgroundColor: "#209C5E",
	},
	backgroundImage: {
		height: Dimensions.get("window").height * 0.8,
		width: Dimensions.get("window").width,
		opacity: 1,
		position: "absolute",
		top: Dimensions.get("window").height * 0.03,
		right: 0,
		left: 0,
		bottom: 0,
	},
	dummyContainer: {
		alignItems: "center",
		marginTop: 10,
	},
	dummyText: {
		fontWeight: "bold",
		color: "rgba(50,150,50,0.8)",
		fontSize: 16,
	},
});
