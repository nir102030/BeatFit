//import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import TrainingsScreen from '../screens/TrainingsScreen';
import NutritionScreen from '../screens/NutritionScreen';
import HeaderMenu from '../componenets/genericComponents/HeaderMenu';
import ProfileAvatar from '../componenets/genericComponents/ProfileAvatar';


const AppNavigator = ()=>{
    const [isSignedIn, setIsSignedIn] = useState(false);

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


    return (
        //stack navigator, contains the drawer navigator
        //we use the stack navigator to be able to use it's options prop and define header to the app
        isSignedIn ?
            (<NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={'BeatFit'}
                        component={SideDrawer}
                        options={({ navigation }) => ({
                            headerMode: 'screen',
                            headerTitleAlign: 'center',
                            headerRight: () => <ProfileAvatar imgSrc={require('../assets/avivImg.jpeg')} />,
                            headerLeft: () => <HeaderMenu navigation={navigation} />,
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>) :
            (<NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={'BeatFit'}
                        component={LoginScreen}
                        options={({ navigation }) => ({
                            headerMode: 'screen',
                            headerTitleAlign: 'center',
                            //headerRight: () => <ProfileAvatar imgSrc={require('../assets/avivImg.jpeg')} />,
                            //headerLeft: () => <HeaderMenu navigation={navigation} />,
                        })}
                        initialParams={{setIsSignedIn:(isSignedIn)=>setIsSignedIn(isSignedIn)}}
                    />
                </Stack.Navigator>        
            </NavigationContainer>)
    );
}

export default AppNavigator;