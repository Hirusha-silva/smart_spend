
import { useLoader } from "@/hooks/useLoader";
import { registerUser } from "@/services/authServices";
import { RegisterData } from "@/types/Auth";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleRegister = async () => {
    if (!fullName || !email || !password || !conPassword) {
      Alert.alert("Please fill all fields...!");
      return;
    }
    if (password !== conPassword) {
      Alert.alert("Password do not match...!");
      return;
    }
    const userdata: RegisterData = {
      fullname: fullName,
      email: email,
      password: password,
      confirmPassword: conPassword,
    };

    try {
      showLoader();
      await registerUser(userdata);
      Alert.alert("Account created..!");
      router.replace("/login");
    } catch (e) {
      console.error(e);
      Alert.alert("Register fail..!");
    } finally {
      hideLoader();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="person-add-outline" size={32} color="#fff" />
          </View>
          <Text style={styles.brandTitle}>Get Started</Text>
          <Text style={styles.brandSubtitle}>Your journey to financial freedom begins here.</Text>
        </View>

        {/* Main Card Section */}
        <View style={styles.cardContainer}>
          
          {/* Full Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                placeholder="John Doe"
                placeholderTextColor="#94A3B8"
                style={styles.inputField}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

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
                keyboardType="email-address"
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
                placeholder="Create Password"
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

          {/* Confirm Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showConfirmPassword}
                style={[styles.inputField, { flex: 1 }]}
                value={conPassword}
                onChangeText={setConPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.registerButton, isLoading && { opacity: 0.7 }]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.buttonText}>Create Account</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
              </View>
            )}
          </TouchableOpacity>

          {/* Footer Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={styles.linkText}>Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
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
    fontWeight: "800",       
    color: "#ffffff",
    textTransform: "uppercase", 
    letterSpacing: 2.5,     
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  brandSubtitle: {
    color: "#e2e8f0",
    fontSize: 14,
    marginTop: 8,
    fontWeight: "500",
    letterSpacing: 0.5,
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
    marginBottom: 16, // Slightly tighter vertical spacing for register form
  },
  label: {
    color: "#1e293b", // Slate 800
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9", // Slate 100
    borderRadius: 16,
    height: 52, // Slightly shorter than login to fit more fields
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
  registerButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#0E21A0", // Deep Emerald
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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
    marginLeft: 4,
  },
});