import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const ProgramSubItem = ({ subItem, setProgramItem }) => {
	//const [subItem, setSubItem] = useState(initialSubItem);
	//console.log(subItem);

	const renderSubItem = subItem.columnsValues.map((value) => {
		return <Text key = {value} style={styles.listItem}>{value}</Text>;
	});

	return (
		<View style={styles.container}>
			<CheckBox
				//iconRight={true}
				//right={true}
				size={20}
				containerStyle={styles.checkBox}
				textStyle={styles.checkBoxText}
				title={subItem.name}
				checked={subItem.done}
				onPress={() => {
					const newValue = !subItem.done;
					setProgramItem({ ...subItem, done: newValue });
				}}
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
