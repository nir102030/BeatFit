import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Goal from './Goal';
import Chart from './Chart';

const Goals = ({ goals, trainingsData, nutritionData }) => {
	const nutritionGoals = goals.filter((goal) => goal.type == 'תזונה');
	const traningsGoals = goals.filter((goal) => goal.type == 'אימונים');
	const data = {
		labels: ['December', 'Janruary', 'February'],
		datasets: [
			{
				data: [20, 45, 28],
			},
		],
	};
	const renderGoals = (goalsList) => {
		return goalsList.map((goal) => {
			return <Goal key={goal.name} goal={goal} />;
		});
	};

	return (
		<View>
			<View style={styles.goals}>
				<Text style={styles.headerText}>יעדי אימונים</Text>
				<View style={styles.goalsList}>{renderGoals(traningsGoals)}</View>
				<View style={styles.chart}>
					<Chart data={trainingsData} backgroundColor={'#6cc6ca'} />
				</View>
			</View>
			<View style={styles.goals}>
				<Text style={styles.headerText}>יעדי תזונה</Text>
				{renderGoals(nutritionGoals)}
				<View style={styles.chart}>
					<Chart data={nutritionData} color="#39a56f" />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	headerText: {
		fontSize: 24,
		marginTop: 0,
		fontWeight: 'bold',
		alignSelf: 'center',
		color: '#6b6e72',
	},
	goals: {
		borderColor: '#cbcecd',
		//backgroundColor: '#b4cdce',
		borderBottomWidth: 2,
		alignSelf: 'center',
		borderRadius: 20,
		marginTop: 10,
		//paddingVertical: 20,
		paddingHorizontal: 5,
		paddingBottom: 20,
	},
	chart: {
		alignItems: 'center',
	},
	goalsList: {},
});

export default Goals;
