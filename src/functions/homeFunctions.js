import moment from 'moment';

export const getCompletedRate = (dailyPrograms, minRate) => {
	let completed = 0;
	let total = 0;
	dailyPrograms.map((dailyProgram) => {
		if (moment(dailyProgram.date) <= moment()) {
			const dailyRate = dailyProgram.completed / dailyProgram.total;
			if (dailyRate > minRate) completed++;
			total++;
		}
	});
	return completed / total;
};

export const getChartData = (program) => {
	let completedRate = [];
	let months = [];
	let month;
	let indx = -1;
	let completed = 0;
	let total = 0;

	program.dailysPrograms.map((dailyProgram) => {
		month = moment(dailyProgram.date).format('MMMM');
		if (indx == -1) {
			months[0] = month;
			indx++;
		}

		//count the completed dailys programs and the total
		if (dailyProgram.completed / dailyProgram.total > program.minRate) {
			completed++;
		}
		total++;

		//add month to months array
		if (months[indx] != month) {
			completedRate = [...completedRate, (completed / total) * 100];
			indx++;
			months[indx] = month;
			completed = 0;
			total = 0;
		}
	});

	//calculate the completed rate for the last month
	completedRate = [...completedRate, (completed / total) * 100];
	months[indx] = month;

	return {
		labels: months,
		datasets: [
			{
				data: completedRate,
			},
		],
	};
};
