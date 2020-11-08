import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
	return (
		<View>
			<Text>This is the login page</Text>
			<Button title='Login' onPress={() => navigation.navigate('Home')}/>
		</View>
	);
};

export default LoginScreen;
