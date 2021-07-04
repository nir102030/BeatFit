import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import ProgramSubItem from "./ProgramSubItem";
import { getImage } from "../../api/appApi";
import { Context as DailyProgramContext } from "../../context/DailyProgramContext";

const ProgramItem = ({ item, category, columnsTitles, blocked }) => {
	const [imgSrc, setImgSrc] = useState(require("../../../assets/adaptive-icon.png"));
	const [imgImported, setImgImported] = useState(false);

	const { editSubItem } = useContext(DailyProgramContext);

	//render the titles of the current program item
	const renderTitles = columnsTitles.map((columnTitle) => {
		return (
			<Text key={columnTitle} style={styles.listItem}>
				{columnTitle}
			</Text>
		);
	});

	const editItem = (subItem) => {
		editSubItem(item, subItem);
	};

	//render the sub items of the current program item
	const renderSubItems = item.subItems.map((subItem, index) => {
		return <ProgramSubItem key={index} subItem={subItem} blocked={blocked} onEdit={editItem} />;
	});

	const initiateImg = async () => {
		const base64Img = await getImage(item.value);
		if (base64Img) {
			setImgSrc({ uri: `data:image/png;base64,${base64Img}` });
			setImgImported(true);
		}
	};

	useEffect(() => {
		initiateImg();
	}, []);

	return (
		<View style={blocked ? styles.blockedContainer : styles.container}>
			<View style={styles.leftContainer}>
				<Text style={styles.title}>{item.label}</Text>
				<Image style={imgImported ? styles.image : styles.altImage} source={imgSrc} />
			</View>
			<View style={styles.rightContainer}>
				<View style={styles.rightTopContainer}>
					<Text style={styles.category}>{category}</Text>
					<View style={styles.titles}>{renderTitles}</View>
				</View>
				<View style={styles.subItems}>{renderSubItems}</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	blockedContainer: {
		flexDirection: "row",
		opacity: 0.5,
	},
	leftContainer: {
		borderColor: "red",
		flex: 3,
		alignItems: "center",
	},
	rightContainer: {
		borderColor: "green",
		flex: 7,
	},
	rightTopContainer: {
		flexDirection: "row",
		borderWidth: 1 / 2,
		borderColor: "#cbcecd",
		borderRadius: 5,
		backgroundColor: "#cbcecd",
		marginLeft: 5,
	},
	title: {
		fontWeight: "bold",
		color: "#6b6e72",
		flex: 1 / 2,
	},
	category: {
		flex: 1.5,
		marginLeft: 15,
		color: "#6b6e72",
		fontWeight: "bold",
	},
	titles: {
		flexDirection: "row",
		flex: 3,
	},
	image: {
		width: 120,
		height: 110,
		borderColor: "#cbcecd",
		borderRadius: 10,
		alignSelf: "center",
		marginRight: 10,
	},
	altImage: {
		width: 120,
		height: 110,
		borderRadius: 10,
		alignSelf: "center",
		marginRight: 10,
	},
	subItems: {
		backgroundColor: "#d7e3f1",
		borderRadius: 5,
		marginTop: 5,
		marginLeft: 5,
	},
	listItem: {
		flex: 1,
		textAlign: "center",
		color: "#6b6e72",
		fontWeight: "bold",
	},
});

export default ProgramItem;
