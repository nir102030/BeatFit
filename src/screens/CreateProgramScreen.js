import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { getPrograms } from '../data/programData';
import { generateDailysTrainings } from '../functions/trainingsFunctions';
import { generateDailysMenus } from '../functions/nutritionFunctions';
import { Context as UserContext } from '../context/UserContext';

const CreateProgramScreen = ({ navigation }) => {
	const [programs, setPrograms] = useState(); //in later versions, the program will be recived from other sources
	const { state, editUser } = useContext(UserContext);
	const user = state;

	const initiatePrograms = () => {
		const tempPrograms = getPrograms();
		const trainingProgram = generateDailysTrainings(tempPrograms.training);
		const nutritionProgram = generateDailysMenus(tempPrograms.nutrition);
		setPrograms({ ...programs, training: trainingProgram, nutrition: nutritionProgram });
	};

	useEffect(() => {
		initiatePrograms();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>ברוכים הבאים ל - BeatFit!</Text>
			<View style={styles.buttonsContainer}>
				<Button
					buttonStyle={styles.button}
					title="צור תכנית אימון"
					onPress={() => navigation.navigate('createTraining')}
				/>
				<Button buttonStyle={styles.button} title="צור תכנית תזונה" />
			</View>
		</View>
	);
};

export default CreateProgramScreen;

const styles = StyleSheet.create({
	container: {},
	buttonsContainer: {
		justifyContent: 'center',
		marginTop: Dimensions.get('window').height * 0.1,
	},
	title: {
		alignSelf: 'center',
		fontSize: 30,
		fontWeight: 'bold',
		marginTop: Dimensions.get('window').height * 0.2,
	},
	button: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderRadius: 15,
		opacity: 0.8,
		backgroundColor: '#209C5E',
	},
});
