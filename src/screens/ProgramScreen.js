import React, { useState, useContext, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import DailyProgram from '../componenets/traineeComponents/DailyProgram';
import Calendar from '../componenets/traineeComponents/Calendar';
import { Context as UserContext } from '../context/UserContext';
import { getMarkedDates } from '../functions/calendarFunctions';
import { getCompletedRate } from '../functions/homeFunctions';
import { setNewDailyProgram, updateProgramLocaly, finishTrainingAlert } from '../functions/programFunctions';

const ProgramScreen = ({ route, navigation }) => {
	const today = new Date().toJSON().substring(0, 10);
	const programType = route.params.programType;
	const { state, editUser } = useContext(UserContext);

	const user = state;

	//the program is received from the user state
	const [program, setProgram] = useState(user.programs[programType]);

	//the daily program is changed according to the date chosen from the calendar
	const initialDailyProgram = program.dailysPrograms.find((dailyProgram) => dailyProgram.date == today);
	const [dailyProgram, setDailyProgram] = useState(
		initialDailyProgram ? { ...initialDailyProgram, blocked: false } : null
	);

	//recevie the marked dates object to mark the calendar according to the current program
	const [markedDates, setMarkedDates] = useState(getMarkedDates(program, program.dailysPrograms, programType, today));

	//show the "finish training" button only from non-blocked and non-finished programs,
	//and only for training programs
	const renderButton = () => {
		return dailyProgram.blocked || dailyProgram.finished ? null : (
			<Button
				buttonStyle={styles.endTrainingButton}
				title={programType == 'training' ? 'סיים אימון' : 'סיימתי לאכול להיום'}
				onPress={() =>
					finishTrainingAlert(
						Alert,
						dailyProgram,
						setDailyProgram,
						program,
						setProgram,
						setMarkedDates,
						getMarkedDates,
						getCompletedRate,
						user,
						programType,
						editUser,
						navigation
					)
				}
				titleStyle={{ color: '#e2e9f1', fontWeight: 'bold' }}
			/>
		);
	};

	//render the current daily program
	const renderDailyProgram = () => {
		return dailyProgram ? (
			<>
				<DailyProgram
					key={dailyProgram.date}
					dailyProgram={dailyProgram}
					setProgram={(newDailyProgram) =>
						updateProgramLocaly(newDailyProgram, setDailyProgram, setProgram, program)
					}
					programType={programType}
				/>
				{renderButton()}
			</>
		) : (
			<Text>אין תכנית אימון ביום זה</Text>
		);
	};

	return (
		<ScrollView style={styles.container}>
			<Calendar
				onDayPress={(date) =>
					setNewDailyProgram(
						date.dateString,
						setMarkedDates,
						program,
						getMarkedDates,
						setDailyProgram,
						programType,
						today
					)
				}
				program={program}
				dailysPrograms={program.dailysPrograms}
				programType={programType}
				markedDates={markedDates}
			/>
			<Text style={styles.title}>{programType == 'training' ? 'תכנית אימון יומית' : 'תפריט יומי'}</Text>
			{renderDailyProgram()}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		//backgroundColor:'#b4e4e6',
	},
	title: {
		fontWeight: 'bold',
		alignSelf: 'center',
		fontSize: 24,
		color: '#6b6e72',
		marginTop: 10,
	},
	endTrainingButton: {
		backgroundColor: '#567da9',
		margin: 10,
		borderRadius: 20,
	},
});

export default ProgramScreen;
