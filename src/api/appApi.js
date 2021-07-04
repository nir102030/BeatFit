import axios from "axios";

export const api = axios.create({
	baseURL: "http://mysterious-mountain-47955.herokuapp.com/",
	timeout: 5000,
});

export const getImage = async (name) => {
	try {
		const response = await api.get("/getImage", { headers: { name: name } });
		return response.data.base64;
	} catch (err) {
		console.log(err);
		return null;
	}
};
