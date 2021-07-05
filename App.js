import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./src/navigators/AppNavigator";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as UserProvider } from "./src/context/UserContext";
import { Provider as ProgramProvider } from "./src/context/ProgramContext";
import { Provider as DailyProgramContext } from "./src/context/DailyProgramContext";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
    "Animated:",
    "componentWillReceiveProps has been renamed",
  ]);
  return (
    <AuthProvider>
      <UserProvider>
        <ProgramProvider>
          <DailyProgramContext>
            <AppNavigator />
          </DailyProgramContext>
        </ProgramProvider>
      </UserProvider>
    </AuthProvider>
  );
}
