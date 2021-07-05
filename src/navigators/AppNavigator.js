import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { loadingStack } from "./loadingStack";
import { loginStack } from "./loginStack";
import { mainStack } from "./mainStack";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import { Context as ProgramContext } from "../context/ProgramContext";

const AppNavigator = () => {
  //get authentication state and actions
  const {
    state: { token, authLoading },
    tryLocalSignin,
  } = useContext(AuthContext);

  //get user state
  const {
    state: { user, userLoading },
    getUser,
  } = useContext(UserContext);

  const {
    state: { programs, programLoading },
    getPrograms,
  } = useContext(ProgramContext);

  const initiateData = async () => {
    const token = await tryLocalSignin();
    const user = await getUser(token);
    await getPrograms(user?.userName);
  };

  useEffect(() => {
    initiateData();
  }, []);

  //in case the user is signed in (he has a valid token), render the main stack
  //otherwise, render the login stack
  const renderApp = () => {
    return token ? mainStack(user, programs) : loginStack();
  };

  return (
    <NavigationContainer>
      {authLoading || userLoading || programLoading
        ? loadingStack()
        : renderApp()}
    </NavigationContainer>
  );
};

export default AppNavigator;
