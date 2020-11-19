import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const ProfileDetail = ({ type, value, setValue, avatar }) => {
	const [editable, setEditable] = useState(false);
	const [input, setInput] = useState(value);
	return (
		<View style={styles.container}>
			<View style={styles.profileDetail}>
				{avatar}
				<View style={styles.valueContainer}>
					{editable ? (
						<Input
							style={styles.inputContainer}
							inputStyle={styles.input}
							value={input}
							onChangeText={(newInput) => setInput(newInput)}
						></Input>
					) : (
						<Text style={styles.value}>{`${input} ${type}`}</Text>
					)}
				</View>
			</View>
			{editable ? (
				<TouchableOpacity
					style={styles.edit}
					onPress={() => {
						const val = editable;
						setEditable(!val);
						setValue(input);
					}}
				>
					<AntDesign name="checkcircleo" size={24} color="black" />
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={styles.edit}
					onPress={() => {
						const val = editable;
						setEditable(!val);
					}}
				>
					<AntDesign name="edit" size={24} color="black" />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default ProfileDetail;

const styles = StyleSheet.create({
	container: {
		borderRadius: 20,
		marginHorizontal: 40,
		marginVertical: 10,
		flexDirection: 'row',
		backgroundColor: 'transparent',
	},
	profileDetail: {
		flexDirection: 'row',
		flex: 5,
		alignItems: 'center',
	},
	edit: {
		flex: 1,
	},
	value: {
		flex: 3,
		marginLeft: 10,
		marginLeft: 20,
		fontFamily: 'sans-serif',
		color: '#7e858b',
		fontSize: 18,
		alignSelf: 'flex-start',
	},
	inputContainer: {},
	valueContainer: {
		flex: 1,
	},
});
