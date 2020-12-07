export const getCompletedRate = (dailyPrograms, minRate) => {
	let completed = 0;
	let total = 0;
	dailyPrograms.map((dailyProgram) => {
		const dailyRate = dailyProgram.completed / dailyProgram.total;
		if (dailyRate > minRate) completed++;
		total++;
	});
	return completed / total;
};
