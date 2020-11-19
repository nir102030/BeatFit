import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';

const CreateProgramSubItem = ({ subItem, setProgramItem }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.name}>{subItem.name}</Text>
			<Input
				containerStyle={styles.input}
				value={subItem.reps}
				onChangeText={(input) => setProgramItem({ ...subItem, reps: input })}
			/>
			<Input
				containerStyle={styles.input}
				value={subItem.weight}
				onChangeText={(input) => setProgramItem({ ...subItem, weight: input })}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		//justifyContent: 'center',
	},
	name: {
		color: '#6b6e72',
		fontWeight: 'normal',
		fontSize: 16,
		flex: 1.5,
		marginLeft: 15,
	},
	input: {
		flex: 1,
	},
});

export default CreateProgramSubItem;
