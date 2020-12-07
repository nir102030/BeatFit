import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import Goals from '../componenets/homeComponents/Goals';
import { Context as UserContext } from '../context/UserContext';
import api from '../api/appApi';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({ route }) => {
	//const { state } = useContext(UserContext);
	//const { state } = useContext(UserContext);
	const { user, editUser } = route.params;

	//Here we will recive the user variables from db (after calcualted from the programs)
	const [programs, setPrograms] = useState({
		training: user.programs.training,
		nutrition: user.programs.nutrition,
	});

	const goals = [
		{ type: 'אימונים', name: 'אימונים', targetType: 'הושלמו', value: programs.training.completedRate },
		{ type: 'אימונים', name: 'סטים', targetType: 'הושלמו', value: '70%' },
		{ type: 'תזונה', name: 'קלוריות', targetType: 'נצרכו', value: programs.nutrition.completedRate },
		{ type: 'תזונה', name: 'חלבונים', targetType: 'נצרכו', value: '70%' },
	];

	useEffect(() => {
		// async () => {
		// 	const token = await AsyncStorage.getItem('token');
		// 	const res = await api.get('/', { headers: { token: token } });
		// 	setPrograms({
		// 		training: res.data.programs.training,
		// 		nutrition: res.data.programs.nutrition,
		// 	});
		// };
	}, []);

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
