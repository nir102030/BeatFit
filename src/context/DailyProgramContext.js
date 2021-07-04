import createDataContext from "./createDataContext";

const dailyProgramReducer = (state, action) => {
	switch (action.type) {
		case "set_chosen_daily_program":
			return {
				...state,
				dailyProgram: action.payload,
			};
		case "edit_subItem":
			const { itemToEdit, subItemToEdit } = action.payload;
			const newSubItems = itemToEdit.subItems.map((subItem) =>
				subItem.name == subItemToEdit.name ? subItemToEdit : subItem
			);
			const newItems = state.dailyProgram.items.map((item) =>
				item.label == itemToEdit.label ? { ...item, subItems: newSubItems } : item
			);

			const completed =
				subItemToEdit.done == true
					? state.dailyProgram.completed + 1
					: subItemToEdit.done == false
					? state.dailyProgram.completed - 1
					: state.dailyProgram.completed;

			return {
				...state,
				dailyProgram: { ...state.dailyProgram, items: newItems, completed: completed },
			};
		default:
			return state;
	}
};

const editSubItem = (dispatch) => (itemToEdit, subItemToEdit) => {
	dispatch({
		type: "edit_subItem",
		payload: { itemToEdit, subItemToEdit },
	});
};

const setChosenDailyProgram = (dispatch) => (dailyProgram) => {
	dispatch({
		type: "set_chosen_daily_program",
		payload: dailyProgram,
	});
};

export const { Provider, Context } = createDataContext(
	dailyProgramReducer,
	{ editSubItem, setChosenDailyProgram },
	{
		dailyProgram: null,
	}
);
