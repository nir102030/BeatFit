import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

const ProgramSubItem = ({ subItem, blocked, onEdit }) => {
	const checkboxColor = blocked ? "grey" : "green";
	const renderSubItem = subItem.columnsValues.map((value, index) => {
		return (
			<Text key={index} style={styles.listItem}>
				{value}
			</Text>
		);
	});

	const updateSubItem = () => {
		onEdit({ ...subItem, done: !subItem.done });
	};

	return (
		<View style={styles.container}>
			<CheckBox
				size={25}
				containerStyle={styles.checkBox}
				textStyle={styles.checkBoxText}
				title={subItem.name.toString()}
				checked={subItem.done}
				onPress={updateSubItem}
				checkedColor={checkboxColor}
			/>
			<View style={styles.list}>{renderSubItem}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	checkBox: {
		borderWidth: 0,
		paddingHorizontal: 0,
		margin: 0,
		backgroundColor: "transparent",
		flex: 1.5,
	},
	checkBoxText: {
		color: "#6b6e72",
		fontWeight: "bold",
	},
	list: {
		flexDirection: "row",
		flex: 3,
	},
	listItem: {
		flex: 1,
		alignSelf: "center",
		textAlign: "center",
		color: "#6b6e72",
	},
});

export default ProgramSubItem;
