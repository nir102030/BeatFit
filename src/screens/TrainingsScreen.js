import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import getUser from './demoData';
import DailyProgram from '../componenets/DailyProgram';
import Calendar from '../componenets/Calendar';
import {generateDailysTrainings} from '../functions/trainingsFunctions';

const TrainingsScreen = () => {
	const initialProgram = getUser().programs.find((program) => program.type == 'trainings'); //get the user trainings program
	const [program, setProgram] = useState(initialProgram);
	//const dailysPrograms = generateDailysTrainings(program);
	const initialDate = new Date().toJSON().substring(0, 10); //set today as the initial date
	const initialDailyProgram = program.dailysPrograms.find((dailyProgram) => dailyProgram.date == initialDate); //find today's daily program
	const [dailyProgram, setDailyProgram] = useState(initialDailyProgram);
	console.log(dailyProgram)



	//update the program after a change in the current daily program
	const updateProgram = (newDailyProgram) => {
		const newDailysPrograms = program.dailysPrograms.map((dailyProgram) => {
			return dailyProgram.date == newDailyProgram.date ? newDailyProgram : dailyProgram;
		});
		setDailyProgram(newDailyProgram);
		setProgram({ ...program, dailysPrograms: newDailysPrograms });
	};

	//update the daily program according to the current date selected in calendar
	const setNewDailyProgram = (date) => {
		const dailyProgram = program.dailysPrograms.find((dailyProgram) => dailyProgram.date == date);
		setDailyProgram(dailyProgram);
	};

	//render the current daily program
	const renderDailyProgram = () => {
		return dailyProgram ? (
			<DailyProgram
				key = {dailyProgram.date}
				dailyProgram={dailyProgram}
				setProgram={(newDailyProgram) => updateProgram(newDailyProgram)}
				programType = {program.type}
			/>
		) : (
			<Text >אין תכנית אימון ביום זה</Text>
		);
	};

	return (
		<ScrollView style={styles.container}>
			<Calendar
				onDayPress={(date) => setNewDailyProgram(date.dateString)}
				program={program}
				dailysPrograms = {program.dailysPrograms}
			/>
			<Text style={styles.title}>תכנית אימון יומית</Text>
			{renderDailyProgram()}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container:{
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

export default TrainingsScreen;
