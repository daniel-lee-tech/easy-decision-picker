import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonDanger, ButtonPrimary } from "./components/Buttons";
import { ChoiceInput } from "./components/ChoiceInput";
import { Feather } from "@expo/vector-icons";

export type updateChoicesFromQuestionArgs = {
  id: number;
  choiceText: string;
  options?: { trash?: boolean; newEntry?: boolean };
};
export default function App() {
  const [choices, setChoices] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [chosen, setChosen] = useState<number | null>(null);

  function updateChoicesFromChildInput({
    id,
    choiceText,
    options,
  }: updateChoicesFromQuestionArgs) {
    setChosen(null);
    if (options?.trash) {
      setChoices(choices.filter((e, i) => i !== id));
      return;
    }

    if (options?.newEntry) {
      const newChoices = choices.map((e, i) => (i === id ? choiceText : e));
      setChoices([...newChoices, ""]);
      return;
    }

    const newChoices = choices.map((e, i) => (i === id ? choiceText : e));
    setChoices(newChoices);
    return;
  }

  useEffect(() => {
    if (choices.length === 0) {
      setChoices([""]);
    }

    if (choices.length > 9) {
      alert("Max 9 choices");
      setChoices((prevState) => prevState.slice(0, 9));
    }
  }, [choices]);

  function handleClear() {
    setChosen(null);
    setChoices([]);
    setQuestion("");
  }

  // TODO: refactor me into a separate component
  function renderAddNewButton(choices: string[]) {
    function handlePress() {
      if (chosen != null) {
        setChosen(null);
      }

      if (choices.length > 8) {
        alert("only 9 choices");
        return;
      }

      setChoices((prev) => [...prev, ""]);
    }

    return (
      <Pressable
        style={{
          borderWidth: 2,
          borderRadius: 10,
          borderColor: "#D9E3F0",
          paddingHorizontal: 20,
          paddingVertical: 20,
          justifyContent: "center",
        }}
        onPress={handlePress}
      >
        <Feather name="plus" size={24} color="#D9E3F0" />
      </Pressable>
    );
  }

  function handleChoose() {
    setChoices((prevState) => prevState.filter((e) => e !== ""));

    if (choices.length === 1) {
      setChoices(["yes", "no"]);
    }

    setChosen(Math.floor(Math.random() * choices.length));
  }

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled={true}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
      >
        <View style={styles.questionContainer}>
          <TextInput
            placeholder="Enter a question..."
            placeholderTextColor="#aaa"
            value={question}
            onChangeText={setQuestion}
            style={styles.questionInput}
            multiline={true}
          />
        </View>
        <View style={styles.answersContainer}>
          {choices.map((e, i) => (
            <ChoiceInput
              chosenId={chosen}
              key={i}
              id={i}
              choiceText={e}
              updateCallback={updateChoicesFromChildInput}
            />
          ))}
        </View>
        <View style={styles.buttonsContainer}>
          <ButtonDanger onPress={handleClear} />
          {renderAddNewButton(choices)}
          <ButtonPrimary onPress={handleChoose} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "#D9E3F0",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 40,
  },
  questionContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 30,
    color: "#D9E3F0",
  },
  answersContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: "auto",
  },
  questionInput: {
    borderColor: "#D9E3F0",
    borderRadius: 10,
    color: "#D9E3F0",
    borderWidth: 1,
    width: "66%",
    fontSize: 20,
    padding: 30,
  },
});
