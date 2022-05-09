import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LaunchScreen from "./components/LaunchScreen";
import WhatIsDailys from "./components/explanation/WhatIsDailys";
import Signup from "./components/auth/Signup";
import { auth } from "./firebase";

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
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Logged in successfully </Text>
      </View>
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
