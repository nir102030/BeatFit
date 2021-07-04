import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProgramScreen from "../screens/ProgramScreen";
import HomeScreen from "../screens/HomeScreen";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { getCompletedRate } from "../functions/homeFunctions";

const Tab = createBottomTabNavigator();

//main flow navigator, based on tab navigator
//contains the home, trainings and nutrition screens
export const mainFlow = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarLabel: "בית",
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name="Trainings"
				component={ProgramScreen}
				initialParams={{ programType: "training" }}
				options={{
					tabBarLabel: "אימונים",
					tabBarIcon: ({ color, size }) => <MaterialIcons name="fitness-center" color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name="Nutrition"
				component={ProgramScreen}
				initialParams={{ programType: "nutrition" }}
				options={{
					tabBarLabel: "תזונה",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="nutrition" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};
