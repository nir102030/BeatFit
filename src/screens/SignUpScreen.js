import React, { useState, useContext } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import ImagePicker from '../componenets/genericComponents/ImagePicker';

const SignUpScreen = ({ navigation }) => {
	const { state, signup, clearErrorMessage, addErr, setLoading } = useContext(AuthContext);
	const [user, setUser] = useState({
		userName: '',
		password: '',
		fname: '',
		lastName: '',
		age: '',
		height: '',
		weight: '',
		img: '',
	});

	const handleSignUp = async () => {
		if (!user.userName || !user.password) {
			addErr('User name or password cannot be empty');
		} else {
			clearErrorMessage();
			setLoading(true);
			signup(user);
		}
	};

	const renderErr = () => {
		return state.err ? <Text style={styles.err}>{state.err}</Text> : null;
	};

	return (
		<ScrollView>
			<Button
				title="Go to Sign In"
				style={styles.signin}
				onPress={() => {
					clearErrorMessage();
					navigation.navigate('Login');
				}}
			/>
			<Text style={styles.title}>Sign Up</Text>
			{renderErr()}
			<Input
				placeholder="User Name"
				value={user.userName}
				onChangeText={(input) => setUser({ ...user, userName: input })}
			/>
			<Input
				placeholder="Password"
				value={user.password}
				onChangeText={(input) => setUser({ ...user, password: input })}
			/>
			<Input
				placeholder="First Name"
				value={user.fname}
				onChangeText={(input) => setUser({ ...user, fname: input })}
			/>
			<Input
				placeholder="Last Name"
				value={user.lname}
				onChangeText={(input) => setUser({ ...user, lname: input })}
			/>
			<Input placeholder="Age" value={user.age} onChangeText={(input) => setUser({ ...user, age: input })} />
			<Input
				placeholder="Height"
				value={user.height}
				onChangeText={(input) => setUser({ ...user, height: input })}
			/>
			<Input
				placeholder="Weight"
				value={user.weight}
				onChangeText={(input) => setUser({ ...user, weight: input })}
			/>
			<ImagePicker setUserImage={(img) => setUser({ ...user, img: img })} />
			<Button buttonStyle={styles.button} title="Sign Up" onPress={() => handleSignUp()} />
		</ScrollView>
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
	signin: {},
});

export default SignUpScreen;
