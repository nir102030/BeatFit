import React, { useEffect, useContext, useState } from 'react';
import { View, Text } from 'react-native';
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
import { getCompletedRate } from '../functions/homeFunctions';
import CreateTrainingProgramScreen from '../screens/CreateTrainingProgramScreen';

const AppNavigator = () => {
	//get authentication state and actions
	const {
		state: { token, loading },
		tryLocalSignin,
	} = useContext(AuthContext);

	//get user state
	const { state, getUser } = useContext(UserContext);
	const user = state;

	useEffect(() => {
		//the get user function is used here as a callback function
		//in case the local signin succeed, the getUser function updates the user context with the current user
		tryLocalSignin(getUser);
	}, []);

	//initiate the different navigators
	const Tab = createBottomTabNavigator();
	const Drawer = createDrawerNavigator();
	const Stack = createStackNavigator();

	const calculateCompletedRate = () => {
		return {
			training: {
				...user.programs.training,
				completedRate: getCompletedRate(user.programs.training.dailysPrograms, user.programs.training.minRate),
			},
			nutrition: {
				...user.programs.nutrition,
				completedRate: getCompletedRate(
					user.programs.nutrition.dailysPrograms,
					user.programs.nutrition.minRate
				),
			},
		};
	};

	//main flow navigator, based on tab navigator
	//contains the home, trainings and nutrition screens
	const MainFlow = () => {
		return (
			<Tab.Navigator>
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					initialParams={{
						user: {
							...user,
							programs: calculateCompletedRate(),
						},
					}}
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

	const CreateProgramFlow = () => {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="createProgram"
					component={CreateProgramScreen}
					options={() => ({
						headerMode: 'screen',
						headerTitleAlign: 'center',
						headerTitle: 'BeatFit',
						headerRight: () => <ProfileAvatar imgSrc={user ? user.img : null} />,
					})}
					headerTitle="BeatFit"
				/>
				<Stack.Screen
					name="createTraining"
					component={CreateTrainingProgramScreen}
					options={() => ({
						headerMode: 'screen',
						headerTitle: 'BeatFit',
						headerTitleAlign: 'center',
						headerRight: () => <ProfileAvatar imgSrc={user ? user.img : null} />,
					})}
				/>
			</Stack.Navigator>
		);
	};

	const programsFlow = () => {
		<Stack.Navigator>
			<Stack.Screen
				name={'BeatFit'}
				component={SideDrawer}
				options={({ navigation }) => ({
					headerMode: 'screen',
					headerTitleAlign: 'center',
					headerRight: () => {
						return (
							<View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
								<ProfileAvatar imgSrc={user ? user.img : null} />
								<Text
									style={{
										// fontWeight: 'bold',
										marginRight: 8,
										marginLeft: 10,
										fontSize: 18,
										// color: '#073a72',
									}}
								>
									היי, {user.fname}!
								</Text>
							</View>
						);
					},
					headerLeft: () => <HeaderMenu navigation={navigation} />,
				})}
			/>
		</Stack.Navigator>;
	};

	//main stack
	//rendered in case the user is alredy signed in
	const mainStack = () => {
		//in case the user is details are not loaded yet (waiting for server), render the loading screen
		//otherwise, render the side drawer that contains all the app logic
		return user.userName ? (
			//in case the user programs are not loaded yet, render the coach area
			//otherwise, render the sideDrawer
			user.programs ? (
				programsFlow()
			) : (
				CreateProgramFlow()
			)
		) : (
			<Stack.Navigator>
				<Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
			</Stack.Navigator>
		);
	};

	//login stack
	//rendered in case the user is not signed in
	const loginStack = () => {
		//in case the loading state is true (when waiting for server) render the loading screen
		//otherwise, render the login/signup screens
		return loading ? (
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

	//in case the user is signed in (he has a valid token), render the main stack
	//otherwise, render the login stack
	const renderStack = () => {
		return token ? mainStack() : loginStack();
	};

	return <NavigationContainer>{renderStack()}</NavigationContainer>;
};

export default AppNavigator;
