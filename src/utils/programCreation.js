import moment from "moment";

// generate the program object to be saved in state and db from the user input
export const mapDataToProgram = (program, programDays, userName) => {
	//initialize the program object
	let programObj = initializeProgramObject(program, programDays, userName);

	// generate dailys programs
	const dailyPrograms = generateDailysPrograms(program, programDays, programObj);

	return { ...programObj, dailysPrograms: dailyPrograms };
};

const initializeProgramObject = (program, programDays, userName) => {
	return {
		userName: userName,
		type: program.type,
		minRate: program.targets["יעד מינימלי לאימון"] ? program.targets["יעד מינימלי לאימון"] : 0.8,
		startDate: moment(),
		endDate: moment().add(program.targets["משך התכנית"], "months"),
		days: programDays,
		completedRate: 0,
		dailysPrograms: [],
	};
};

const generateDailysPrograms = (program, programDays, programObj) => {
	let dailysPrograms = [];
	let date = moment();
	while (date < programObj.endDate) {
		const dayOfWeek = date.day();
		const programDay = programDays.find((day) => day == dayOfWeek);
		if (programDay || programDay == 0) {
			const dailyProgram = createDailyProgram(program, programDay, date);
			dailysPrograms.push(dailyProgram);
		}
		date.add(1, "days");
	}
	return dailysPrograms;
};

const createDailyProgram = (program, programDay, date) => {
	let dailyProgram = initializeDailyProgram(program, date);

	const items = mapDailyItems(program.items[programDay], program.type);

	const total =
		program.type == "training"
			? getTotalSetsCount(program.items[programDay])
			: getTotalCalories(program.items[programDay]);

	dailyProgram = {
		...dailyProgram,
		total: total,
		items: items,
	};

	return dailyProgram;
};

const initializeDailyProgram = (program, date) => {
	return {
		date: new Date(date).toJSON().substring(0, 10),
		category: program.type == "training" ? "סט" : "מצרך",
		columnsTitles: program.type == "training" ? ["חזרות", "משקל"] : ["כמות", "יחידה", "קלוריות"],
		total: 0,
		completed: 0,
		blocked: false,
		finished: false,
		items: [],
	};
};

const mapDailyItems = (dailyItems, programType) => {
	return dailyItems.map((item) => {
		//map the subItems to program subitem
		const subItems = item.subItems.map((subItem) => {
			return programType == "training"
				? { name: subItem.number, done: false, columnsValues: [subItem.replications, subItem.weight] }
				: { name: subItem.label, done: false, columnsValues: [subItem.amount, subItem.unit, 0] };
		});
		return { label: item.label, value: item.value, subItems: subItems };
	});
};

const getTotalSetsCount = (dailyItems) => {
	let totalSetsCount = 0;
	dailyItems.forEach((item) => {
		totalSetsCount = totalSetsCount + item.subItems.length;
	});
	return totalSetsCount;
};
