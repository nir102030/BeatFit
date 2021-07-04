export const getTotalCalories = (programItems) => {
	let totalCalories = 0;
	programItems.map((item) => {
		item.subItems.map((subItem) => {
			totalCalories += subItem.columnsValues[2];
		});
	});
	return totalCalories;
};

export const getTotalCaloriesConsumed = (programItems) => {
	let totalCaloriesConsumed = 0;
	programItems.map((item) => {
		item.subItems.map((subItem) => {
			if (subItem.done) totalCaloriesConsumed += subItem.columnsValues[2];
		});
	});
	return totalCaloriesConsumed;
};

export const generateDailysMenus = (program) => {
	//the training program should include the full program
	//right now we extract it from the daily program for conviniant
	const today = new Date().toJSON().substring(0, 10);
	const nutritionProgram = program.dailysPrograms.find((dailyProgram) => dailyProgram.date == today);
	const startDate = program.startDate;
	const endDate = program.endDate;
	let date = startDate;

	let dailysPrograms = [];
	//iterate over the program period, and add the daily program
	// into the dailys programs array if it fittes the program days.
	while (date < endDate) {
		dailysPrograms.push({ ...nutritionProgram, date: date.toJSON().substring(0, 10) });
		date.add(1, "days");
	}
	return { ...program, dailysPrograms: dailysPrograms };
};
