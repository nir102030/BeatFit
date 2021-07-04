import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { getDayOfWeekInLettersHeb } from "../../utils/dates";

const ProgramPuller = ({ programDays, dayOpen, setDailyProgram, items }) => {
	return (
		<View style={styles.container}>
			<Text>השתמש בתכנית של יום: </Text>
			{programDays.map((dayToPull, index) =>
				dayToPull != dayOpen ? (
					<TouchableOpacity
						key={index}
						onPress={() => setDailyProgram(items[dayToPull])}
						style={styles.button}
					>
						<Text style={styles.buttonText}>{getDayOfWeekInLettersHeb(dayToPull)}</Text>
					</TouchableOpacity>
				) : null
			)}
		</View>
	);
};

export default ProgramPuller;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	button: {
		backgroundColor: "rgba(100,200,100,0.5)",
		borderRadius: 25,
		height: 25,
		width: 25,
		alignItems: "center",
		justifyContent: "center",
		marginLeft: 5,
	},
	buttonText: {
		fontWeight: "bold",
		fontSize: 12,
	},
});
