import React, { useContext, useState } from "react";
import { View, ScrollView, Text, StyleSheet, Image, Alert, Dimensions, TouchableOpacity, Modal } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import ProfileDetail from "../componenets/ProfileDetail";
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import * as expoImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
	const { signout } = useContext(AuthContext);
	const {
		state: { user },
		editUser,
	} = useContext(UserContext);
	const [modalVisible, setModalVisible] = useState(false);

	const pickImage = async () => {
		let result = await expoImagePicker.launchImageLibraryAsync({
			mediaTypes: expoImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			editUser({ ...user, img: result.uri });
		}
	};

	const signOutAlert = () => {
		Alert.alert(
			`היי ${user.fname}`,
			"אתה בטוח שברצונך להתנתק?",
			[
				{
					text: "ביטול",
					style: "cancel",
				},
				{ text: "כן, התנתק מהפרופיל", onPress: () => signout() },
			],
			{ cancelable: false }
		);
	};

	const handleSignOut = () => {
		signOutAlert();
	};

	const updateProgramAlert = (programType) => {
		Alert.alert(
			`שים ❤️`,
			`אם תבחר לעדכן את תכנית ה${programType}, כל המידע על תכנית ה${programType} הנוכחית ימחק`,
			[
				{
					text: "אל תעדכן",
					style: "cancel",
				},
				{
					text: "הבנתי, רוצה לעדכן בכל זאת",
					onPress: () =>
						programType == "אימונים"
							? navigation.navigate("programTargets", { programType: "training" })
							: navigation.navigate("programTargets", { programType: "nutrition" }),
				},
			],
			{ cancelable: false }
		);
	};

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<ScrollView>
			<Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
				<Image source={{ uri: user.img }} style={styles.modalImage} onPress={closeModal} />
			</Modal>
			<View style={styles.imageContainer}>
				<TouchableOpacity onPress={pickImage} style={styles.editImage}>
					<Entypo name="edit" size={24} color="rgba(255,255,255,0.8)" />
				</TouchableOpacity>
				<TouchableOpacity onPress={openModal}>
					<Image source={{ uri: user.img }} style={styles.image} />
				</TouchableOpacity>
				<Text style={styles.name}>{`${user.fname} ${user.lname}`}</Text>
			</View>
			<ProfileDetail
				type={""}
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
			<View style={styles.buttonsContainer}>
				<Button
					title="עדכן תכנית אימון"
					onPress={() => updateProgramAlert("אימונים")}
					buttonStyle={styles.button}
				/>
				<Button
					title="עדכן תכנית תזונה"
					onPress={() => updateProgramAlert("תזונה")}
					buttonStyle={styles.button}
				/>
				<Button title="התנתק מהפרופיל" onPress={() => handleSignOut()} buttonStyle={styles.button} />
			</View>
		</ScrollView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	imageContainer: {
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 120,
		borderWidth: 3,
		borderColor: "#e8edeb",
		marginTop: 20,
	},
	modalImage: {
		width: "100%",
		height: "100%",
	},
	name: {
		color: "#3a3d3f",
		fontSize: 30,
		fontWeight: "bold",
	},
	buttonsContainer: {
		marginTop: Dimensions.get("window").height * 0.1,
	},
	button: {
		marginTop: 15,
		marginHorizontal: 40,
		borderRadius: 20,
		backgroundColor: "#209C5E",
	},
	editImage: {
		position: "absolute",
		bottom: "25%",
		left: "60%",
		zIndex: 1,
		backgroundColor: "rgba(150,200,100,1)",
		borderRadius: 24,
		padding: 5,
	},
});
