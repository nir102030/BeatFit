import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import { getPrograms } from '../data/programData';
import { generateDailysTrainings } from '../functions/trainingsFunctions';
import { generateDailysMenus } from '../functions/nutritionFunctions';
import { editUserInDb } from '../api/appApi';

const CreateProgramScreen = ({ route }) => {
	const [programs, setPrograms] = useState(); //in later versions, the program will be recived from other sources
	const { user, editUser } = route.params;

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
		<>
			{/* <Button
				title="Add Program"
				onPress={() => editUser({ ...state.user, programs: [...state.user.programs, getProgram()] })}
			/> */}
			<Button
				title="ייבא תוכנית אימון"
				onPress={() => {
					const newUser = {
						...user,
						programs: programs,
					};
					editUser(newUser);
				}}
			/>
		</>
	);
};

export default CreateProgramScreen;
