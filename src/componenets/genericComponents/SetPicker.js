import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-community/picker";
//import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from "react-native-material-dropdown-v2";

const SetPicker = ({ title, selectedValue, setSelectedValue, items }) => {
	return (
		<Dropdown
			value={selectedValue}
			label={title}
			data={items}
			useNativeDriver={true}
			onChangeText={setSelectedValue}
			containerStyle={{ flex: 1 }}
		/>
	);
};

export default SetPicker;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	title: {
		//flex: 1,
		//alignSelf: 'center',
		//textAlign: 'center',
		//fontWeight: 'bold',
		//fontSize: 18,
	},
	picker: {
		borderWidth: 1,
		flex: 1,
		textAlign: "center",
		alignItems: "center",
	},
});
