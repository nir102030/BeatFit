import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './src/navigators/AppNavigator';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as UserProvider } from './src/context/UserContext';
import { YellowBox } from 'react-native';

export default function App() {
	YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);
	return (
		<UserProvider>
			<AuthProvider>
				<AppNavigator />
			</AuthProvider>
		</UserProvider>
	);
}
