import { getTotalSetsNum, getTotalSetsCompleted } from './trainingsFunctions';
import { getTotalCalories, getTotalCaloriesConsumed } from './nutritionFunctions';
import moment from 'moment';

export const getMarkedDates = (program, dailysPrograms, programType, selectedDate) => {
	let markedDates = {};
	const yesterday = moment().subtract(1, 'days');
	let programDates = [];

	//calcualte the marked daylis programs
	dailysPrograms.map((dailyProgram) => {
		const date = moment(dailyProgram.date);
		const total =
			programType == 'training' ? getTotalSetsNum(dailyProgram.items) : getTotalCalories(dailyProgram.items);
		const completed =
			programType == 'training'
				? getTotalSetsCompleted(dailyProgram.items)
				: getTotalCaloriesConsumed(dailyProgram.items);
		const completionStatus = completed / total >= program.minRate;
		const color = completionStatus ? 'green' : date.isAfter(yesterday) ? 'orange' : 'red';
		const selected = dailyProgram.date == selectedDate ? true : false;
		const markObj = { marked: true, dotColor: color, selected: selected };
		markedDates = { ...markedDates, [dailyProgram.date]: markObj };
		programDates.push(moment(date));
	});

	//mark the selected day (if it's not contain a program)
	if (!programDates.includes(selectedDate)) {
		markedDates = { ...markedDates, [selectedDate]: { selected: true } };
	}

	return markedDates;
};
