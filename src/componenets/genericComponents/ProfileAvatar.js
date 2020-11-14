import * as React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const ProfileAvatar = ({ imgSrc }) => {
	return (
		<TouchableOpacity style={{ paddingRight: 15 }}>
			<Image source={{ uri: imgSrc }} style={{ height: 40, width: 40, borderRadius: 30 }} />
		</TouchableOpacity>
	);
};

export default ProfileAvatar;
