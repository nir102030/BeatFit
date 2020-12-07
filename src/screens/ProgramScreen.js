import React, { useState, useContext } from 'react';
import { Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import DailyProgram from '../componenets/traineeComponents/DailyProgram';
import Calendar from '../componenets/traineeComponents/Calendar';
import { Context as UserContext } from '../context/UserContext';
import { getMarkedDates } from '../functions/calendarFunctions';
import { getCompletedRate } from '../functions/homeFunctions';
import { editUserInDb } from '../api/appApi';

const ProgramScreen = ({ route }) => {
	const today = new Date().toJSON().substring(0, 10);
	const programType = route.params.programType;
	const { user, editUser } = route.params;
	//the program is received from the user state
	const [program, setProgram] = useState(user.programs[programType]);
	//the daily program is changed according to the date chosen from the calendar
	const initialDailyProgram = program.dailysPrograms.find((dailyProgram) => dailyProgram.date == today);
	const [dailyProgram, setDailyProgram] = useState(
		initialDailyProgram ? { ...initialDailyProgram, blocked: false } : null
	);

	const [markedDates, setMarkedDates] = useState(getMarkedDates(program, program.dailysPrograms, programType, today));

	//update the program state (localy for this component) after a change in the current daily program
	const updateProgramLocaly = (newDailyProgram) => {
		const newDailysPrograms = program.dailysPrograms.map((dailyProgram) => {
			return dailyProgram.date == newDailyProgram.date ? newDailyProgram : dailyProgram;
		});
		setDailyProgram(newDailyProgram);
		setProgram({ ...program, dailysPrograms: newDailysPrograms });
	};

	const finishTrainingAlert = () => {
		Alert.alert(
			`היי ${user.fname}`,
			'אתה בטוח שברצונך לסיים את האימון?',
			[
				{
					text: 'לא, עדיין לא סיימתי',
					style: 'cancel',
				},
				{ text: 'כן, סיים אימון', onPress: () => updateProgramsOnDb() },
			],
			{ cancelable: false }
		);
	};

	//update the program on db after completing the training
	const updateProgramsOnDb = () => {
		const newDailyProgram = { ...dailyProgram, finished: true }; //set the state of the daily program to finshed
		setDailyProgram(newDailyProgram);
		const newDailysPrograms = program.dailysPrograms.map((oldDailyProgram) => {
			//update the dailys programs array
			return oldDailyProgram.date == newDailyProgram.date ? newDailyProgram : oldDailyProgram;
		});
		setProgram({ ...program, dailysPrograms: newDailysPrograms });
		setMarkedDates(getMarkedDates(program, program.dailysPrograms, programType, dailyProgram.date));
		const completedRate = getCompletedRate(program.dailysPrograms, program.minRate);
		//edit user with the new daily program
		const newUser = {
			...user,
			programs: {
				...user.programs,
				[programType]: { ...program, dailysPrograms: newDailysPrograms, completedRate: completedRate },
			},
		};
		editUser(newUser);
	};

	//update the daily program according to the current date selected in calendar
	const setNewDailyProgram = (date) => {
		setMarkedDates(getMarkedDates(program, program.dailysPrograms, programType, date));
		const dailyProgram = program.dailysPrograms.find((dailyProgram) => dailyProgram.date == date);
		dailyProgram
			? setDailyProgram({ ...dailyProgram, blocked: dailyProgram.date == today ? false : true })
			: setDailyProgram(null);
	};

	//show the "finish training" button only from non-blocked and non-finished programs,
	//and only for training programs
	const renderButton = () => {
		// return dailyProgram.blocked || dailyProgram.finished ? null : programType == 'training' ? (
		// 	<Button
		// 		buttonStyle={styles.endTrainingButton}
		// 		title="סיים אימון"
		// 		onPress={() => finishTrainingAlert()}
		// 		titleStyle={{ color: '#e2e9f1', fontWeight: 'bold' }}
		// 	/>
		// ) : null;
		return (
			<Button
				buttonStyle={styles.endTrainingButton}
				title="סיים אימון"
				onPress={() => finishTrainingAlert()}
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
					setProgram={(newDailyProgram) => updateProgramLocaly(newDailyProgram)}
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
				onDayPress={(date) => setNewDailyProgram(date.dateString)}
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
