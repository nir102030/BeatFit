import { api } from "../api/appApi";
import createDataContext from "../context/createDataContext";
import axios from "axios";

const userReducer = (state, action) => {
	switch (action.type) {
		case "get_user":
			return { ...state, user: action.payload, userLoading: false };
		case "edit_user":
			return { ...state, user: action.payload, userLoading: false };
		case "set_user_loading": {
			return { ...state, userLoading: action.payload };
		}
		default:
			return state;
	}
};

//get the user details
const getUser = (dispatch) => async (token) => {
	try {
		const res = await api.get("/", { headers: { token: token } });
		dispatch({ type: "get_user", payload: res.data });
		return res.data;
	} catch (err) {
		dispatch({
			type: "set_user_loading",
			paylod: false,
		});
		return null;
	}
};

const editUser = (dispatch) => async (user) => {
	try {
		const res = await api.post("/edituser", { user });
		dispatch({
			type: "edit_user",
			payload: user,
		});
	} catch {
		console.log("Some problem occuard with update");
	}
};

const setUserLoading = (dispatch) => (loading) => {
	dispatch({
		type: "set_user_loading",
		payload: loading,
	});
};

export const { Provider, Context } = createDataContext(
	userReducer,
	{ getUser, editUser, setUserLoading },
	{
		user: {
			userName: "",
			password: "",
			fname: "",
			lastName: "",
			age: "",
			height: "",
			weight: "",
			img: "",
			programs: {},
		},
		userLoading: true,
	}
);
