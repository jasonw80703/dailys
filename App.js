import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LaunchScreen from "./components/auth/LaunchScreen";
import Main from "./components/Main";
import WhatIsDailys from "./components/explanation/WhatIsDailys";
import Signup from "./components/auth/Signup";
import { auth } from "./firebase";

// Redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

const Stack = createNativeStackNavigator();

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

  // ADD login logic
  // const requestLogin = useCallback((username, password) => {
  //   login
  // })

  // ADD logout logic

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (user.loggedIn) {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Launch'>
          <Stack.Screen
            name='Launch'
            component={LaunchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='Carousel1' component={WhatIsDailys} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
