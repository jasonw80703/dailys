import React from "react";
import { View, StyleSheet, Text } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Dailys</Text>
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

export default App;
