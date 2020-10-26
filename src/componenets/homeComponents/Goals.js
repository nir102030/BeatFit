import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Goal from './Goal'
import Chart from './Chart'

const Goals = ({ goals }) => {
	const nutritionGoals = goals.filter((goal)=>goal.type=='תזונה');
	const traningsGoals = goals.filter((goal)=>goal.type=='אימונים');
	const data = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June'],
		datasets: [{
		  data: [ 20, 45, 28, 80, 99, 43 ]
		}]
	  }
	const renderGoals = (goalsList)=> {
		return goalsList.map((goal)=> {
			return <Goal key={goal.name} goal={goal} />
		});
	}

	return (
		<View>
			<View style={styles.goals}>
				<Text style={styles.headerText}>יעדי אימונים</Text>
				<View style = {styles.goalsList}>
					{renderGoals(traningsGoals)}
				</View>
				<View style={styles.chart}>
					<Chart  data={data} backgroundColor={'#6cc6ca'}/>
				</View>
			</View>
			<View style={styles.goals}>
				<Text style={styles.headerText}>יעדי תזונה</Text>	
				{renderGoals(nutritionGoals)}
				<View style={styles.chart}>
					<Chart  data={data} color='#39a56f'/>
				</View>
			</View>	
		</View>
	);
};

const styles = StyleSheet.create({
	headerText: {
		fontSize: 24,
		marginTop: 10,
		fontWeight: 'bold',
		alignSelf: 'center',
		color:'#6b6e72'
	},
	goals: {
		borderColor: '#e0e8e9',
		backgroundColor:'#b4cdce',
		borderWidth: 1,
		alignSelf: 'center',
		borderRadius: 20,
		marginTop: 20,
	},
	chart:{
		alignItems:'center'
	},
	goalsList:{

	}	
	
});

export default Goals;
