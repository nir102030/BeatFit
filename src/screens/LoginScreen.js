import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
	return (
		<View>
			<Text>This is the login page</Text>
			<Button onPress={() => navigation.navigate('Home')}>Login</Button>
		</View>
	);
};

export default LoginScreen;
