import React from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import Goals from '../componenets/homeComponents/Goals';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
	//Here we will recive the user variables from db (after calcualted in from the programs)
	const goals = [{type:'אימונים', name:'אימונים', targetType:'הושלמו', value:'80%'},
	{type:'אימונים', name:'סטים', targetType:'הושלמו', value:'70%'},
	{type:'תזונה', name:'קלוריות', targetType:'נצרכו', value:'80%'},
	{type:'תזונה', name:'חלבונים', targetType:'נצרכו', value:'70%'}]

	return (
		<ScrollView>
			<Goals goals={goals} />
		</ScrollView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	goalsContainer: {},
	goalItem: {
		borderColor: 'grey',
		borderWidth: 1,
		alignSelf: 'center',
		borderRadius: 20,
		width: windowWidth * 0.8,
		height: windowHeight * 0.35,
		paddingHorizontal: 10,
		marginTop: 20,
	},
});
