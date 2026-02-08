// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { Link, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useLoader } from "@/hooks/useLoader";
// import { login } from "@/services/authServices";

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter(); 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { showLoader, hideLoader, isLoading } = useLoader();

//   const handleLogin = async () => {
//     if (!email || !password || isLoading) {
//       Alert.alert("Please enter email and password");
//       return;
//     }
//     try {
//       showLoader();
//       await login(email, password);
//       router.replace("/home");
//     } catch (e) {
//       console.error(e);
//       Alert.alert("Login fail");
//     } finally {
//       hideLoader();
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.centeredContent}
//     >
//       <View style={styles.headerContainer}>
//         <Text style={styles.brandSubtitle}>SMART SPEND</Text>
//         <Text style={styles.brandTitle}>Welcome Back</Text>
//       </View>

//       <View style={styles.glassPanel}>
//         <Text style={styles.loginTitle}>Login to Account</Text>

//         <TextInput
//           placeholder="Email Address"
//           placeholderTextColor="#7D8F69"
//           style={styles.inputField}
//           autoCapitalize="none"
//           value={email}
//           onChangeText={setEmail}
//         />

//         <View style={styles.passwordContainer}>
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor="#7D8F69"
//             secureTextEntry={!showPassword}
//             style={{ flex: 1, color: "#1a4d2e" }}
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             <Ionicons
//               name={showPassword ? "eye-off" : "eye"}
//               size={20}
//               color="#527853"
//             />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity 
//           activeOpacity={0.8}
//          style={[styles.signInButton,isLoading && { opacity: 0.7} ]}
//         onPress={handleLogin}
//         disabled={isLoading}
//         >
//           {isLoading ?(
//             <ActivityIndicator color="#ffffff" />
//           ):(
//           <Text style={styles.buttonText}>Sign In</Text>
//           )}
//         </TouchableOpacity>

//         <View style={styles.footer}>
//           <Text style={{ color: "#666" }}>New here? </Text>
//           <Link href="/register" asChild>
//             <TouchableOpacity>
//               <Text style={styles.linkText}>Create Account</Text>
//             </TouchableOpacity>
//           </Link>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   centeredContent: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 24,
//   },
//   headerContainer: {
//     alignItems: "center",
//     marginBottom: 32,
//   },
//   brandSubtitle: {
//     color: "#e2e8f0", // stone-200
//     letterSpacing: 4,
//     fontWeight: "600",
//     fontSize: 12,
//   },
//   brandTitle: {
//     color: "#ffffff",
//     fontSize: 36,
//     fontWeight: "800",
//     marginTop: 8,
//   },
//   glassPanel: {
//     backgroundColor: "rgba(255, 255, 255, 0.88)",
//     padding: 32,
//     borderRadius: 40,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     elevation: 5,
//   },
//   loginTitle: {
//     color: "#1a4d2e", // emerald-900
//     fontSize: 20,
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: 24,
//   },
//   inputField: {
//     height: 56,
//     borderRadius: 16,
//     paddingHorizontal: 20,
//     backgroundColor: "rgba(255, 255, 255, 0.6)",
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.4)",
//     marginBottom: 16,
//     color: "#1a4d2e",
//   },
//   passwordContainer: {
//     height: 56,
//     borderRadius: 16,
//     paddingHorizontal: 20,
//     backgroundColor: "rgba(255, 255, 255, 0.6)",
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.4)",
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   signInButton: {
//     height: 56,
//     borderRadius: 16,
//     backgroundColor: "#064e3b", // emerald-900/800
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontWeight: "700",
//     fontSize: 18,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 24,
//   },
//   linkText: {
//     color: "#1a4d2e",
//     fontWeight: "700",
//   },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLoader } from "@/hooks/useLoader";
import { login } from "@/services/authServices";

const { width } = Dimensions.get("window");

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleLogin = async () => {
    if (!email || !password || isLoading) {
      Alert.alert("Please enter email and password");
      return;
    }
    try {
      showLoader();
      await login(email, password);
      router.replace("/home");
    } catch (e) {
      console.error(e);
      Alert.alert("Login fail");
    } finally {
      hideLoader();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Header Section - Kept simple for modern look */}
      <View style={styles.headerContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="wallet-outline" size={32} color="#fff" />
        </View>
        <Text style={styles.brandTitle}>SMART SPEND</Text>
        <Text style={styles.brandSubtitle}>Login to manage your expenses</Text>
      </View>

      {/* Main Card Section */}
      <View style={styles.cardContainer}>
        
        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              placeholder="name@example.com"
              placeholderTextColor="#94A3B8"
              style={styles.inputField}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showPassword}
              style={[styles.inputField, { flex: 1 }]}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#64748B"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password (Optional visual addition) */}
        <TouchableOpacity style={styles.forgotPassword}>
           <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity 
          activeOpacity={0.8}
          style={[styles.signInButton, isLoading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.buttonText}>Sign In</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
            </View>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  brandTitle: {
  fontSize: 32,
  fontWeight: "800",       // Extra Bold
  color: "#ffffff",
  textTransform: "uppercase", // Forces capital letters
  letterSpacing: 2.5,      // Adds space between letters
  marginTop: 10,
  textShadowColor: "rgba(0, 0, 0, 0.3)", // Soft shadow
  textShadowOffset: { width: 0, height: 2 },
  textShadowRadius: 4,
},
  brandSubtitle: {
    color: "#e2e8f0",
    fontSize: 16,
    marginTop: 8,
    fontWeight: "400",
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#1e293b", // Slate 800
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9", // Slate 100
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputIcon: {
    marginRight: 12,
  },
  inputField: {
    flex: 1,
    color: "#1e293b",
    fontSize: 16,
    height: "100%",
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#064e3b",
    fontSize: 13,
    fontWeight: "600",
  },
  signInButton: {
    height: 58,
    borderRadius: 16,
    backgroundColor: "#0E21A0", // Deep Emerald
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#064e3b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: "#64748B", // Slate 500
    fontSize: 14,
  },
  linkText: {
    color: "#064e3b",
    fontWeight: "700",
    fontSize: 14,
  },
});