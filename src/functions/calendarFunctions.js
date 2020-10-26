import { getTotalSetsNum, getTotalSetsCompleted } from './trainingsFunctions';
import { getTotalCalories, getTotalCaloriesConsumed } from './nutritionFunctions';

export const getMarkedDates = (program) => {
	let markedDates = {};
	program.dailysPrograms.map((dailyProgram) => {
		const total =
			program.type == 'trainings' ? getTotalSetsNum(dailyProgram.items) : getTotalCalories(dailyProgram.items);
		const completed =
			program.type == 'trainings'
				? getTotalSetsCompleted(dailyProgram.items)
				: getTotalCaloriesConsumed(dailyProgram.items);
		const color = completed / total >= program.minRate ? 'green' : 'red';
		markedDates = { ...markedDates, [dailyProgram.date]: { marked: true, dotColor: color } };
	});

	return markedDates;
};
