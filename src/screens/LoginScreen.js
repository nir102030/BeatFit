import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { signIn, signUp } from '../api/appApi';

const LoginScreen = ({ route }) => {
	const { setIsSignedIn } = route.params;
	const [userName, setUserName] = useState();
	const [password, setPassword] = useState();
	const [err, setErr] = useState();

	const handleSignUp = async () => {
		if (!userName || !password) {
			setErr({ msg: 'User name or password cannot be empty', color: 'red' });
		} else {
			signUp(userName, password, setErr);
		}
	};

	const handleSignIn = () => {
		if (!userName || !password) {
			setErr({ msg: 'User name or password cannot be empty', color: 'red' });
		} else {
			signIn(userName, password, setErr, setIsSignedIn);
		}
	};

	const renderErr = () => {
		return err ? (
			<Text style={{ color: err.color, alignSelf: 'center', marginBottom: 20, fontSize: 16 }}>{err.msg}</Text>
		) : null;
	};

	return (
		<View>
			<Text style={styles.title}>Login to your profile</Text>
			{renderErr()}
			<Input placeholder="User Name" value={userName} onChangeText={(input) => setUserName(input)} />
			<Input placeholder="Password" value={password} onChangeText={(input) => setPassword(input)} />
			<Button buttonStyle={styles.button} title="Sign Up" onPress={() => handleSignUp()} />
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
});

export default LoginScreen;
