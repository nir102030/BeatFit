import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';

const LoginScreen = ({ navigation }) => {
	const { state, signin, clearErrorMessage, addErr, setLoading } = useContext(AuthContext);
	const { getUser } = useContext(UserContext); //we use the getUser function to get the user details on login

	const [userName, setUserName] = useState();
	const [password, setPassword] = useState();

	const handleSignIn = async () => {
		if (!userName || !password) {
			addErr('User name or password cannot be empty');
		} else {
			clearErrorMessage();
			setLoading(true);
			signin(userName, password, getUser);
		}
	};

	const renderErr = () => {
		return state.err ? <Text style={styles.err}>{state.err}</Text> : null;
	};

	const renderSignedUpMessage = () => {
		return state.signedUp ? <Text style={styles.success}>You have successfully signed up</Text> : null;
	};

	return (
		<View>
			<Button
				title="Go to Sign Up"
				style={styles.signin}
				onPress={() => {
					clearErrorMessage();
					navigation.navigate('Signup');
				}}
			/>
			<Text style={styles.title}>Login to your profile</Text>
			{renderErr()}
			{renderSignedUpMessage()}
			<Input placeholder="User Name" value={userName} onChangeText={(input) => setUserName(input)} />
			<Input placeholder="Password" value={password} onChangeText={(input) => setPassword(input)} />
			<Button buttonStyle={styles.button} title="Sign In" onPress={() => handleSignIn()} />
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		alignSelf: 'center',
		marginBottom: 20,
		marginTop: 30,
		fontWeight: 'bold',
		fontSize: 30,
		color: '#293934',
	},
	button: {
		marginVertical: 10,
		marginHorizontal: 40,
		borderRadius: 15,
		opacity: 0.8,
		backgroundColor: '#209C5E',
	},
	err: {
		color: 'red',
		alignSelf: 'center',
		marginBottom: 20,
		fontSize: 16,
	},
	success: {
		color: 'blue',
		alignSelf: 'center',
		marginBottom: 20,
		fontSize: 16,
	},
});

export default LoginScreen;
