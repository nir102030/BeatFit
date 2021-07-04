import React from "react";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

//login stack
//rendered in case the user is not signed in
export const loginStack = () => {
	//in case the loading state is true (when waiting for server) render the loading screen
	//otherwise, render the login/signup screens
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="כניסה"
				component={LoginScreen}
				options={() => ({
					headerMode: "screen",
					headerTitleAlign: "center",
					headerTitle: "Beat-Fit",
				})}
			/>
			<Stack.Screen
				name="הרשמה"
				component={SignUpScreen}
				options={() => ({
					headerMode: "screen",
					headerTitleAlign: "center",
					headerTitle: "Beat-Fit",
				})}
			/>
		</Stack.Navigator>
	);
};
