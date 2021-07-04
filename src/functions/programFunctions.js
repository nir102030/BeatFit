//update the daily program according to the current date selected in calendar
export const setNewDailyProgram = (
	date,
	setMarkedDates,
	program,
	getMarkedDates,
	setDailyProgram,
	programType,
	today
) => {
	setMarkedDates(getMarkedDates(program, program.dailysPrograms, programType, date));
	const dailyProgram = program.dailysPrograms.find((dailyProgram) => dailyProgram.date == date);
	dailyProgram
		? setDailyProgram({ ...dailyProgram, blocked: dailyProgram.date == today ? false : true })
		: setDailyProgram(null);
};

//update the program state (localy for this component) after a change in the current daily program
export const updateProgramLocaly = (newDailyProgram, setDailyProgram, setProgram, program) => {
	const newDailysPrograms = program.dailysPrograms.map((dailyProgram) => {
		return dailyProgram.date == newDailyProgram.date ? newDailyProgram : dailyProgram;
	});
	setDailyProgram(newDailyProgram);
	setProgram({ ...program, dailysPrograms: newDailysPrograms });
};

//update the program on db after completing the training
export const updateProgramsOnDb = (
	dailyProgram,
	setDailyProgram,
	program,
	setProgram,
	setMarkedDates,
	getMarkedDates,
	getCompletedRate,
	programType,
	editProgram,
	navigation
) => {
	//set the state of the daily program to finshed
	const newDailyProgram = { ...dailyProgram, finished: true };
	setDailyProgram(newDailyProgram);

	//update the dailys programs array
	const newDailysPrograms = program.dailysPrograms.map((oldDailyProgram) => {
		return oldDailyProgram.date == newDailyProgram.date ? newDailyProgram : oldDailyProgram;
	});

	//update the program with the new dailys programs
	setProgram({ ...program, dailysPrograms: newDailysPrograms });

	//set the marked dates vector according to the new daily programs
	setMarkedDates(getMarkedDates(program, program.dailysPrograms, programType, dailyProgram.date));

	//calcualte the completed rate of the new program
	const completedRate = getCompletedRate(newDailysPrograms, program.minRate);

	//edit user with the new daily program
	const newProgram = { ...program, dailysPrograms: newDailysPrograms, completedRate: completedRate };
	editProgram(newProgram);
	navigation.navigate("Home");
};

export const finishTrainingAlert = (
	Alert,
	dailyProgram,
	setDailyProgram,
	program,
	setProgram,
	setMarkedDates,
	getMarkedDates,
	getCompletedRate,
	user,
	programType,
	editProgram,
	navigation
) => {
	Alert.alert(
		`היי ${user.fname}`,
		programType == "training" ? "אתה בטוח שברצונך לסיים את האימון?" : "אתה בטוח שסיימת לאכול להיום?",
		[
			{
				text: "לא, עדיין לא סיימתי",
				style: "cancel",
			},
			{
				text: programType == "training" ? "כן, סיים אימון" : "כן, סיימתי",
				onPress: () =>
					updateProgramsOnDb(
						dailyProgram,
						setDailyProgram,
						program,
						setProgram,
						setMarkedDates,
						getMarkedDates,
						getCompletedRate,
						programType,
						editProgram,
						navigation
					),
			},
		],
		{ cancelable: false }
	);
};
