import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://mysterious-mountain-47955.herokuapp.com/',
	timeout: 5000,
});
