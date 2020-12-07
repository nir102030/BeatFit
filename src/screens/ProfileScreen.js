import React, { useContext, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import ProfileDetail from '../componenets/ProfileDetail';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = ({ route }) => {
	const { signout } = useContext(AuthContext);
	const { user, editUser } = route.params;
	const [localUser, setLocalUser] = useState(user);

	const updateUser = (newUser) => {
		setLocalUser(newUser);
		editUser(newUser);
	};

	console.log(user);

	const signOutAlert = () => {
		Alert.alert(
			`היי ${localUser.fname}`,
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
				<Image source={{ uri: localUser.img }} style={styles.image} />
				<Text style={styles.name}>{`${localUser.fname} ${localUser.lname}`}</Text>
			</View>
			<ProfileDetail
				type={''}
				value={localUser.age}
				setValue={(input) => updateUser({ ...localUser, age: input })}
				avatar={<MaterialIcons name="person" size={24} color="black" />}
			/>
			<ProfileDetail
				type={'ס"מ'}
				value={localUser.height}
				setValue={(input) => updateUser({ ...localUser, height: input })}
				avatar={<MaterialCommunityIcons name="human-male-height" size={24} color="black" />}
			/>
			<ProfileDetail
				type={'ק"ג'}
				value={localUser.weight}
				setValue={(input) => updateUser({ ...localUser, weight: input })}
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
