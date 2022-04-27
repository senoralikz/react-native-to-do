import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

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
        // console.log(
        //   "Error Code:",
        //   errorCode,
        //   "------",
        //   "Error Message:",
        //   errorMessage
        // );
        Alert.alert(errorCode, errorMessage, { text: "Ok" });
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
      {/* <Button title="Sign In With Google" onPress={signInWithGoogle} /> */}
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
