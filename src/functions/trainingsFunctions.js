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

const generateDailysTrainingPrograms = (trainingProgram)=>{
	//the training program should include the full program
	//right now we extract it from the daily program for conviniant
	const trainingProgram = trainingProgram.dailysPrograms.find((dailyProgram)=> dailyProgram.date == new Date().toJSON().substring(0, 10));
}
