import React, { useState, useRef, useEffect, useContext } from "react";
import { View, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import DaysPicker from "../../componenets/programCreation/DaysPicker";
import DailyProgram from "../../componenets/programCreation/DailyProgram";
import ProgramPuller from "../../componenets/programCreation/ProgramPuller";

const CreateItemsScreen = ({ route, navigation }) => {
	const [program, setProgram] = useState(route.params.program);
	const programDays = program.type == "nutrition" ? [0, 1, 2, 3, 4, 5, 6] : program.targets["ימים"].sort();
	const [dayOpen, setDayOpen] = useState(null);
	const scrollViewRef = useRef();

	const mapItemsToDays = () => {
		let items = {};
		programDays.forEach((day) => {
			items = { ...items, [day]: [] };
		});
		setProgram({ ...program, items: items });
	};

	const scrollToEnd = () => {
		scrollViewRef.current.scrollToEnd({ animated: true });
	};

	useEffect(() => {
		scrollToEnd();
	}, [program]);

	useEffect(() => {
		mapItemsToDays();
	}, []);

	const renderDailyProgram = () => {
		return programDays.map((day, index) => {
			return (
				<DailyProgram
					key={index}
					day={day}
					items={program.items[day]}
					setItems={(dailyExercises) =>
						setProgram({ ...program, items: { ...program.items, [day]: dailyExercises } })
					}
					open={dayOpen == day ? true : false}
					programType={program.type}
				>
					{program.items[day] ? (
						program.items[day].length == 0 ? (
							<ProgramPuller
								programDays={programDays}
								dayOpen={dayOpen}
								setDailyProgram={(items) =>
									setProgram({
										...program,
										items: { ...program.items, [day]: items },
									})
								}
								items={program.items}
							/>
						) : null
					) : null}
				</DailyProgram>
			);
		});
	};

	return (
		<View style={styles.container}>
			<ScrollView ref={scrollViewRef}>
				<Text style={styles.title}>שלב 2: בחר {program.type == "training" ? "תרגילים" : "ארוחות"}</Text>
				<DaysPicker days={programDays} setDayOpen={setDayOpen} dayOpen={dayOpen} />
				{renderDailyProgram()}
			</ScrollView>
			<TouchableOpacity
				style={styles.doneButton}
				onPress={() => navigation.navigate("programSummary", { program: program, programDays: programDays })}
			>
				<Text style={styles.doneButtonText}>סיימתי</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CreateItemsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		marginTop: Dimensions.get("window").height * 0.03,
		marginBottom: 10,
		alignSelf: "center",
		fontSize: 26,
		fontWeight: "bold",
	},
	doneButton: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "rgba(50,200,50,0.7)",
		padding: 10,
	},
	doneButtonText: {
		textAlign: "center",
		fontSize: 22,
		fontWeight: "bold",
		color: "rgba(255,255,255,1)",
	},
});
