import React from 'react';
import { Calendar } from 'react-native-calendars';
import { getMarkedDates } from '../../functions/calendarFunctions';

const customCalendar = ({ onDayPress, markedDates }) => {
	//const markedDates = getMarkedDates(program, dailysPrograms, programType);
	return <Calendar onDayPress={onDayPress} markedDates={markedDates} />;
};

export default customCalendar;
