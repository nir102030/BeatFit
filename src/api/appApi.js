import axios from 'axios';

const api = axios.create({
	baseURL: 'http://eb0e38990428.ngrok.io',
});

export const signUp = async (userName, password, setErr) => {
	try {
		const res = await api.post('/signup', { userName, password });
		setErr({ msg: 'Signed Up Successfully', color: 'blue' });
		return res.data;
	} catch (err) {
		setErr({ msg: 'User name already exist', color: 'red' });
		return null;
	}
};

export const signIn = async (userName, password, setErr, setSignedIn) => {
	try {
		const res = await api.post('/signin', { userName, password });
		//setErr({ msg: 'Signed Up Successfully', color: 'blue' });
		setSignedIn(true);
	} catch (err) {
		setErr({ msg: 'Invaild password or email', color: 'red' });
	}
};
