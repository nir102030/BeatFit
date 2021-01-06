import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { getPrograms } from '../data/programData';
import { generateDailysTrainings } from '../functions/trainingsFunctions';
import { generateDailysMenus } from '../functions/nutritionFunctions';
import { Context as UserContext } from '../context/UserContext';

const CreateProgramScreen = () => {
	const [programs, setPrograms] = useState(); //in later versions, the program will be recived from other sources
	const { state, editUser } = useContext(UserContext);
	const user = state;

	const initiatePrograms = () => {
		const tempPrograms = getPrograms();
		const trainingProgram = generateDailysTrainings(tempPrograms.training);
		const nutritionProgram = generateDailysMenus(tempPrograms.nutrition);
		setPrograms({ ...programs, training: trainingProgram, nutrition: nutritionProgram });
	};

	useEffect(() => {
		initiatePrograms();
	}, []);

	return (
		<View>
			<Button
				title="ייבא תכניות אימון ותזונה"
				onPress={() => {
					const newUser = {
						...user,
						programs: programs,
					};
					editUser(newUser);
				}}
			/>
			<View style={{ borderWidth: 1, borderRadius: 5, margin: 5 }}>
				<Text style={{ margin: 5 }}>בשלב זה, תכניות האימון והתזונה הן גנריות</Text>
				<Text style={{ margin: 5 }}>בגרסאות הבאות ניתן יהיה ליצור תכניות אימון ותזונה מותאמות אישית</Text>
			</View>
		</View>
	);
};

export default CreateProgramScreen;
