import React, { useState, useContext } from 'react';
import { Text, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import DailyProgram from '../componenets/traineeComponents/DailyProgram';
import Calendar from '../componenets/traineeComponents/Calendar';
import { Context as UserContext } from '../context/UserContext';
import { getMarkedDates } from '../functions/calendarFunctions';

const ProgramScreen = (params) => {
	const programType = params.route.params.programType;
	const { state, editUser } = useContext(UserContext);
	//the program is received from the user state
	const [program, setProgram] = useState(state.user.programs[programType]);

	//the daily program is changed according to the date chosen from the calendar
	const [dailyProgram, setDailyProgram] = useState(
		program.dailysPrograms.find((dailyProgram) => dailyProgram.date == new Date().toJSON().substring(0, 10))
	);

	const [markedDates, setMarkedDates] = useState(getMarkedDates(program, program.dailysPrograms, programType));

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
			`היי ${state.user.fname}`,
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
		const newDailyProgram = { ...dailyProgram, finished: true }; //set the state of the daily program to finished
		setDailyProgram(newDailyProgram);
		const newDailysPrograms = program.dailysPrograms.map((oldDailyProgram) => {
			//update the dailys programs array
			return oldDailyProgram.date == newDailyProgram.date ? newDailyProgram : oldDailyProgram;
		});
		setProgram({ ...program, dailysPrograms: newDailysPrograms });
		setMarkedDates(getMarkedDates(program, program.dailysPrograms, programType));
		//edit user with the new daily program
		editUser({
			...state.user,
			programs: { ...state.user.programs, [programType]: { ...program, dailysPrograms: newDailysPrograms } },
		});
	};

	//update the daily program according to the current date selected in calendar
	const setNewDailyProgram = (date) => {
		const dailyProgram = program.dailysPrograms.find((dailyProgram) => dailyProgram.date == date);
		setDailyProgram(dailyProgram);
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
				{programType == 'training' ? <Button title="סיים אימון" onPress={() => finishTrainingAlert()} /> : null}
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
});

export default ProgramScreen;
