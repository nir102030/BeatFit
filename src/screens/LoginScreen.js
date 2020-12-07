import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { getUserFromDb } from '../api/appApi';

const LoginScreen = ({ navigation, route }) => {
	const { setUser } = route.params;
	const { state, signin, clearErrorMessage, addErr, setLoading } = useContext(AuthContext);

	const [userName, setUserName] = useState();
	const [password, setPassword] = useState();

	const handleSignIn = async () => {
		if (!userName || !password) {
			addErr('חובה למלא שם משתמש וסיסמא');
		} else {
			clearErrorMessage();
			setLoading(true);
			const token = await signin(userName, password);
			const user = await getUserFromDb(token);
			setUser(user);
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
				title="עבור לעמוד הרשמה"
				style={styles.signin}
				onPress={() => {
					clearErrorMessage();
					navigation.navigate('הרשמה');
				}}
			/>
			<Text style={styles.title}>כניסה לפרופיל</Text>
			{renderErr()}
			{renderSignedUpMessage()}
			<Input placeholder="שם משתמש" value={userName} onChangeText={(input) => setUserName(input)} />
			<Input placeholder="סיסמא" value={password} onChangeText={(input) => setPassword(input)} />
			<Button buttonStyle={styles.button} title="כניסה" onPress={() => handleSignIn()} />
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
