import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as expoImagePicker from 'expo-image-picker';

export default function ImagePicker({ setUserImage }) {
	const [image, setImage] = useState(null);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await expoImagePicker.requestCameraRollPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		let result = await expoImagePicker.launchImageLibraryAsync({
			mediaTypes: expoImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
			setUserImage(result.uri);
		}
	};

	return (
		<View style={styles.container}>
			<Button title="בחר תמונת פרופיל" onPress={pickImage} buttonStyle={styles.button} />
			{image && <Image source={{ uri: image }} style={styles.image} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginBottom: 30,
		flexDirection: 'row',
	},
	button: {
		color: '#4ca1ad',
		borderRadius: 10,
		marginHorizontal: 20,
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 120,
	},
});
