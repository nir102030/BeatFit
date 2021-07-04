import React, { useState } from "react";
import { Text, Dimensions, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import Item from "./Item";
import { getDayOfWeekHeb } from "../../utils/dates";

const DailyProgram = ({ day, items, setItems, open, children, programType }) => {
	const [itemsCount, setItemsCount] = useState(1);

	const updateItem = (newItem) => {
		const editedDayItems = items.map((item) => {
			return item.number == newItem.number ? newItem : item;
		});
		setItems(editedDayItems);
	};

	const addItem = () => {
		setItems([
			...items,
			{
				number: itemsCount,
				label: programType == "training" ? "שכיבות סמיכה" : "ארוחת בוקר",
				value: programType == "training" ? "pushups" : "breakfast",
				subItems: [],
			},
		]);
		const newCount = itemsCount + 1;
		setItemsCount(newCount);
	};

	const deleteItem = (itemNum) => {
		const newDayItems = items.filter((oldItem) => oldItem.number != itemNum);
		setItems(newDayItems);
		const newCount = itemsCount - 1;
		setItemsCount(newCount);
	};

	return open ? (
		<Card containerStyle={styles.container}>
			<Text style={styles.title}>יום {getDayOfWeekHeb(day)}</Text>
			{items.map((item, index) => {
				return (
					<Item
						key={index}
						item={item}
						setItem={updateItem}
						deleteItem={deleteItem}
						programType={programType}
					/>
				);
			})}
			<Button
				buttonStyle={styles.button}
				title={`הוסף ${programType == "training" ? "תרגיל" : "ארוחה"}`}
				onPress={() => addItem()}
			/>
			{children}
		</Card>
	) : null;
};

export default DailyProgram;

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		alignItems: "center",
		marginBottom: 50,
	},
	title: {
		fontSize: 20,
		alignSelf: "center",
		fontWeight: "bold",
	},
	button: {
		marginVertical: 15,
		marginHorizontal: 20,
		borderRadius: 15,
		width: Dimensions.get("window").height * 0.3,
		backgroundColor: "#209C5E",
		alignSelf: "center",
	},
});
