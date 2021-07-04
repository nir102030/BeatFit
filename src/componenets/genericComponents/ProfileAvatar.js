import * as React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileAvatar = ({ imgSrc }) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity style={{ paddingRight: 15 }} onPress={() => navigation.navigate("פרופיל")}>
			<Image source={{ uri: imgSrc }} style={{ height: 40, width: 40, borderRadius: 30 }} />
		</TouchableOpacity>
	);
};

export default ProfileAvatar;
