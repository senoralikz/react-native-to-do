import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  TextInput,
  Alert,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { useState } from "react";
import { auth, storage } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const SignUpScreen = ({ navigation: { goBack } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profilePicUri, setProfilePicUri] = useState("");

  const selectProfilePic = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        exif: false,
      });
      if (!result.cancelled) {
        setProfilePicUri(result.uri);
      }
    } catch (error) {
      Alert.alert(error.code, error.message, { text: "Ok" });
      console.error(error.code, "--- line 109 ----", error.message);
    }
  };

  const signUpWithProfilePic = async (user) => {
    const fileName = profilePicUri.replace(/^.*[\\\/]/, "");
    const imageRef = ref(storage, `users/${user.uid}/images/${fileName}`);

    // firebase storage only accepts array of bytes for image/file so we need to first fetch from
    // result.uri and then convert to bytes using .blob() function from firebase
    const img = await fetch(profilePicUri);
    const bytes = await img.blob();
    await uploadBytes(imageRef, bytes).then(() => {
      console.log("successfully uploaded picture");
      getDownloadURL(imageRef).then((url) => {
        console.log(url);
        updateProfile(user, {
          photoURL: url,
          displayName: displayName,
        });
      });
    });
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Missing Info", "Please enter an email and password", {
        text: "Ok",
      });
    } else {
      const defaultImageRef = ref(
        storage,
        "defaultProfilePic/user-profile-default-image.png"
      );

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (!profilePicUri) {
            console.log(user.email, "has no default photo");
            getDownloadURL(defaultImageRef).then((url) => {
              // console.log("got default pic url", url);
              updateProfile(user, {
                photoURL: url,
                displayName: displayName,
              });
            });
          } else {
            console.log("signing up user with profile pic");
            signUpWithProfilePic(user);
          }
          Alert.alert("Welcome!", "Thank you for signing up.", {
            text: "Ok",
          });
        })
        .catch((error) => {
          console.log(error.code, "------", error.message);
          Alert.alert(errorCode, errorMessage, { text: "Ok" });
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sign Up</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Pressable onPress={selectProfilePic}>
          {!profilePicUri ? (
            <View style={styles.noProfilePicSelected}>
              <Text style={{ textAlign: "center", paddingVertical: 55 }}>
                Add Photo
              </Text>
            </View>
          ) : (
            <Image
              source={{ uri: profilePicUri }}
              style={styles.profilePicSelected}
            />
          )}
        </Pressable>
        <View>
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
            <AntDesign
              name="user"
              size={24}
              color="lightgrey"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder="Display Name"
              value={displayName}
              onChangeText={(text) => setDisplayName(text)}
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
          <View>
            <Button title="Sign up" onPress={handleSignUp} />
            <Button title="Back to Log In" onPress={() => goBack()} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
  noProfilePicSelected: {
    borderRadius: 75,
    borderStyle: "dashed",
    borderWidth: 1,
    height: 125,
    width: 125,
    backgroundColor: "#dfe6e9",
    opacity: 0.6,
  },
  profilePicSelected: {
    borderRadius: 75,
    height: 125,
    width: 125,
  },
});
