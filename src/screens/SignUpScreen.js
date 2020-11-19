import React, { useState, useContext } from 'react';
import { ScrollView, Text, StyleSheet, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import ImagePicker from '../componenets/genericComponents/ImagePicker';
import alternateProfilePic from '../assets/alternateProfilePic.webp';

const SignUpScreen = ({ navigation }) => {
	const { state, signup, clearErrorMessage, addErr, setLoading } = useContext(AuthContext);
	const [user, setUser] = useState({
		userName: '',
		password: '',
		fname: '',
		lname: '',
		age: '',
		height: '',
		weight: '',
		img: null,
	});

	const handleSignUp = async () => {
		if (!user.userName || !user.password) addErr('User name or password cannot be empty');
		if (!user.fname) addErr('You must enter a first name');
		else {
			//in case the user haven't picked any image, set a default one
			const imgSrc = user.img ? user.img : Image.resolveAssetSource(alternateProfilePic).uri;
			clearErrorMessage();
			setLoading(true);
			signup({ ...user, img: imgSrc });
		}
	};

	const renderErr = () => {
		return state.err ? <Text style={styles.err}>{state.err}</Text> : null;
	};

	return (
		<ScrollView>
			<Button
				title="עבור לעמוד כניסה לחשבון"
				style={styles.signin}
				onPress={() => {
					clearErrorMessage();
					navigation.navigate('כניסה');
				}}
			/>
			<Text style={styles.title}>רישום משתמש חדש</Text>
			{renderErr()}
			<Input
				placeholder="שם משתמש"
				value={user.userName}
				onChangeText={(input) => setUser({ ...user, userName: input })}
			/>
			<Input
				placeholder="סיסמא"
				value={user.password}
				onChangeText={(input) => setUser({ ...user, password: input })}
			/>
			<Input
				placeholder="שם פרטי"
				value={user.fname}
				onChangeText={(input) => setUser({ ...user, fname: input })}
			/>
			<Input
				placeholder="שם משפחה"
				value={user.lname}
				onChangeText={(input) => setUser({ ...user, lname: input })}
			/>
			<Input placeholder="גיל" value={user.age} onChangeText={(input) => setUser({ ...user, age: input })} />
			<Input
				placeholder="גובה"
				value={user.height}
				onChangeText={(input) => setUser({ ...user, height: input })}
			/>
			<Input
				placeholder="משקל"
				value={user.weight}
				onChangeText={(input) => setUser({ ...user, weight: input })}
			/>
			<ImagePicker setUserImage={(img) => setUser({ ...user, img: img })} />
			<Button buttonStyle={styles.button} title="הרשם" onPress={() => handleSignUp()} />
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
