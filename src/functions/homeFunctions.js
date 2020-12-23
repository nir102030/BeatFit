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

export const getChartData = (program) => {
	let completed = [0, 0, 0];
	let total = [1, 1, 1];
	let completedRate = [0, 0, 0];

	program.dailysPrograms.map((dailyProgram) => {
		if (dailyProgram.completed / dailyProgram.total > program.minRate) {
			if (dailyProgram.date.substring(5, 7) == '12') completed[0]++;
			if (dailyProgram.date.substring(5, 7) == '01') completed[1]++;
			if (dailyProgram.date.substring(5, 7) == '02') completed[2]++;
		}
		if (dailyProgram.date.substring(5, 7) == '12') total[0]++;
		if (dailyProgram.date.substring(5, 7) == '01') total[1]++;
		if (dailyProgram.date.substring(5, 7) == '02') total[2]++;
	});
	completedRate[0] = Math.round((completed[0] / total[0]) * 100);
	completedRate[1] = Math.round((completed[1] / total[1]) * 100);
	completedRate[2] = Math.round((completed[2] / total[2]) * 100);

	return {
		labels: ['December', 'Janruary', 'February'],
		datasets: [
			{
				data: completedRate,
			},
		],
	};
};
