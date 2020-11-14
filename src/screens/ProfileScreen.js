import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
	const { signout } = useContext(AuthContext);

	const handleSignOut = () => {
		signout();
	};

	return (
		<View>
			<Button title="Sign Out" onPress={() => handleSignOut()} />
		</View>
	);
};

export default ProfileScreen;
