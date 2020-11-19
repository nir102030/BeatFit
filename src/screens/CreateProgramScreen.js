import React, { useState, useEffect, useContext } from 'react';
import { ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import CreateDailyProgram from '../componenets/trainerComponents/CreateDailyProgram';
import { Context as UserContext } from '../context/UserContext';
import { getPrograms } from '../data/programData';
import { generateDailysTrainings } from '../functions/trainingsFunctions';
import { generateDailysMenus } from '../functions/nutritionFunctions';

const CreateProgramScreen = () => {
	const [programs, setPrograms] = useState(); //in later versions, the program will be recived from other sources
	const { state, editUser } = useContext(UserContext);

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
					editUser({
						...state.user,
						programs: programs,
					});
				}}
			/>
			{/* {programState.program ? (
				<CreateDailyProgram
					dailyProgram={programState.program}
					programType={programState.program.type}
					setProgram={(newProgram) => setProgram(newProgram)}
				/>
			) : null} */}
		</>
	);
};

export default CreateProgramScreen;
