import { api } from '../api/appApi';
import createDataContext from '../context/createDataContext';

const userReducer = (state, action) => {
	switch (action.type) {
		case 'get_user':
			return { ...state, user: action.payload };
		default:
			return state;
	}
};

const getUser = (dispatch) => async (token) => {
	try {
		const res = await api.get('/', { headers: { token: token } });
		dispatch({ type: 'get_user', payload: res.data });
	} catch (err) {
		console.log('user wasnt found');
	}
};

export const { Provider, Context } = createDataContext(
	userReducer,
	{ getUser },
	{ user: { userName: '', password: '', fname: '', lastName: '', age: '', height: '', weight: '', img: '' } }
);
