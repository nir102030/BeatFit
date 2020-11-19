import { getTotalSetsNum, getTotalSetsCompleted } from './trainingsFunctions';
import { getTotalCalories, getTotalCaloriesConsumed } from './nutritionFunctions';

export const getMarkedDates = (program, dailysPrograms, programType) => {
	let markedDates = {};
	dailysPrograms.map((dailyProgram) => {
		const total =
			programType == 'training' ? getTotalSetsNum(dailyProgram.items) : getTotalCalories(dailyProgram.items);
		const completed =
			programType == 'training'
				? getTotalSetsCompleted(dailyProgram.items)
				: getTotalCaloriesConsumed(dailyProgram.items);
		const color = completed / total >= program.minRate ? 'green' : 'red';
		markedDates = { ...markedDates, [dailyProgram.date]: { marked: true, dotColor: color } };
	});

	return markedDates;
};
