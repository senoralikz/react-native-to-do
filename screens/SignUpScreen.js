import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import { db, auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";

const SignUpScreen = ({ navigation: { goBack } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !password) {
      alert("Please enter an email and password");
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("signed up:", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(
            "Error Code:",
            errorCode,
            "------",
            "Error Message:",
            errorMessage
          );
          Alert.alert(errorCode, errorMessage, { text: "Ok" });
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>SignUpScreen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.emailInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.passwordInput}
        secureTextEntry
      />
      <Button title="Sign up" onPress={handleSignUp} />
      <Button title="Back to Log In" onPress={() => goBack()} />
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emailInput: {
    width: "80%",
    borderBottomColor: "#000",
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
    borderRadius: 20,
  },
  passwordInput: {
    width: "80%",
    borderBottomColor: "#000",
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
  },
});
