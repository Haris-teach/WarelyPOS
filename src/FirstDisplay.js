import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FirstDisplay = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Hello from first screen</Text>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "red",
  },
  hello: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

export default FirstDisplay;
