import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

export function ButtonDanger(props: { onPress: () => void }) {
  return (
    <Pressable
      style={[styles.button, styles.buttonDanger]}
      onPress={props.onPress}
    >
      <Text style={[styles.buttonDangerText]}>Clear</Text>
    </Pressable>
  );
}

export function ButtonPrimary(props: {
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      disabled={props.disabled}
      style={[styles.buttonPrimary, styles.button]}
      onPress={props.onPress}
    >
      <Text style={styles.buttonPrimaryText}>Choose</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  buttonPrimary: {
    backgroundColor: "transparent",
    borderColor: "powderblue",
    borderWidth: 2,
  },
  buttonPrimaryText: {
    color: "powderblue",
  },
  buttonDanger: {
    backgroundColor: "transparent",
    borderColor: "#f47373",
    borderWidth: 2,
  },
  buttonDangerText: {
    color: "#f47373",
  },
});
