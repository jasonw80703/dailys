import React, { useEffect, useState } from 'react';
import { LogBox, View } from 'react-native';
import { Text } from '@rneui/base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchScreen from './components/auth/LaunchScreen';
import Main from './components/Main';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import { auth } from './firebase';

import { Provider } from 'react-redux';
import { store } from './redux/store';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['Setting a timer']);

const onAuthStateChange = (userCallback, loadingCallback) => {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      userCallback({ loggedIn: true, email: user.email });
      loadingCallback(false);
    } else {
      userCallback({ loggedIn: false });
      loadingCallback(false);
    }
  });
};

const App = () => {
  const [user, setUser] = useState({ loggedIn: false });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser, setIsLoading);
    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (user.loggedIn) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Launch'>
          <Stack.Screen name='Launch' component={LaunchScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{ title: 'Reset Password' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
