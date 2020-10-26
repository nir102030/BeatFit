import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';

const HeaderMenu = ({ navigation }) => {
	return (
		<TouchableOpacity style={{ paddingLeft: 15 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
			<SimpleLineIcons name="menu" size={24} color="black" />
		</TouchableOpacity>
	);
};

export default HeaderMenu;
