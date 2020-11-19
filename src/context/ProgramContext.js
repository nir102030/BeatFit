//this context is currently not in use

import { api } from '../api/appApi';
import createDataContext from '../context/createDataContext';

const programReducer = (state, action) => {
	switch (action.type) {
		case 'add_program':
			return { ...state, program: action.payload };
		case 'get_program':
			return { ...state, program: action.payload };
		case 'edit_program':
			return { ...state, program: action.payload };
		default:
			return state;
	}
};

//get the user details
const addProgram = (dispatch) => async (program) => {
	try {
		const res = await api.post('/addprogram', { program });
		console.log(res.data);
		//dispatch({ type: 'add_program', payload: res.data });
	} catch (err) {
		console.log('Something went wrong with adding the program to db');
	}
};

const getProgram = (dispatch) => async (userName) => {
	try {
		const res = await api.get('/getprogram', { headers: { userName: userName } });
		dispatch({
			type: 'get_program',
			payload: res.data,
		});
	} catch {
		console.log('Something went wrong with receiving the program from db');
	}
};

const editProgram = (dispatch) => async (userName, program) => {
	try {
		await api.post('/editprogram', { userName, program });
		dispatch({
			type: 'edit_program',
			payload: program,
		});
	} catch {
		console.log('Some problem occuard with program update');
	}
};

export const { Provider, Context } = createDataContext(
	programReducer,
	{ addProgram, getProgram, editProgram },
	{ program: {} }
);
