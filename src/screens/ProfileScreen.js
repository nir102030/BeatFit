import React, { useContext } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';
import ProfileDetail from '../componenets/ProfileDetail';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const ProfileScreen = () => {
	const { signout } = useContext(AuthContext);
	const { state, editUser } = useContext(UserContext);
	const user = state.user;

	const signOutAlert = () => {
		Alert.alert(
			`היי ${user.fname}`,
			'אתה בטוח שברצונך להתנתק?',
			[
				{
					text: 'ביטול',
					style: 'cancel',
				},
				{ text: 'כן, התנתק מהפרופיל', onPress: () => signout() },
			],
			{ cancelable: false }
		);
	};

	const handleSignOut = () => {
		signOutAlert();
	};

	return (
		<ScrollView>
			<View style={styles.imageContainer}>
				<Image source={{ uri: user.img }} style={styles.image} />
				<Text style={styles.name}>{`${user.fname} ${user.lname}`}</Text>
			</View>
			<ProfileDetail
				type={''}
				value={user.age}
				setValue={(input) => editUser({ ...user, age: input })}
				avatar={<MaterialIcons name="person" size={24} color="black" />}
			/>
			<ProfileDetail
				type={'ס"מ'}
				value={user.height}
				setValue={(input) => editUser({ ...user, height: input })}
				avatar={<MaterialCommunityIcons name="human-male-height" size={24} color="black" />}
			/>
			<ProfileDetail
				type={'ק"ג'}
				value={user.weight}
				setValue={(input) => editUser({ ...user, weight: input })}
				avatar={<FontAwesome5 name="weight" size={24} color="black" />}
			/>
			<Button title="התנתק מהפרופיל" onPress={() => handleSignOut()} buttonStyle={styles.signoutButton} />
		</ScrollView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	signoutButton: {
		margin: 20,
		borderRadius: 20,
		backgroundColor: '#209C5E',
	},
	imageContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	backgroundImage: {
		opacity: 0.5,
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 120,
		borderWidth: 3,
		borderColor: '#e8edeb',
		marginTop: 20,
	},
	name: {
		color: '#3a3d3f',
		fontSize: 30,
		fontWeight: 'bold',
	},
});
