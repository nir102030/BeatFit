import 'react-native-gesture-handler';
import * as React from 'react';
import { MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LoginScreen from './src/screens/LoginScreen';
import TrainingsScreen from './src/screens/TrainingsScreen';
import NutritionScreen from './src/screens/NutritionScreen';
import HeaderMenu from './src/componenets/genericComponents/HeaderMenu';
import ProfileAvatar from './src/componenets/genericComponents/ProfileAvatar';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainFlow = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name="Trainings"
				component={TrainingsScreen}
				options={{
					tabBarLabel: 'Trainings',
					tabBarIcon: ({ color, size }) => <MaterialIcons name="fitness-center" color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name="Nutrition"
				component={NutritionScreen}
				options={{
					tabBarLabel: 'Nutrition',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="nutrition" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const SideDrawer = () => {
	return (
		<Drawer.Navigator initialRouteName="Home" drawerType={'slide'}>
			<Drawer.Screen name="Home" component={MainFlow} />
			<Drawer.Screen name="Settings" component={SettingsScreen} />
		</Drawer.Navigator>
	);
};

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name={'BeatFit'}
					component={SideDrawer}
					options={({ navigation }) => ({
						headerMode: 'screen',
						headerTitleAlign: 'center',
						headerRight: () => <ProfileAvatar imgSrc={require('./src/assets/avivImg.jpeg')} />,
						headerLeft: () => <HeaderMenu navigation={navigation} />,
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
