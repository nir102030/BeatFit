import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import { api } from '../api/appApi';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'add_error':
			return { ...state, err: action.payload, loading: false };
		case 'signin':
			return { token: action.payload, err: '', loading: false };
		case 'clear_error_message':
			return { ...state, err: '' };
		case 'signout':
			return { token: null, err: '' };
		case 'signup':
			return { ...state, loading: false };
		case 'set_loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

const tryLocalSignin = (dispatch) => async (getUser) => {
	const token = await AsyncStorage.getItem('token');
	if (token) {
		dispatch({
			type: 'signin',
			payload: token,
		});
		getUser(token);
	} else {
		dispatch({
			type: 'set_loading',
			payload: false,
		});
	}
};

const clearErrorMessage = (dispatch) => () => {
	dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => async (user) => {
	try {
		const response = await api.post('/signup', { user });
		await AsyncStorage.setItem('token', response.data.token);
		dispatch({
			type: 'signup',
		});
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: 'המשתמש כבר קיים',
		});
	}
};

const signin = (dispatch) => async (userName, password, getUser) => {
	try {
		const response = await api.post('/signin', { userName, password });
		await AsyncStorage.setItem('token', response.data.token);
		dispatch({
			type: 'signin',
			payload: response.data.token,
		});
		getUser(response.data.token);
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: 'קרתה תקלה בהתחברות',
		});
	}
};

const signout = (dispatch) => async () => {
	await AsyncStorage.removeItem('token');
	dispatch({ type: 'signout' });
};

const addErr = (dispatch) => (err) => {
	dispatch({ type: 'add_error', payload: err });
};

const setLoading = (dispatch) => (loading) => {
	dispatch({ type: 'set_loading', payload: loading });
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup, clearErrorMessage, tryLocalSignin, addErr, setLoading },
	{
		token: null,
		errorMessage: '',
		loading: true,
	}
);
