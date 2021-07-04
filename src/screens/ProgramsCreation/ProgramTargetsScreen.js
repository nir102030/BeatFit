import React, { useState } from "react";
import { StyleSheet, Dimensions, Text, View } from "react-native";
import { Button } from "react-native-elements";
import ProgramFormPicker from "../../componenets/genericComponents/ProgramFormPicker";
import Targets from "../../data/targets.json";

const ProgramTargetsScreen = ({ navigation, route }) => {
	const programType = route.params.programType;

	// initiate program targets
	let initialTargets = {};
	Targets[programType].forEach((target) => {
		initialTargets[target.title] = null;
	});

	const [program, setProgram] = useState({
		type: programType,
		targets: initialTargets,
		items: {},
	});

	const targets = Targets[programType];

	const renderTargets = () => {
		return targets.map((target, index) => {
			return (
				<ProgramFormPicker
					title={target.title}
					setSelectedValue={(value) => {
						setProgram({ ...program, targets: { ...program.targets, [target.title]: value } });
					}}
					items={target.values}
					key={index}
					index={index}
				/>
			);
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>שלב 1: בחר את יעדי התכנית</Text>
			<View style={styles.targets}>{renderTargets()}</View>
			{Object.keys(program.targets).find((key) => program.targets[key] == null) ? null : (
				<Button
					containerStyle={styles.buttonContainer}
					buttonStyle={styles.button}
					title={"המשך"}
					onPress={() => {
						navigation.navigate("programItems", { program: program });
					}}
				/>
			)}
		</View>
	);
};

export default ProgramTargetsScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		height: Dimensions.get("window").height,
	},
	title: {
		flex: 0.2,
		marginTop: Dimensions.get("window").height * 0.03,
		fontSize: 26,
		fontWeight: "bold",
	},
	targets: {
		flex: 3,
		justifyContent: "flex-start",
		marginTop: 30,
	},
	buttonContainer: {
		flex: 1,
		zIndex: -1,
	},
	button: {
		borderRadius: 15,
		width: Dimensions.get("window").height * 0.3,
		backgroundColor: "#209C5E",
	},
});
