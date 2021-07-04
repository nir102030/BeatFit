import React, { useState, useContext, useEffect } from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useNavigationState } from "@react-navigation/native";
import DailyProgram from "../componenets/traineeComponents/DailyProgram";
import Calendar from "../componenets/traineeComponents/Calendar";
import { Context as ProgramContext } from "../context/ProgramContext";
import { Context as DailyProgramContext } from "../context/DailyProgramContext";
import { getMarkedDates } from "../functions/calendarFunctions";

const ProgramScreen = () => {
	const today = new Date().toJSON().substring(0, 10);
	const screenIndex = useNavigationState((state) => state.index);
	const programType = screenIndex == 1 ? "training" : "nutrition";

	const {
		state: { programs },
		editProgram,
	} = useContext(ProgramContext);

	const {
		state: { dailyProgram },
		setChosenDailyProgram,
	} = useContext(DailyProgramContext);

	const program = programs[programType];

	const [markedDates, setMarkedDates] = useState(
		getMarkedDates(program, program.dailysPrograms, program.type, today)
	);

	//show the "finish training" button only from non-blocked and non-finished programs,
	//and only for training programs
	const renderFinishButton = () => {
		return dailyProgram.finished ? null : (
			<Button
				buttonStyle={styles.endTrainingButton}
				title={programType == "training" ? "סיים אימון" : "סיימתי לאכול להיום"}
				onPress={() => console.log("training finished")}
				titleStyle={{ color: "#e2e9f1", fontWeight: "bold" }}
			/>
		);
	};

	//render the current daily program
	const renderDailyProgram = () => {
		return dailyProgram ? (
			<>
				<DailyProgram key={dailyProgram.date} dailyProgram={dailyProgram} programType={program.type} />
				{renderFinishButton()}
			</>
		) : (
			<Text style={styles.noTrainingText}>יום חופש 😀</Text>
		);
	};

	const updateChosenDay = (date) => {
		const chosenDate = date.dateString;
		const currentDailyProgram = programs[programType].dailysPrograms.find(
			(dailyProgram) => dailyProgram.date == chosenDate
		);
		setChosenDailyProgram(currentDailyProgram);
		setMarkedDates(getMarkedDates(program, program.dailysPrograms, program.type, chosenDate));
	};

	useEffect(() => {
		const currentDailyProgram = programs[programType].dailysPrograms.find(
			(dailyProgram) => dailyProgram.date == today
		);
		setChosenDailyProgram(currentDailyProgram);
	}, [programType]);

	return (
		<ScrollView style={styles.container}>
			<Calendar
				onDayPress={updateChosenDay}
				program={program}
				dailysPrograms={program.dailysPrograms}
				programType={programType}
				markedDates={markedDates}
			/>
			<Text style={styles.title}>
				{programType == "training" ? (dailyProgram ? "תכנית אימון יומית 🏋️🏋️‍♀️" : null) : "תפריט יומי 🍲"}
			</Text>
			{renderDailyProgram()}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {},
	title: {
		fontWeight: "bold",
		alignSelf: "center",
		fontSize: 24,
		color: "#6b6e72",
		marginTop: 10,
	},
	endTrainingButton: {
		backgroundColor: "#567da9",
		margin: 10,
		borderRadius: 20,
	},
	noTrainingText: {
		textAlign: "center",
		marginTop: "20%",
		fontSize: 30,
		fontWeight: "bold",
		color: "rgba(150,50,50,0.8)",
	},
});

export default ProgramScreen;
