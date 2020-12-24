import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProgramItem from './ProgramItem';
import { getTotalSetsNum, getTotalSetsCompleted } from '../../functions/trainingsFunctions';
import { getTotalCalories, getTotalCaloriesConsumed } from '../../functions/nutritionFunctions';
import moment from 'moment';

const DailyProgram = ({ dailyProgram, setProgram, programType }) => {
	const category = dailyProgram.category;
	const columnsTitles = dailyProgram.columnsTitles;
	const today = new Date().toJSON().substring(0, 10);
	//update the current daily program with the new item
	const setItem = (newItem) => {
		const newItems = dailyProgram.items.map((item) => {
			return item.title == newItem.title ? newItem : item;
		});
		const total = programType == 'training' ? getTotalSetsNum(newItems) : getTotalCalories(newItems);
		const completed =
			programType == 'training' ? getTotalSetsCompleted(newItems) : getTotalCaloriesConsumed(newItems);
		setProgram({ ...dailyProgram, items: newItems, total: total, completed: completed });
	};

	//renders the items in this daily program
	const renderProgramItems = dailyProgram.items.map((programItem) => {
		return (
			<View key={programItem.title} style={styles.listItem}>
				<ProgramItem
					item={programItem}
					category={category}
					columnsTitles={columnsTitles}
					setDailyProgram={(newItem) => setItem(newItem)}
					blocked={dailyProgram.date == today ? dailyProgram.finished : dailyProgram.blocked}
				/>
			</View>
		);
	});

	//render the program KPIs in accordnece to the program type
	const renderKPIs = () => {
		//the initial KPIs values are now 0 but will be recived from the DB
		return programType == 'training' ? (
			<View>
				<Text style={styles.kpi}>סה"כ סטים בתכנית: {dailyProgram.total}</Text>
				<Text style={styles.kpi}>סה"כ סטים הושלמו: {dailyProgram.completed}</Text>
			</View>
		) : (
			<View>
				<Text style={styles.kpi}>סה"כ קלוריות בתפריט: {dailyProgram.total}</Text>
				<Text style={styles.kpi}>סה"כ קלוריות נצרכו: {dailyProgram.completed}</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.date}>{dailyProgram.date}</Text>
			{dailyProgram.blocked ? (
				moment(dailyProgram.date) < moment() ? (
					<Text style={{ color: 'red', marginVertical: 10 }}>חבל, פספסת את התכנית :(</Text>
				) : (
					<Text style={{ color: 'orange', marginVertical: 10 }}>התכנית תיפתח לעריכה בתאריך המתאים</Text>
				)
			) : null}
			{dailyProgram.finished ? (
				<Text style={{ color: 'green', marginVertical: 10 }}>כל הכבוד! התכנית בוצעה!</Text>
			) : null}
			{renderKPIs()}
			{renderProgramItems}
		</View>
	);
};

const styles = StyleSheet.create({
	listItem: {
		borderWidth: 1,
		borderColor: '#cbcecd',
		marginVertical: 8,
		marginHorizontal: 5,
		borderRadius: 10,
		padding: 10,
	},
	date: {
		alignSelf: 'center',
		color: '#6b6e72',
		fontWeight: 'bold',
	},
	kpi: {
		color: '#6b6e72',
	},
});

export default DailyProgram;
