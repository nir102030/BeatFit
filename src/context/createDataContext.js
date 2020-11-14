import React, { useReducer } from 'react';

//the props for this componenet received from the each context comp
//reducer - gets the current state and returns the updated state according to the action
export default (reducer, actions, defaultValue) => {
	const Context = React.createContext();

	const Provider = ({ children }) => {
		//the userReducer hook gets a reducer (and a default state value)
		//and returns the updated state and the dispatch function
		const [state, dispatch] = useReducer(reducer, defaultValue);

		//add the dispatch function recieved from the reducer to all the actions
		//the dispatch function is received by each action, and used to "dispatch" the action into the reducer
		const boundActions = {};
		for (let key in actions) {
			boundActions[key] = actions[key](dispatch);
		}

		//return the context provider, with the new state and actions
		return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
	};

	//the provider is used to provide the context to all the componenets that he wrap
	//the context is used localy for each componenet that wants to use the current state or change it by the context actions
	return { Context, Provider };
};
