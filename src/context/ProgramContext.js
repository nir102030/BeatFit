import { api } from "../api/appApi";
import createDataContext from "../context/createDataContext";

const programReducer = (state, action) => {
	switch (action.type) {
		case "add_program":
			return {
				...state,
				programs: { ...state.programs, [action.payload.type]: action.payload },
				programLoading: { ...state.programLoading, [action.payload.type]: false },
			};
		case "get_program":
			return {
				...state,
				programs: { ...state.programs, [action.payload.type]: action.payload },
				programLoading: { ...state.programLoading, [action.payload.type]: false },
			};
		case "edit_program":
			return {
				...state,
				programs: { ...state.programs, [action.payload.type]: action.payload },
				programLoading: { ...state.programLoading, [action.payload.type]: false },
			};
		case "edit_daily_program":
			const { itemToEdit, subItemToEdit } = action.payload;
			const newSubItems = itemToEdit.subItems.map((subItem) =>
				subItem.name == subItemToEdit.name ? subItemToEdit : subItem
			);
			const newItems = state.dailyProgram.items.map((item) =>
				item.label == itemToEdit.label ? { ...item, subItems: newSubItems } : item
			);

			return {
				...state,
				dailyProgram: { ...state.dailyProgram, items: newItems },
			};
		case "set_chosen_daily_program":
			return {
				...state,
				dailyProgram: state.programs[action.payload.programType].dailysPrograms.find(
					(dailyProgram) => dailyProgram.date == action.payload.date
				),
			};
		case "set_program_loading":
			return {
				...state,
				programLoading: { ...state.programLoading, [action.payload.type]: action.payload.loading },
			};
		default:
			return state;
	}
};

//get the user details
const addProgram = (dispatch) => async (program) => {
	try {
		await api.post("/addprogram", { program });
		dispatch({ type: "add_program", payload: program });
	} catch (err) {
		console.log("Something went wrong with adding the program to db");
		dispatch({
			type: "set_program_loading",
			payload: { type: program.type, loading: false },
		});
	}
};

const getProgram = (dispatch) => async (userName, type) => {
	try {
		const res = await api.get("/getprogram", { headers: { userName: userName, type: type } });
		dispatch({
			type: "get_program",
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: "set_program_loading",
			payload: { type: type, loading: false },
		});
	}
};

const editProgram = (dispatch) => async (program) => {
	try {
		await api.post("/editprogram", { program });
		dispatch({
			type: "edit_program",
			payload: program,
		});
	} catch {
		alert("משהו השתבש עם עדכון התכנית. נסה שוב");
		dispatch({
			type: "set_program_loading",
			payload: { type: program.type, loading: false },
		});
	}
};

const editDailyProgram = (dispatch) => (itemToEdit, subItemToEdit) => {
	dispatch({
		type: "edit_program",
		payload: { itemToEdit, subItemToEdit },
	});
};

const setChosenDailyProgram = (dispatch) => (date, programType) => {
	dispatch({
		type: "set_chosen_daily_program",
		payload: { programType, date },
	});
};

const setProgramLoading = (dispatch) => (loading) => {
	dispatch({
		type: "set_program_loading",
		payload: loading,
	});
};

export const { Provider, Context } = createDataContext(
	programReducer,
	{ addProgram, getProgram, editProgram, setProgramLoading, editDailyProgram, setChosenDailyProgram },
	{
		programs: {},
		programLoading: { training: true, nutrition: true },
		dailyProgram: null,
	}
);
