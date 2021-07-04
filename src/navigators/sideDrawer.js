import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import { mainFlow } from "./mainFlow";

const Drawer = createDrawerNavigator();

//drawer navigator
//contains the main flow tab navigator as 'Home' and the Profile screen
export const sideDrawer = () => {
	return (
		<Drawer.Navigator initialRouteName="ראשי" drawerType={"slide"}>
			<Drawer.Screen name="ראשי" children={() => mainFlow()} />
			<Drawer.Screen name="פרופיל" component={ProfileScreen} />
		</Drawer.Navigator>
	);
};
