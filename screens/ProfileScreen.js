import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { FontAwesome5 } from "@expo/vector-icons";
import { storage } from "../firebaseConfig";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { v4 } from "uuid";

const ProfileScreen = ({ navigation }) => {
  const user = auth.currentUser;

  const [userDisplayName, setUserDisplayName] = useState(user.displayName);
  const [userProfilePic, setUserProfilePic] = useState(user.photoURL);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userEmailVerified, setUserEmailVerified] = useState(user.displayName);
  const [profileEditable, setProfileEditable] = useState(false);
  const [imagePicked, setImagePicked] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
          return;
        }
      }
    })();
  }, []);

  // const user = auth.currentUser;

  const handleEditProfile = () => {
    setProfileEditable((prevState) => !prevState);
  };

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
        const fileName = result.uri.replace(/^.*[\\\/]/, "");
        const imageRef = ref(
          storage,
          `users/${user.uid}/images/${fileName + v4()}`
        );

        // firebase storage only accepts array of bytes for image/file so we need to first fetch from result.uri
        //  and then convert to bytes using .blob() function from firebase
        const img = await fetch(result.uri);
        const bytes = await img.blob();
        await uploadBytes(imageRef, bytes)
          .then(() => {
            getDownloadURL(imageRef)
              .then((url) => {
                updateProfile(user, {
                  photoURL: url,
                }).then(() => {
                  Alert.alert("Success", "Succesfully updated profile pic", {
                    text: "Ok",
                  });
                  console.log("updated profile pic user:", user);
                });
              })
              .catch((error) => {
                console.error(error.code, "--- line 94 ----", error.message);
                Alert.alert(error.code, error.message, {
                  text: "Ok",
                });
              });
          })
          .catch((error) => {
            console.error(error.code, "--- line 101 ----", error.message);
            Alert.alert(error.code, error.message, {
              text: "Ok",
            });
          });
      }
    } catch (error) {
      Alert.alert(error.code, error.message, { text: "Ok" });
      console.error(error.code, "--- line 109 ----", error.message);
    }
  };

  // const handleProfilePicUpdate = () => {
  //   const imageRef = ref(
  //     storage,
  //     `images/${user.uid}/${imagePicked.name + v4()}`
  //   );
  //   uploadBytes(imageRef, imagePicked)
  //     .then((snapshot) => {
  //       console.log("successfully uploaded profile pic", snapshot);
  // Alert.alert("Success", "Succesfully updated profile pic", {
  //   text: "Ok",
  // });
  //     })
  //     .catch((error) => {
  //       Alert.alert(error.code, error.message, { text: "Ok" });
  //     });
  // };

  const handleProfileUpdate = () => {
    if (!userEmail) {
      Alert.alert("Oops!", "You must enter an email", { text: "Ok" });
    } else {
      updateProfile(user, {
        displayName: userDisplayName,
        email: userEmail,
      })
        .then(() => {
          // Profile updated!
          setProfileEditable((prevState) => !prevState);
          Alert.alert("Success!", "Profile Changes Saved", { text: "Ok" });
        })
        .catch((error) => {
          // An error occurred
          Alert.alert(error.code, error.message, { text: "Ok" });
        });
    }
  };

  return (
    <View style={styles.container}>
      {userProfilePic ? (
        <View>
          <Image source={{ uri: userProfilePic }} style={styles.profilePic} />
          <View style={styles.textView}>
            <Text style={styles.imageText}>Edit</Text>
          </View>
        </View>
      ) : (
        <Text>No profile pic for user</Text>
      )}
      <Button title="Change Profile Pic" onPress={selectProfilePic} />
      <View style={styles.editProfileButton}>
        <Pressable onPress={handleEditProfile}>
          <FontAwesome5 name="user-edit" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.profileProperties}>
        <Text style={{ fontSize: 18 }}>Display Name: </Text>
        <TextInput
          placeholder={userDisplayName}
          value={userDisplayName}
          onChangeText={(value) => setUserDisplayName(value)}
          editable={profileEditable}
          selectTextOnFocus={profileEditable}
          style={
            profileEditable
              ? styles.textInputFieldEditable
              : styles.textInputFieldLocked
          }
        />
      </View>
      <View style={styles.profileProperties}>
        <Text style={{ fontSize: 18 }}>Email: </Text>
        <TextInput
          placeholder={userEmail}
          value={userEmail}
          onChangeText={(value) => setUserEmail(value)}
          editable={profileEditable}
          selectTextOnFocus={profileEditable}
          style={
            profileEditable
              ? styles.textInputFieldEditable
              : styles.textInputFieldLocked
          }
        />
      </View>
      <Button title="Update Profile" onPress={handleProfileUpdate} />
      {/* <TextInput />Email Verified: {user.emailVerified} */}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  editProfileButton: {
    alignItems: "flex-end",
  },
  profileProperties: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    alignItems: "center",
  },
  textInputFieldLocked: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    height: 25,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#000",
    backgroundColor: "#ecf0f1",
    color: "#636e72",
    fontSize: 16,
  },
  textInputFieldEditable: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    height: 25,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#000",
    backgroundColor: "#fff",
    fontSize: 16,
  },
  imageText: {
    backgroundColor: "#000",
    color: "#fff",
    opacity: 0.8,
    borderRadius: 50,
  },
  // emailField: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // },
});
