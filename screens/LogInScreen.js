import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Image,
} from "react-native";
import { useState, useLayoutEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { SocialIcon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";

import { GoogleAuthProvider } from "@firebase/auth";
import { useIdTokenAuthRequest } from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { maybeCompleteAuthSession } from "expo-web-browser";

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "To Do or Not To Do",
  //     headerShown: false,
  //   });
  // }, [navigation]);

  // const signInWithGoogleAsync = async () => {
  //   try {
  //     const result = await Google.logInAsync({
  //       androidClientId:
  //         "67422896164-e00660mmff83hoqncdv5n2ci1lhrns6d.apps.googleusercontent.com",
  //       iosClientId:
  //         "67422896164-e5frgbgjj7vap5j3k1gj6gfe1or0ceic.apps.googleusercontent.com",
  //       scopes: ["profile", "email"],
  //     });
  //     if (result.type === "success") {
  //       setAccessToken(result.accessToken);
  //     } else {
  //       console.log("Permission Denied");
  //     }
  //   } catch (error) {
  //     console.error(error.code, "-----", error.message);
  //     Alert.alert(error.code, error.message, { text: "Ok" });
  //   }
  // };

  // const getUserData = async () => {
  //   let userInfoResponse = await fetch(
  //     "https://www.googleapis.com/userinfo/v2/me",
  //     {
  //       header: { Authorization: `Bearer ${accessToken}` },
  //     }
  //   );
  //   userInfoResponse.json().then((data) => {
  //     setUserInfo(data);
  //   });
  // };

  // const showUserInfo = () => {
  //   if (userInfo) {
  //     console.log(userInfo);
  //     return (
  //       <View>
  //         <Image source={{ uri: userInfo.picture }} />
  //         <Text>Welcome {userInfo.name}</Text>
  //         <Text>{userInfo.email}</Text>
  //       </View>
  //     );
  //   }
  // };

  // const signInWithGoogle = () => {
  //   signInWithRedirect(auth, provider);
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access Google APIs.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;

  //       // The signed-in user info.
  //       const user = result.user;
  //       console.log("signed in with google", user);
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //       Alert.alert(errorCode, errorMessage, { text: "Ok" });
  //     });
  // };

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
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Log In</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <View>
          <SocialIcon
            type="google"
            title="Sign In With Google"
            fontStyle={{ fontSize: 20 }}
            button={true}
            // light={true}
            onPress={() => alert("singing in with google")}
            style={{ width: 200, borderRadius: 10 }}
          />
          {/* {showUserInfo()}
          <Button
            title={accessToken ? "Get User Data" : "Login"}
            onPress={accessToken ? getUserData : signInWithGoogleAsync}
          /> */}
        </View>
        <View style={{ marginBottom: 20 }}>
          <SocialIcon
            type="apple"
            title="Sign In With Apple"
            fontStyle={{ fontSize: 20 }}
            button={true}
            onPress={() => alert("singing in with apple")}
            style={{
              width: 200,
              backgroundColor: "#000",
              borderRadius: 10,
            }}
          />
        </View>
        {/* <Text>Or Sign In With Email</Text> */}
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <View
            style={{
              backgroundColor: "lightgrey",
              height: 2,
              flex: 1,
              alignSelf: "center",
            }}
          />
          <Text style={{ alignSelf: "center", paddingHorizontal: 5 }}>
            Or Sign In With Email
          </Text>
          <View
            style={{
              backgroundColor: "lightgrey",
              height: 2,
              flex: 1,
              alignSelf: "center",
            }}
          />
        </View>
        <View style={styles.emailPWInput}>
          <MaterialCommunityIcons
            name="email"
            size={24}
            color="lightgrey"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{ width: "100%" }}
          />
        </View>
        <View style={styles.emailPWInput}>
          <MaterialCommunityIcons
            name="onepassword"
            size={24}
            color="lightgrey"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{ width: "100%" }}
            secureTextEntry
          />
        </View>
        <Button title="Log In" onPress={handleLogIn} />
        <Button title="Sign up" onPress={() => navigation.navigate("SignUp")} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emailPWInput: {
    width: "80%",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginVertical: 5,
    padding: 5,
  },
  // emailPWInput: {
  //   width: "80%",
  //   borderBottomWidth: 1,
  //   padding: 5,
  //   marginVertical: 5,
  // },
});
