import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-native-elements';
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
		<>
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
