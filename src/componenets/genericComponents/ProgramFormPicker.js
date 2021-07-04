import React, { useState } from "react";
import { Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const ProgramFormPicker = ({ title, setSelectedValue, items, index }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [pickerItems, setItems] = useState(items);

	DropDownPicker.setMode("BADGE");

	return (
		<DropDownPicker
			open={open}
			value={value}
			items={pickerItems}
			setOpen={setOpen}
			setValue={setValue}
			onChangeValue={setSelectedValue}
			setItems={setItems}
			itemStyle={{
				justifyContent: "flex-start",
			}}
			containerStyle={{
				width: Dimensions.get("window").width * 0.6,
				marginVertical: 20,
				height: Dimensions.get("window").height * 0.05,
			}}
			labelStyle={{
				fontSize: 14,
				textAlign: "center",
				color: "#000",
			}}
			style={{ borderColor: "rgba(0,0,0,0.1)", borderWidth: 1.5 }}
			placeholder={title}
			dropDownStyle={{ backgroundColor: "#fafafa" }}
			zIndexInverse={index}
			zIndex={3 - index}
			multiple={title == "ימים" ? true : false}
		/>
	);
};

export default ProgramFormPicker;
