import React from 'react';
import { Calendar } from 'react-native-calendars';
import { getMarkedDates } from '../functions/calendarFunctions';

const customCalendar = ({ onDayPress, program, dailysPrograms}) => {
	const markedDates = getMarkedDates(program, dailysPrograms);
	return <Calendar onDayPress={onDayPress} markedDates={markedDates} />;
};

export default customCalendar;
