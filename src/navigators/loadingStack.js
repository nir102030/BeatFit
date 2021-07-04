import React from "react";
import LoadingScreen from "../screens/LoadingScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const loadingStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};
