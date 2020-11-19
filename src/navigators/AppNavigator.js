import React, { useEffect, useContext } from 'react';
import LoadingScreen from '../screens/LoadingScreen';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import HeaderMenu from '../componenets/genericComponents/HeaderMenu';
import ProfileAvatar from '../componenets/genericComponents/ProfileAvatar';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';
import SignUpScreen from '../screens/SignUpScreen';
import CreateProgramScreen from '../screens/CreateProgramScreen';
import ProgramScreen from '../screens/ProgramScreen';

const AppNavigator = () => {
	//get authentication state and actions
	const authContext = useContext(AuthContext);
	const authState = authContext.state;
	const tryLocalSignin = authContext.tryLocalSignin;

	//get user's state and actions
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
						tabBarLabel: 'בית',
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="home" color={color} size={size} />
						),
					}}
				/>
				<Tab.Screen
					name="Trainings"
					component={ProgramScreen}
					initialParams={{ programType: 'training' }}
					options={{
						tabBarLabel: 'אימונים',
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons name="fitness-center" color={color} size={size} />
						),
					}}
				/>
				<Tab.Screen
					name="Nutrition"
					component={ProgramScreen}
					initialParams={{ programType: 'nutrition' }}
					options={{
						tabBarLabel: 'תזונה',
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="nutrition" color={color} size={size} />
						),
					}}
				/>
			</Tab.Navigator>
		);
	};

	//drawer navigator
	//contains the main flow tab navigator as 'Home' and the Profile screen
	const SideDrawer = () => {
		return (
			<Drawer.Navigator initialRouteName="ראשי" drawerType={'slide'}>
				<Drawer.Screen name="ראשי" component={MainFlow} />
				<Drawer.Screen name="פרופיל" component={ProfileScreen} />
			</Drawer.Navigator>
		);
	};

	//main stack
	//rendered in case the user is alredy signed in
	const mainStack = () => {
		//in case the user is detailes are not loaded yet (waiting for server)
		//render the loading screen
		//otherwise, render the side drawer that contains all the app logic
		return (
			<Stack.Navigator>
				{userState.user.userName ? (
					userState.user.programs ? (
						<Stack.Screen
							name={'BeatFit'}
							component={SideDrawer}
							options={({ navigation }) => ({
								headerMode: 'screen',
								headerTitleAlign: 'center',
								headerRight: () => (
									<ProfileAvatar imgSrc={userState.user ? userState.user.img : null} />
								),
								headerLeft: () => <HeaderMenu navigation={navigation} />,
							})}
						/>
					) : (
						<Stack.Screen
							name="אזור מאמנים"
							component={CreateProgramScreen}
							options={() => ({
								headerMode: 'screen',
								headerTitleAlign: 'center',
								headerRight: () => (
									<ProfileAvatar imgSrc={userState.user ? userState.user.img : null} />
								),
							})}
						/>
					)
				) : (
					<Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
				)}
			</Stack.Navigator>
		);
	};

	//login stack
	//rendered in case the user is not signed in
	const loginStack = () => {
		//in case the loading state is true (when waiting for server) render the loading screen
		//otherwise, render the login/signup screens
		return authState.loading ? (
			<Stack.Navigator>
				<Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
			</Stack.Navigator>
		) : (
			<Stack.Navigator>
				<Stack.Screen
					name="כניסה"
					component={LoginScreen}
					options={() => ({
						headerMode: 'screen',
						headerTitleAlign: 'center',
						headerTitle: 'Beat-Fit',
					})}
				/>
				<Stack.Screen
					name="הרשמה"
					component={SignUpScreen}
					options={() => ({
						headerMode: 'screen',
						headerTitleAlign: 'center',
						headerTitle: 'Beat-Fit',
					})}
				/>
			</Stack.Navigator>
		);
	};

	//in case the user is signed in (his state contains a jwt), render the main stack
	//otherwise, render the login stack
	const renderStack = () => {
		return authState.token ? mainStack() : loginStack();
	};

	return <NavigationContainer>{renderStack()}</NavigationContainer>;
};

export default AppNavigator;
