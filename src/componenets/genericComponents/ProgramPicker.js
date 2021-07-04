import React from "react";
import { View, StyleSheet, FlatList, Dimensions, Text, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-community/picker";
import DropDownPicker from "react-native-dropdown-picker";

const ProgramPicker = ({ selectedValue, setSelectedValue, items }) => {
	const renderItems = () => {
		return items.map((item) => {
			return <Picker.Item key={item.label} label={item.label} value={item.value} />;
		});
	};

	return (
		// <View style={{}}>
		// 	<DropDownPicker
		// 		items={items}
		// 		defaultValue={selectedValue}
		// 		itemStyle={{
		// 			justifyContent: 'flex-start',
		// 		}}
		// 		dropDownStyle={{ backgroundColor: '#fafafa', marginTop: 10 }}
		// 		onChangeItem={(item) => setSelectedValue(item.value)}
		// 		placeholder={title}
		// 		labelStyle={{
		// 			fontSize: 14,
		// 			textAlign: 'center',
		// 			color: '#000',
		// 		}}
		// 		//containerStyle={{ marginHorizontal: 5 }}
		// 		style={{
		// 			borderTopLeftRadius: 10,
		// 			borderTopRightRadius: 10,
		// 			borderBottomLeftRadius: 10,
		// 			borderBottomRightRadius: 10,
		// 		}}
		// 	/>
		// </View>
		<Picker
			selectedValue={selectedValue}
			style={{ height: 50, width: 150 }}
			onValueChange={setSelectedValue}
			mode="dropdown"
			style={styles.picker}
			containerStyle={{ margin: 0, borderRadius: 1 }}
		>
			{renderItems()}
		</Picker>
	);
};

export default ProgramPicker;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		alignItems: "center",
		borderWidth: 0.5,
		borderColor: "#cbcecd",
		borderRadius: 5,
		backgroundColor: "white",
	},
	title: {
		flex: 1,
		alignSelf: "center",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 18,
	},
	replications: {
		alignSelf: "center",
		textAlign: "center",
	},
	picker: {
		textAlign: "center",
		alignItems: "center",
		borderRadius: 1,
	},
});
