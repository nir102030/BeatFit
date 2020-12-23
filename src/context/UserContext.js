import { api } from '../api/appApi';
import createDataContext from '../context/createDataContext';
import axios from 'axios';

const userReducer = (state, action) => {
	switch (action.type) {
		case 'get_user':
			return action.payload;
		case 'edit_user':
			return action.payload;
		default:
			return state;
	}
};

//get the user details
const getUser = (dispatch) => async (token) => {
	try {
		const res = await api.get('/', { headers: { token: token } });
		dispatch({ type: 'get_user', payload: res.data });
	} catch (err) {
		console.log('user wasnt found');
	}
};

const editUser = (dispatch) => async (user) => {
	try {
		const res = await api.post('/edituser', { user });
		dispatch({
			type: 'edit_user',
			payload: user,
		});
	} catch {
		console.log('Some problem occuard with update');
	}
};

export const { Provider, Context } = createDataContext(
	userReducer,
	{ getUser, editUser },
	{
		userName: '',
		password: '',
		fname: '',
		lastName: '',
		age: '',
		height: '',
		weight: '',
		img: '',
		programs: {},
	}
);
