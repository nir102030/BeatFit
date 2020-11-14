import React, { useEffect, useContext } from 'react';
import LoadingScreen from '../screens/LoadingScreen';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import TrainingsScreen from '../screens/TrainingsScreen';
import NutritionScreen from '../screens/NutritionScreen';
import HeaderMenu from '../componenets/genericComponents/HeaderMenu';
import ProfileAvatar from '../componenets/genericComponents/ProfileAvatar';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';
import SignUpScreen from '../screens/SignUpScreen';

const AppNavigator = () => {
	//get auth state and actions
	const authContext = useContext(AuthContext);
	const authState = authContext.state;
	const tryLocalSignin = authContext.tryLocalSignin;

	//get user state and actions
	const userContext = useContext(UserContext);
	const userState = userContext.state;
	const getUser = userContext.getUser;

	useEffect(() => {
		tryLocalSignin(getUser); //we send the getUser function to get the user details on login
	}, []);

	//initiate the different navigators
	const Tab = createBottomTabNavigator();
	const Drawer = createDrawerNavigator();
	const Stack = createStackNavigator();

	//main flow navigator, based on tab navigator
	//contains the home, trainings and nutrition screens
	const MainFlow = () => {
		return (
			<Tab.Navigator>
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{
						tabBarLabel: 'Home',
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="home" color={color} size={size} />
						),
					}}
				/>
				<Tab.Screen
					name="Trainings"
					component={TrainingsScreen}
					options={{
						tabBarLabel: 'Trainings',
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons name="fitness-center" color={color} size={size} />
						),
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

	//drawer navigator
	//contains the main flow tab navigator as 'Home' and the settings screen
	const SideDrawer = () => {
		return (
			<Drawer.Navigator initialRouteName="Home" drawerType={'slide'}>
				<Drawer.Screen name="Home" component={MainFlow} />
				<Drawer.Screen name="Settings" component={SettingsScreen} />
			</Drawer.Navigator>
		);
	};

	//main stack
	//rendered in case the user is alredy signed in
	const mainStack = () => {
		return (
			<Stack.Navigator>
				{userState.user.img ? (
					<Stack.Screen
						name={'BeatFit'}
						component={SideDrawer}
						options={({ navigation }) => ({
							headerMode: 'screen',
							headerTitleAlign: 'center',
							headerRight: () => <ProfileAvatar imgSrc={userState.user ? userState.user.img : null} />,
							headerLeft: () => <HeaderMenu navigation={navigation} />,
						})}
					/>
				) : (
					<Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
				)}
			</Stack.Navigator>
		);
	};

	//login stack
	//rendered in case the user is not signed in
	const loginStack = () => {
		return authState.loading ? (
			<Stack.Navigator>
				<Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
			</Stack.Navigator>
		) : (
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={() => ({
						headerMode: 'screen',
						headerTitleAlign: 'center',
					})}
				/>
				<Stack.Screen
					name="Signup"
					component={SignUpScreen}
					options={() => ({
						headerMode: 'screen',
						headerTitleAlign: 'center',
					})}
				/>
			</Stack.Navigator>
		);
	};

	return <NavigationContainer>{authState.token ? mainStack() : loginStack()}</NavigationContainer>;
};

export default AppNavigator;
