import React from 'react';
import { Calendar } from 'react-native-calendars';
import { getMarkedDates } from '../functions/calendarFunctions';

const customCalendar = ({ onDayPress, program}) => {
	const markedDates = getMarkedDates(program);
	return <Calendar onDayPress={onDayPress} markedDates={markedDates} />;
};

export default customCalendar;
