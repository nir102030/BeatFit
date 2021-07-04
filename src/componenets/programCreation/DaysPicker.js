import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { getDayOfWeekInLettersHeb } from "../../utils/dates";

const DaysPicker = ({ days, setDayOpen, dayOpen }) => {
	return (
		<View style={styles.container}>
			{days.map((day, index) => {
				return (
					<TouchableOpacity
						style={[
							styles.button,
							{ backgroundColor: dayOpen == day ? "rgba(50,150,50,0.8)" : "rgba(100,200,100,0.5)" },
						]}
						onPress={() => setDayOpen(day)}
						key={index}
					>
						<Text style={styles.buttonText}>יום {getDayOfWeekInLettersHeb(day)}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default DaysPicker;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "wrap",
	},
	button: {
		borderRadius: 50,
		height: 50,
		width: 50,
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.1)",
	},
	buttonText: {
		textAlign: "center",
	},
});
