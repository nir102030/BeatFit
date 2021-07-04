import React, { useState, useContext } from "react";
import { getMarkedDates } from "../functions/calendarFunctions";

const useDailyProgram = (program, setProgram) => {
	const today = new Date().toJSON().substring(0, 10);
	//the daily program is changed according to the date chosen from the calendar
	const initialDailyProgram = program.dailysPrograms.find((dailyProgram) => dailyProgram.date == today);
	const [dailyProgram, setDailyProgram] = useState(
		initialDailyProgram ? { ...initialDailyProgram, blocked: false } : null
	);
	const [markedDates, setMarkedDates] = useState(
		getMarkedDates(program, program.dailysPrograms, program.type, today)
	);

	const updateDailyProgram = (newDailyProgram) => {
		const newDailysPrograms = program.dailysPrograms.map((dailyProgram) => {
			return dailyProgram.date == newDailyProgram.date ? newDailyProgram : dailyProgram;
		});
		setDailyProgram(newDailyProgram);
		setProgram({ ...program, dailysPrograms: newDailysPrograms });
	};

	return [dailyProgram, setDailyProgram, updateDailyProgram, markedDates, setMarkedDates];
};

export default useDailyProgram;
