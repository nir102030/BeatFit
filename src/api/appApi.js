import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://01d2bcea928e.ngrok.io',
});

export const getUserFromDb = async (token) => {
	try {
		const res = await api.get('/', { headers: { token: token } });
		return res.data;
	} catch (err) {
		console.log('user wasnt found');
		return null;
	}
};

export const editUserInDb = async (user) => {
	try {
		await api.post('/edituser', { user });
	} catch {
		console.log('Some problem occuard with update');
	}
};
