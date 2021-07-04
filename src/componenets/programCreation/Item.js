import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Button, Card } from "react-native-elements";
import { exercises as exercisesLabels } from "../../data/trainingData";
import { meals as mealsLabels } from "../../data/nutritionData";
import TrainingSet from "./TrainingSet";
import Ingredient from "./Ingredient";
import ProgramPicker from "../genericComponents/ProgramPicker";
import { AntDesign } from "@expo/vector-icons";

const Item = ({ item, setItem, deleteItem, programType }) => {
	const [subItemsCount, setSubItemsCount] = useState(1);
	const itemsLabels = programType == "training" ? exercisesLabels() : mealsLabels();

	const updateSubItem = (newSet) => {
		const subItems = item.subItems.map((subItem) => {
			return subItem.number == newSet.number ? newSet : subItem;
		});
		setItem({ ...item, subItems: subItems });
	};

	const addSubItem = () => {
		const newSubItem =
			programType == "training"
				? {
						number: subItemsCount + 1,
						replications: item.subItems[0] ? item.subItems[0].replications : "",
						weight: item.subItems[0] ? item.subItems[0].weight : "",
				  }
				: {
						number: subItemsCount + 1,
						label: "לחם",
						unit: "",
						amount: "",
				  };
		setItem({
			...item,
			subItems: [...item.subItems, newSubItem],
		});
	};

	const deleteSubItem = (setNum) => {
		const newSets = item.subItems.filter((subItem) => subItem.number != setNum);
		setItem({ ...item, subItems: newSets });
	};

	const renderSubItems = () => {
		return item.subItems.map((subItem) => {
			return programType == "training" ? (
				<TrainingSet key={subItem.number} set={subItem} setSet={updateSubItem} deleteSet={deleteSubItem} />
			) : (
				<Ingredient
					key={subItem.number}
					ingredient={subItem}
					setIngredient={updateSubItem}
					deleteIngredient={deleteSubItem}
				/>
			);
		});
	};

	useEffect(() => {
		const numberOfSubItems = item.subItems.length;
		setSubItemsCount(numberOfSubItems);
	}, [item]);

	return (
		<Card containerStyle={styles.container}>
			<TouchableOpacity style={styles.deleteLogo} onPress={() => deleteItem(item.number)}>
				<AntDesign name="delete" size={20} color="black" />
			</TouchableOpacity>
			<View style={styles.itemPicker}>
				<ProgramPicker
					selectedValue={item.value}
					setSelectedValue={(value) =>
						setItem({
							...item,
							label: itemsLabels.find((item) => item.value == value).label,
							value: value,
						})
					}
					items={itemsLabels}
				/>
			</View>

			{renderSubItems()}
			<Button
				buttonStyle={styles.button}
				title={`הוסף ${programType == "training" ? "סט" : "מצרך"}`}
				onPress={() => addSubItem()}
			/>
		</Card>
	);
};

export default Item;

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		width: Dimensions.get("window").width * 0.8,
		marginTop: 10,
	},
	button: {
		marginTop: 10,
		marginHorizontal: 20,
		borderRadius: 15,
		//opacity: 0.8,
		backgroundColor: "#209C5E",
		width: Dimensions.get("window").height * 0.2,
		alignSelf: "center",
	},
	deleteLogo: {
		position: "absolute",
		left: 0,
		top: 0,
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	itemPicker: {
		width: "70%",
		alignSelf: "center",
	},
});
