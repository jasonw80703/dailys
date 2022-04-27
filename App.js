import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text style={styles.titleText}>Dailys</Text>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "bold",
  },
});

export default App;
