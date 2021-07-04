import React from "react";
import { View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Card } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { ingredients, units } from "../../data/nutritionData";
import ProgramPicker from "../genericComponents/ProgramPicker";
import SetPicker from "../genericComponents/SetPicker";

const Ingredient = ({ ingredient, setIngredient, deleteIngredient }) => {
	return (
		<Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
			<TouchableOpacity onPress={() => deleteIngredient(ingredient.number)} style={styles.deleteLogo}>
				<AntDesign name="delete" size={16} color="black" />
			</TouchableOpacity>
			<View style={{ width: "70%" }}>
				<ProgramPicker
					selectedValue={ingredient.label}
					setSelectedValue={(value) => setIngredient({ ...ingredient, label: value })}
					items={ingredients()}
				/>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<TextInput
					placeholder={"כמות"}
					value={ingredient.amount}
					onChangeText={(value) => setIngredient({ ...ingredient, amount: value })}
					keyboardType="numeric"
					style={{
						textAlign: "center",
						flex: 1,
						borderBottomWidth: 1,
						borderColor: "rgba(0,0,0,0.3)",
						padding: 9,
						marginRight: 20,
						fontSize: 16,
					}}
				/>
				<SetPicker
					title="יחידה"
					selectedValue={ingredient.unit}
					setSelectedValue={(value) => setIngredient({ ...ingredient, unit: value })}
					items={units()}
				/>
			</View>
		</Card>
	);
};

export default Ingredient;

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		marginTop: 0,
		marginBottom: 10,
		padding: 10,
	},
	wrapper: {
		alignItems: "center",
	},
	title: {
		fontWeight: "bold",
		marginLeft: 20,
	},
	deleteLogo: {
		alignItems: "flex-start",
		justifyContent: "flex-start",
		position: "absolute",
		top: 0,
		left: 0,
	},
});
