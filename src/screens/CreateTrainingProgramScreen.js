import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet, FlatList, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Input, Card } from 'react-native-elements';

const CreateTrainingProgramScreen = () => {
	const [exercise, setExercise] = useState('');
	return (
		<View style={styles.container}>
			<Text style={styles.title}>בנה את תכנית האימון</Text>
			<Card>
				<Input placeholder="שם תרגיל" />
				<Picker
					selectedValue={exercise}
					style={{ height: 50, width: 100 }}
					onValueChange={(itemValue, itemIndex) => setExercise(itemValue)}
				>
					<Picker.Item label="שכיבות סמיכה" value="pushups" />
					<Picker.Item label="סקוואט" value="squat" />
				</Picker>
			</Card>
		</View>
	);
};

export default CreateTrainingProgramScreen;

const styles = StyleSheet.create({
	container: {},
	title: {
		marginTop: Dimensions.get('window').height * 0.03,
		alignSelf: 'center',
		fontSize: 18,
		fontWeight: 'bold',
	},
	card: {},
});
