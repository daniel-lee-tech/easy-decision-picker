import React from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { updateChoicesFromQuestionArgs } from "../App";

type ChoiceInputProps = {
  id: number;
  updateCallback: (args: updateChoicesFromQuestionArgs) => void;
  choiceText: string;
  chosenId: number | null;
};

export function ChoiceInput(props: ChoiceInputProps): JSX.Element {
  const { id, updateCallback, choiceText } = props;

  function handleChangeText(choiceText: string) {
    updateCallback({ id, choiceText, options: { trash: false } });
  }

  function handleButtonPress() {
    updateCallback({ id, choiceText: "", options: { trash: true } });
  }

  function handleSubmit(
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) {
    updateCallback({ id, choiceText, options: { newEntry: true } });
    Keyboard.dismiss();
  }

  function renderChosenStyles() {
    if (props.chosenId === props.id) {
      return [styles.choiceInputContainer, styles.chosen];
    } else {
      return [styles.choiceInputContainer];
    }
  }

  return (
    <View style={renderChosenStyles()}>
      <TextInput
        placeholder="Enter a choice, new choices will auto appear"
        placeholderTextColor="#aaa"
        style={styles.choiceInput}
        value={choiceText}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
      />
      <Pressable style={styles.deleteButton} onPress={handleButtonPress}>
        <Text style={styles.deleteButtonText}>
          <Feather name="trash" size={24} color="#f47373" />
        </Text>
      </Pressable>
    </View>
  );
}

export const styles = StyleSheet.create({
  choiceInputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 4,
  },
  chosen: {
    borderColor: "blue",
    borderWidth: 10,
  },
  choiceInput: {
    borderColor: "#D9E3F0",
    color: "#D9E3F0",
    borderWidth: 1,
    borderRadius: 10,
    width: "66%",
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  deleteButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "#f47373",
    borderWidth: 2,
  },
  deleteButtonText: {
    color: "#f47373",
  },
});
