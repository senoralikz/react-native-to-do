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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { storage } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

const SignUpScreen = ({ navigation: { goBack } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const defaultImageRef = ref(
    storage,
    "defaultProfilePic/user-profile-default-image.png"
  );

  const defaultPhoto = async () => {
    await getDownloadURL(defaultImageRef)
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        setProfilePic(url);
        console.log("default photo url", url);

        // This can be downloaded directly:
        // const xhr = new XMLHttpRequest();
        // xhr.responseType = "blob";
        // xhr.onload = (event) => {
        //   const blob = xhr.response;
        // };
        // xhr.open("GET", url);
        // xhr.send();

        // Or inserted into an <img> element
        // const img = document.getElementById("myimg");
        // img.setAttribute("src", url);
      })
      .catch((error) => {
        // Handle any errors
        Alert.alert(error.code, error.message, { text: "Ok" });
      });
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Missing Info", "Please enter an email and password", {
        text: "Ok",
      });
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (!user.photoURL) {
            console.log(user.email, "has no default photo");
            getDownloadURL(defaultImageRef)
              .then((url) => {
                console.log("got default pic url", url);
                updateProfile(user, {
                  photoURL: url,
                }).then(() => {
                  console.log("photoURL for user:", user.photoURL);
                });
              })
              .then(() => {
                updateProfile(user, {
                  photoURL: profilePic,
                }).then(() => {
                  console.log("photoURL for user:", user.photoURL);
                });
              });
          }
          Alert.alert("Welcome", "Thank you for signing up!", { text: "Ok" });
        })
        // .then((user) => {
        //   updateProfile(user, {
        //     photoURL: profilePic,
        //   });
        //   console.log("updated with default photo:", user.photoURL);
        // })
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
