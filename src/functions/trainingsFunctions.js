export const getTotalSetsNum = (programItems) => {
	let totalSetsNum = 0;
	programItems.map((item) => {
		item.subItems.map((subItem) => {
			totalSetsNum += 1;
		});
	});
	return totalSetsNum;
};

export const getTotalSetsCompleted = (programItems) => {
	let totalSetsNumCompleted = 0;
	programItems.map((item) => {
		item.subItems.map((subItem) => {
			if (subItem.done) totalSetsNumCompleted += 1;
		});
	});
	return totalSetsNumCompleted;
};

export const generateDailysTrainings = (program) => {
	//the training program should include the full program
	//right now we extract it from the daily program for conviniant
	const today = new Date().toJSON().substring(0, 10);
	const trainingProgram = program.dailysPrograms.find((dailyProgram) => dailyProgram.date == today);
	const startDate = program.startDate;
	const endDate = program.endDate;
	let date = startDate;

	let dailysPrograms = [];
	//iterate over the program period, and add the daily program
	// into the dailys programs array if it fittes the program days.
	while (date < endDate) {
		const dayOfWeek = date.day();
		if (program.days.includes(dayOfWeek)) {
			dailysPrograms.push({ ...trainingProgram, date: date.toJSON().substring(0, 10) });
		}
		date.add(1, 'days');
	}
	return { ...program, dailysPrograms: dailysPrograms };
};
