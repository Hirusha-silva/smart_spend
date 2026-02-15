
import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { updateTransaction } from "@/services/cashService";
import { useLoader } from "@/hooks/useLoader";

export default function UpdateTransaction() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

   useEffect(() => {
    if (params.amount) setAmount(params.amount as string);
    if (params.description) setDescription(params.description as string);
  }, [params.id]);

  const [amount, setAmount] = useState(params.amount as string);
  const [description, setDescription] = useState(params.description as string);

  const handleUpdate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    try {
      showLoader();
      await updateTransaction(params.id as string, {
        amount: parseFloat(amount),
        description: description.trim(),
      });
      Alert.alert("Success", "Transaction updated successfully!");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update record.");
    } finally {
      hideLoader();
    }
  };

 
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      
      {/* Curved Blue Header Background */}
      <View style={styles.headerBackground}>
        <SafeAreaView edges={['top', 'left', 'right']}>
          <View style={styles.navHeader}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
            >
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Transaction</Text>
            <View style={{ width: 44 }} /> 
          </View>
        </SafeAreaView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          
          <Text style={styles.subtitle}>
            Update the details of your transaction below.
          </Text>

          {/* Amount Field */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Amount (LKR)</Text>
            <View style={styles.card}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name="wallet"
                  size={20}
                  color="#3B82F6"
                />
              </View>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* Description Field */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Description</Text>
            <View style={[styles.card, styles.textAreaCard]}>
              <View style={[styles.iconCircle, { marginTop: 0 }]}>
                 <Ionicons
                  name="document-text"
                  size={20}
                  color="#3B82F6"
                />
              </View>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                multiline
                placeholder="What was this for?"
                placeholderTextColor="#94A3B8"
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleUpdate}
              activeOpacity={0.8}
            >
              <Text style={styles.saveText}>Save Changes</Text>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="white"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => router.back()}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: "#F1F5F9" // Slate 100
  },
  
  // Header Styles
  headerBackground: {
    backgroundColor: "#172554", // Midnight Blue
    paddingBottom: 30,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    zIndex: 10,
    shadowColor: "#172554",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.5,
  },

  // Content
  scrollContent: {
    paddingTop: 24, // Push down slightly
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B", // Slate 500
    paddingHorizontal: 24,
    marginBottom: 24,
    textAlign: 'center',
  },

  // Inputs
  inputWrapper: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  label: {
    color: "#1E293B", // Slate 800
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0", // Slate 200
    // Shadow
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  textAreaCard: {
    alignItems: "flex-start",
    paddingVertical: 16,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#EFF6FF", // Light Blue bg for icon
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A", // Dark Slate
    fontWeight: "600",
    height: '100%',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 8, // Align text with icon
  },

  // Buttons
  buttonContainer: {
    paddingHorizontal: 24,
    marginTop: 20,
    paddingBottom: 40,
  },
  saveBtn: {
    flexDirection: "row",
    backgroundColor: "#172554", // Midnight Blue
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#172554",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  saveText: { 
    color: "white", 
    fontWeight: "700", 
    fontSize: 16 
  },
  cancelBtn: {
    marginTop: 16,
    height: 50,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#ffffff",
  },
  cancelText: {
    color: "#EF4444", // Red for cancel
    fontWeight: "600",
    fontSize: 15,
  },
});


