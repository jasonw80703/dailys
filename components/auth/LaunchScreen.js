import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";

const LaunchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Dailys</Text>
      <Button title='Signup' onPress={() => navigation.navigate("Signup")} />
      <Button title='Login' onPress={() => navigation.navigate("Login")} />
    </View>
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

export default LaunchScreen;
