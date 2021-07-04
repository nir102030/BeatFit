import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ProgramItem from "./ProgramItem";

const DailyProgram = ({ dailyProgram, programType }) => {
	const category = dailyProgram.category;
	const columnsTitles = dailyProgram.columnsTitles;

	//renders the items in this daily program
	const renderProgramItems = dailyProgram.items.map((programItem, index) => {
		return (
			<View key={index} style={styles.listItem}>
				<ProgramItem
					item={programItem}
					category={category}
					columnsTitles={columnsTitles}
					blocked={dailyProgram.finished}
				/>
			</View>
		);
	});

	//render the program KPIs in accordnece to the program type
	const renderKPIs = () => {
		//the initial KPIs values are now 0 but will be recived from the DB
		return programType == "training" ? (
			<View>
				<Text style={styles.kpi}>סה"כ סטים בתכנית: {dailyProgram.total}</Text>
				<Text style={styles.kpi}>סה"כ סטים הושלמו: {dailyProgram.completed}</Text>
			</View>
		) : (
			<View>
				<Text style={styles.kpi}>סה"כ קלוריות בתפריט: {dailyProgram.total}</Text>
				<Text style={styles.kpi}>סה"כ קלוריות נצרכו: {dailyProgram.completed}</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.date}>{dailyProgram.date}</Text>
			{dailyProgram.finished ? (
				<Text style={{ color: "green", marginVertical: 10 }}>כל הכבוד! התכנית בוצעה!</Text>
			) : null}
			{renderKPIs()}
			{renderProgramItems}
		</View>
	);
};

const styles = StyleSheet.create({
	listItem: {
		borderWidth: 1,
		borderColor: "#cbcecd",
		marginVertical: 8,
		marginHorizontal: 5,
		borderRadius: 10,
		padding: 10,
	},
	date: {
		alignSelf: "center",
		color: "#6b6e72",
		fontWeight: "bold",
	},
	kpi: {
		color: "#6b6e72",
	},
});

export default DailyProgram;
