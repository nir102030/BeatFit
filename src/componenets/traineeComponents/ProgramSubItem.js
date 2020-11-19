import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const ProgramSubItem = ({ subItem, setProgramItem, finished }) => {
	const checkboxColor = finished ? 'grey' : 'green';
	const renderSubItem = subItem.columnsValues.map((value) => {
		return (
			<Text key={value} style={styles.listItem}>
				{value}
			</Text>
		);
	});

	return (
		<View style={styles.container}>
			<CheckBox
				size={20}
				containerStyle={styles.checkBox}
				textStyle={styles.checkBoxText}
				title={subItem.name}
				checked={subItem.done}
				onPress={() => {
					const newValue = finished ? subItem.done : !subItem.done;
					setProgramItem({ ...subItem, done: newValue });
				}}
				checkedColor={checkboxColor}
			/>
			<View style={styles.list}>{renderSubItem}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	checkBox: {
		borderWidth: 0,
		paddingHorizontal: 0,
		margin: 0,
		backgroundColor: 'transparent',
		flex: 1.5,
	},
	checkBoxText: {
		color: '#6b6e72',
		fontWeight: 'normal',
	},
	list: {
		flexDirection: 'row',
		flex: 3,
	},
	listItem: {
		flex: 1,
		alignSelf: 'center',
		textAlign: 'center',
		color: '#6b6e72',
	},
});

export default ProgramSubItem;
