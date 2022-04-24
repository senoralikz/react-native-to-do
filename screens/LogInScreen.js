import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const handleLogIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("logged in with user:", email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          "Error Code:",
          errorCode,
          "------",
          "Error Message:",
          errorMessage
        );
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>Log In Screen</Text>
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
      <Button title="Log In" onPress={handleLogIn} />
      <Button title="Sign up" onPress={() => navigation.navigate("SignUp")} />
    </KeyboardAvoidingView>
  );
};

export default LogInScreen;

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
    borderRadius: 10,
  },
  passwordInput: {
    width: "80%",
    borderBottomColor: "#000",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
});
