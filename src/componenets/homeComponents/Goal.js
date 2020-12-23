import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Goal = ({ goal }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.textStyle}>{goal.name} :</Text>
			<Text style={styles.textStyle}>
				{goal.value} {goal.targetType}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	textStyle: {
		margin: 3,
		fontSize: 20,
		color: '#6b6e72',
	},
});

export default Goal;
