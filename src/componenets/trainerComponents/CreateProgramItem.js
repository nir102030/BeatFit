import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import CreateProgramSubItem from './CreateProgramSubItem';

const CreateProgramItem = ({ item, category, setDailyProgram }) => {
	//update the current program item with the new subitem
	const setSubItem = (newSubItem) => {
		const newSubItems = item.subItems.map((subItem) => {
			return subItem.name == newSubItem.name ? newSubItem : subItem;
		});
		setDailyProgram({ ...item, subItems: newSubItems });
	};

	//render the sub items of the current program item
	const renderSubItems = item.subItems.map((subItem) => {
		return (
			<CreateProgramSubItem
				key={subItem.name}
				subItem={subItem}
				setProgramItem={(newSubItem) => setSubItem(newSubItem)}
			/>
		);
	});

	return (
		<View style={styles.container}>
			<View style={styles.leftContainer}>
				<Text style={styles.title}>{item.title}</Text>
				<Image style={styles.image} source={item.image} />
			</View>
			<View style={styles.rightContainer}>
				<View style={styles.rightTopContainer}>
					<Text style={styles.category}>{category}</Text>
					<View style={styles.titles}>
						<Text style={styles.listItem}>חזרות</Text>
						<Text style={styles.listItem}>משקל</Text>
					</View>
				</View>
				<View style={styles.subItems}>{renderSubItems}</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	leftContainer: {
		borderColor: 'red',
		flex: 3,
		alignItems: 'center',
	},
	rightContainer: {
		borderColor: 'green',
		flex: 7,
	},
	rightTopContainer: {
		flexDirection: 'row',
		borderWidth: 1 / 2,
		borderColor: '#cbcecd',
		borderRadius: 5,
		backgroundColor: '#cbcecd',
		marginLeft: 5,
	},
	title: {
		fontWeight: 'bold',
		color: '#6b6e72',
		flex: 1 / 2,
	},
	category: {
		flex: 1.5,
		marginLeft: 15,
		color: '#6b6e72',
		fontWeight: 'bold',
	},
	titles: {
		flexDirection: 'row',
		flex: 3,
	},
	image: {
		width: 120,
		height: 110,
		//borderWidth: 1,
		borderColor: '#cbcecd',
		borderRadius: 10,
		alignSelf: 'center',
		marginRight: 10,
	},
	subItems: {
		backgroundColor: '#d7e3f1',
		borderRadius: 5,
		marginTop: 5,
		marginLeft: 5,
	},
	listItem: {
		flex: 1,
		textAlign: 'center',
		color: '#6b6e72',
		fontWeight: 'bold',
	},
});

export default CreateProgramItem;
