import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CreateProgramItem from './CreateProgramItem';
import { getTotalSetsNum, getTotalSetsCompleted } from '../../functions/trainingsFunctions';
import { getTotalCalories, getTotalCaloriesConsumed } from '../../functions/nutritionFunctions';

const CreateDailyProgram = ({ dailyProgram, setProgram, programType }) => {
	const category = dailyProgram.category;

	//update the current daily program with the new item
	const setItem = (newItem) => {
		const newItems = dailyProgram.items.map((item) => {
			return item.title == newItem.title ? newItem : item;
		});
		const total = programType == 'trainings' ? getTotalSetsNum(newItems) : getTotalCalories(newItems);
		const completed =
			programType == 'trainings' ? getTotalSetsCompleted(newItems) : getTotalCaloriesConsumed(newItems);
		setProgram({ ...dailyProgram, items: newItems, total: total, completed: completed });
	};

	//renders the items in this daily program
	const renderProgramItems = dailyProgram.items.map((programItem) => {
		return (
			<View key={programItem.title} style={styles.listItem}>
				<CreateProgramItem
					item={programItem}
					category={category}
					setDailyProgram={(newItem) => setItem(newItem)}
				/>
			</View>
		);
	});

	return <View style={styles.container}>{renderProgramItems}</View>;
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

export default CreateDailyProgram;
