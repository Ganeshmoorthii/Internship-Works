// import { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import { useRouter } from "expo-router";
// import { useTheme } from "@react-navigation/native";
// import { auth } from "../firebase/config"; // ✅ adjust the path if needed
// import { createUserWithEmailAndPassword } from "firebase/auth";

// export default function SignUp() {
//   const router = useRouter();
//   const { colors } = useTheme();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignUp = async () => {
//     if (!email || !password) {
//       Alert.alert("Missing Fields", "Please enter both email and password.");
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       Alert.alert("Success", `Account created for ${user.email}`);
//       router.replace("/"); // Navigate back to login
//     } catch (error: any) {
//       console.error("Signup error:", error.message);
//       Alert.alert("Signup Failed", error.message);
//     }
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       <Text style={[styles.title, { color: colors.text }]}>Sign Up</Text>

//       {/* Email Label */}
//       <Text style={[styles.label, { color: colors.text }]}>Email</Text>
//       <TextInput
//         style={[styles.input, { color: colors.text, borderColor: colors.border }]}
//         placeholder="Enter your email"
//         placeholderTextColor={colors.border}
//         onChangeText={setEmail}
//         value={email}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       {/* Password Label */}
//       <Text style={[styles.label, { color: colors.text }]}>Password</Text>
//       <TextInput
//         style={[styles.input, { color: colors.text, borderColor: colors.border }]}
//         placeholder="Enter your password"
//         placeholderTextColor={colors.border}
//         onChangeText={setPassword}
//         value={password}
//         secureTextEntry
//       />

//       <Button title="Sign Up" onPress={handleSignUp} />

//       <Text
//         style={[styles.link, { color: colors.primary }]}
//         onPress={() => router.replace("/")}
//       >
//         Already have an account? Login
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 20 },
//   title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
//   label: { marginBottom: 5, fontSize: 16 },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
//   link: {
//     marginTop: 15,
//     textAlign: "center",
//   },
// });
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "111761079471-42agb9o56p32lvrbhhj9njs5hmbeemfu.apps.googleusercontent.com", // your Firebase web client ID
    androidClientId: "111761079471-rkti8i3mmn3lju80f9a3164pde9nallc.apps.googleusercontent.com", // your Firebase Android client ID
  });

  useEffect(() => {
    if (response?.type === "success") {
      const id_token = response.params?.id_token;
      if (!id_token) {
        Alert.alert("Google Sign-in Failed", "No token received.");
        return;
      }

      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCred) => {
          Alert.alert("Success", `Signed in as ${userCred.user.email}`);
          router.push("/home");
        })
        .catch((err) => {
          Alert.alert("Google Sign-in Error", err.message);
        });
    }
  }, [response]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", `Logged in as ${userCredential.user.email}`);
      router.push("/home");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Login</Text>

      <Text style={[styles.label, { color: colors.text }]}>Email</Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Enter your email"
        placeholderTextColor={colors.border}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={[styles.label, { color: colors.text }]}>Password</Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Enter your password"
        placeholderTextColor={colors.border}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity
        style={[styles.googleButton, { borderColor: colors.border }]}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={[styles.googleButtonText, { color: colors.text }]}>
          Sign in with Google
        </Text>
      </TouchableOpacity>

      <Text
        style={[styles.link, { color: colors.primary }]}
        onPress={() => router.push("/signup")}
      >
        Don't have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  label: { marginBottom: 5, fontSize: 16 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  googleButton: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  googleButtonText: {
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
  },
});
