import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LaunchScreen from "./components/LaunchScreen";
import WhatIsDailys from "./components/explanation/WhatIsDailys";
import Signup from "./components/auth/Signup";

const Stack = createNativeStackNavigator();

const App = () => {
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
};

export default App;
