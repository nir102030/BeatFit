import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import Goals from '../componenets/homeComponents/Goals';
import { Context as UserContext } from '../context/UserContext';
import { getChartData } from '../functions/homeFunctions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
	const { state } = useContext(UserContext);

	const programs = {
		training: state.programs.training,
		nutrition: state.programs.nutrition,
	};

	const trainingsData = getChartData(programs.training);
	const nutritionData = getChartData(programs.nutrition);

	const goals = [
		{
			type: 'אימונים',
			name: 'עמדת ביעד ב-',
			targetType: 'מהאימונים עד כה',
			value: `${Math.round(programs.training.completedRate * 100)}%`,
		},
		{
			type: 'תזונה',
			name: 'עמדת ביעד ב-',
			targetType: 'מהימים עד כה',
			value: `${Math.round(programs.nutrition.completedRate * 100)}%`,
		},
	];

	return (
		<ScrollView>
			<Goals goals={goals} trainingsData={trainingsData} nutritionData={nutritionData} />
		</ScrollView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	goalsContainer: {},
	goalItem: {
		borderColor: 'grey',
		borderWidth: 1,
		alignSelf: 'center',
		borderRadius: 20,
		width: windowWidth * 0.8,
		height: windowHeight * 0.35,
		paddingHorizontal: 10,
		marginTop: 20,
	},
});
