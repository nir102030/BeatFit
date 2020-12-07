import React from 'react';
import { Calendar } from 'react-native-calendars';

const customCalendar = ({ onDayPress, markedDates }) => {
	//const markedDates = getMarkedDates(program, dailysPrograms, programType);
	return (
		<Calendar
			onDayPress={onDayPress}
			markedDates={markedDates}
			//theme={{ calendarBackground: '#b4cdce' }}
			style={{
				borderWidth: 1,
				borderColor: '#cbcecd',
				borderRadius: 15,
				marginTop: 10,
				marginHorizontal: 5,
			}}
			enableSwipeMonths={true}
			hideArrows={true}
			theme={{
				selectedDayBackgroundColor: '#567da9',
			}}
		/>
	);
};

export default customCalendar;
