import React, { useContext } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import { Context as UserContext } from "../../context/UserContext";
import { getDayOfWeekHeb } from "../../utils/dates";
import { Dimensions } from "react-native";
import { mapDataToProgram } from "../../utils/programCreation";
import { Context as ProgramContext } from "../../context/ProgramContext";

const ProgramSummaryScreen = ({ route, navigation }) => {
	const program = route.params.program;
	const programDays = route.params.programDays;
	const columnTitles = program.type == "training" ? ["מספר סט", "חזרות", "משקל"] : ["מצרך", "כמות", "יחידה"];

	const {
		state: { user },
	} = useContext(UserContext);

	const {
		state: { programs },
		addProgram,
		editProgram,
		setProgramLoading,
	} = useContext(ProgramContext);

	const userHasProgram = programs[program.type] ? true : false;

	const updateProgram = () => {
		const programObj = mapDataToProgram(program, programDays, user.userName);
		setProgramLoading({ type: program.type, loading: true });
		userHasProgram ? editProgram(programObj) : addProgram(programObj);
		navigation.popToTop();
	};

	const renderSubItems = (item) => {
		return item.subItems.map((subItem, index) => (
			<View key={index} style={styles.subItemContainer}>
				{Object.keys(subItem).map((key, index2) =>
					program.type == "nutrition" && key == "number" ? null : (
						<Text key={index2} style={styles.subItemText}>
							{subItem[key]}
						</Text>
					)
				)}
			</View>
		));
	};

	const renderColumnTitles = () => {
		return (
			<View style={styles.columnTitlesContainer}>
				{columnTitles.map((title, index) => (
					<Text key={index} style={styles.columnTitle}>
						{title}
					</Text>
				))}
			</View>
		);
	};

	const renderItems = (day) => {
		return program.items[day].map((item, index) => (
			<Card key={index} containerStyle={styles.itemContainer}>
				<Text style={styles.itemText}>{item.label}</Text>
				{renderColumnTitles()}
				{renderSubItems(item)}
			</Card>
		));
	};

	const renderProgramDays = () => {
		return programDays.map((day, index) => (
			<ScrollView key={index} contentContainerStyle={styles.programDayContainer}>
				<Text style={styles.title}>יום {getDayOfWeekHeb(day)}</Text>
				{renderItems(day)}
			</ScrollView>
		));
	};

	const renderTargets = () => {
		return (
			<View style={styles.targetsContainer}>
				<Text style={styles.title}>יעדי התכנית</Text>
				<Card containerStyle={styles.targetCard}>
					<Text style={styles.targetTitle}>משך התכנית</Text>
					<Text style={styles.targetValue}>{program.targets["משך התכנית"]} חודשים</Text>
				</Card>
				{program.type == "training" ? (
					<>
						<Card containerStyle={styles.targetCard}>
							<Text style={styles.targetTitle}>ימים</Text>
							{program.targets["ימים"].map((day, index) => (
								<Text key={index} style={styles.targetValue}>
									{getDayOfWeekHeb(day)}
								</Text>
							))}
						</Card>
						<Card containerStyle={styles.targetCard}>
							<Text style={styles.targetTitle}>אחוז סטים לבצע על מנת להשלים את האימון</Text>
							<Text style={styles.targetValue}>{program.targets["יעד מינימלי לאימון"] * 100} %</Text>
						</Card>
					</>
				) : null}
			</View>
		);
	};

	return (
		<ScrollView contentContainerStyle={styles.container} horizontal>
			{renderTargets()}
			{renderProgramDays()}
			<Button title="אישור" onPress={updateProgram} buttonStyle={styles.button} titleStyle={styles.buttonTitle} />
		</ScrollView>
	);
};

export default ProgramSummaryScreen;

const styles = StyleSheet.create({
	container: {},
	targetsContainer: {
		margin: 10,
		padding: 20,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "rgba(0,0,0,0.2)",
		backgroundColor: "rgba(50,100,50,0.6)",
		width: Dimensions.get("window").width * 0.8,
	},
	targetCard: {
		borderRadius: 15,
		backgroundColor: "rgba(255,255,255,0.8)",
	},
	targetTitle: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 20,
		paddingBottom: 5,
		color: "rgba(0,0,0,0.8)",
	},
	targetValue: {
		fontSize: 16,
		padding: 5,
		margin: 5,
		fontStyle: "italic",
		fontWeight: "bold",
		textAlign: "left",
	},
	title: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 26,
		color: "rgba(255,255,255,0.8)",
		textShadowColor: "rgba(0,0,0,0.5)",
		textShadowRadius: 20,
	},
	button: {
		marginVertical: 10,
		marginHorizontal: 10,
		borderRadius: 15,
		backgroundColor: "rgba(50,150,50,0.6)",
		padding: 20,
	},
	buttonTitle: {
		fontSize: 30,
		fontWeight: "bold",
	},
	programDayContainer: {
		margin: 10,
		padding: 20,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "rgba(0,0,0,0.2)",
		backgroundColor: "rgba(50,100,50,0.6)",
		//height: Dimensions.get("window").height * 0.35,
		width: Dimensions.get("window").width * 0.8,
	},
	itemContainer: {
		borderRadius: 15,
		backgroundColor: "rgba(255,255,255,0.8)",
	},
	itemText: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 18,
		paddingBottom: 5,
		color: "rgba(0,0,0,0.8)",
	},
	subItemContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 2,
	},
	subItemText: {
		textAlign: "center",
	},
	columnTitlesContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	columnTitle: {
		fontWeight: "bold",
		textAlign: "center",
	},
});
