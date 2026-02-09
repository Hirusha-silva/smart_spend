
import { useLoader } from "@/hooks/useLoader";
import { addTransaction, getCurrentBalance } from "@/services/cashService";
import { auth } from "@/services/firebase";
import { TransactionData } from "@/types/Cash";
import { Ionicons } from "@expo/vector-icons";
import { serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";

const CATEGORIES = [
  { id: "inc-1", name: "Salary", icon: "cash-outline", type: "income" },
  { id: "inc-2", name: "Investments", icon: "trending-up-outline", type: "income" },
  { id: "inc-3", name: "Gifts", icon: "gift-outline", type: "income" },
  { id: "inc-4", name: "Refunds", icon: "refresh-circle-outline", type: "income" },
  { id: "inc-5", name: "Scholarship", icon: "school-outline", type: "income" },
  { id: "inc-6", name: "Freelance", icon: "laptop-outline", type: "income" },
  { id: "exp-1", name: "Food & Drinks", icon: "fast-food-outline", type: "expense" },
  { id: "exp-2", name: "Transport", icon: "bus-outline", type: "expense" },
  { id: "exp-3", name: "Shopping", icon: "cart-outline", type: "expense" },
  { id: "exp-4", name: "Rent/Bills", icon: "home-outline", type: "expense" },
  { id: "exp-5", name: "Entertainment", icon: "film-outline", type: "expense" },
  { id: "exp-6", name: "Education", icon: "book-outline", type: "expense" },
];

export default function AddTransaction() {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCat, setSelectedCat] = useState("exp-1");
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMsg] = useState("");

  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleSave = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "You must be logged in to save transactions");
      return;
    }

    const numericAmount = parseFloat(amount);
    const transactionData: TransactionData = {
      userId: user.uid,
      type: type,
      amount: numericAmount,
      description: description.trim(),
      categoryId: selectedCat,
      categoryName: CATEGORIES.find((c) => c.id === selectedCat)?.name || "General",
      createdAt: serverTimestamp(),
    };

    try {
      showLoader();
      const currentBalance = await getCurrentBalance();
      await addTransaction(transactionData);

      if (type === "expense") {
        const newBalance = currentBalance - numericAmount;
        if (newBalance <= 1000) {
          Toast.show(`⚠️ Low Balance: Rs. ${newBalance.toFixed(2)}`, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: "#B91C1C",
          });
        }
      }

      Alert.alert("Success", "Transaction added successfully!");
      setAmount("");
      setDescription("");
    } catch (e) {
      Alert.alert("Error", "Failed to save transaction.");
    } finally {
      hideLoader();
    }
  };

  return (
    <RootSiblingParent>
      <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" />

        {/* 1. TOP BLUE SECTION */}
        <SafeAreaView style={styles.topSection}>
          <Text style={styles.pageTitle}>New Transaction</Text>
          
          {/* Amount Input Block */}
          <View style={styles.amountBlock}>
            <Text style={styles.currencySymbol}>LKR</Text>
            <TextInput
              style={styles.amountInput}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={amount}
              onChangeText={setAmount}
              autoFocus={false}
            />
          </View>

          {/* Type Toggle Switch */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              onPress={() => { setType("expense"); setSelectedCat("exp-1"); }}
              style={[styles.toggleBtn, type === "expense" && styles.activeToggle]}
              activeOpacity={0.8}
            >
              <Text style={[styles.toggleText, type === "expense" && styles.activeToggleText]}>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { setType("income"); setSelectedCat("inc-1"); }}
              style={[styles.toggleBtn, type === "income" && styles.activeToggle]}
              activeOpacity={0.8}
            >
              <Text style={[styles.toggleText, type === "income" && styles.activeToggleText]}>
                Income
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* 2. BOTTOM WHITE SHEET */}
        <View style={styles.bottomSheet}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {showBanner && (
              <View style={styles.bannerContainer}>
                <Ionicons name="warning" size={20} color="white" />
                <Text style={styles.bannerText}>{bannerMsg}</Text>
                <TouchableOpacity onPress={() => setShowBanner(false)}>
                  <Ionicons name="close" size={20} color="white" />
                </TouchableOpacity>
              </View>
            )}

            {/* Description Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>DESCRIPTION</Text>
              <View style={styles.filledInput}>
                <Ionicons name="create-outline" size={20} color="#64748B" style={{marginRight: 10}}/>
                <TextInput
                  style={styles.textInput}
                  placeholder="What is this transaction for?"
                  placeholderTextColor="#94A3B8"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
            </View>

            {/* Category Grid */}
            <Text style={styles.sectionTitle}>SELECT CATEGORY</Text>
            <View style={styles.catGrid}>
              {CATEGORIES.filter((c) => c.type === type).map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCat(cat.id)}
                  style={[styles.catItem, selectedCat === cat.id && styles.catActive]}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.iconCircle,
                    selectedCat === cat.id && { backgroundColor: "rgba(255,255,255,0.2)" }
                  ]}>
                    <Ionicons
                      name={cat.icon as any}
                      size={20}
                      color={selectedCat === cat.id ? "white" : "#172554"}
                    />
                  </View>
                  <Text style={[styles.catText, selectedCat === cat.id && { color: "white" }]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Save Button */}
            <TouchableOpacity
              disabled={isLoading}
              onPress={handleSave}
              style={[
                styles.saveBtn,
                { backgroundColor: type === "income" ? "#10B981" : "#EF4444" },
                isLoading && { opacity: 0.7 },
              ]}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.saveBtnText}>
                    Save {type === "income" ? "Income" : "Expense"}
                  </Text>
                  <Ionicons name="checkmark-circle" size={20} color="white" style={{marginLeft: 8}}/>
                </View>
              )}
            </TouchableOpacity>

            {/* FIX IS HERE: 
               Increased height from 40 to 120. 
               This pushes the content up above your bottom tab bar.
            */}
            <View style={{ height: 120 }} />
          </ScrollView>
        </View>
      </View>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: "#172554", 
  },
  topSection: {
    height: "35%", 
    alignItems: 'center',
    paddingTop: 10,
  },
  pageTitle: {
    color: "#93C5FD", 
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  amountBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  currencySymbol: {
    color: "#64748B", 
    fontSize: 24,
    fontWeight: "700",
    marginRight: 8,
    marginTop: 8,
  },
  amountInput: {
    color: "#ffffff",
    fontSize: 48,
    fontWeight: "800",
    minWidth: 100,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 4,
    width: "80%",
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 16,
  },
  activeToggle: { 
    backgroundColor: "#ffffff",
  },
  toggleText: { 
    fontWeight: "600", 
    color: "#93C5FD",
    fontSize: 14,
  },
  activeToggleText: { 
    color: "#172554", 
    fontWeight: "700",
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: "#F8FAFC", 
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
  },
  scrollContent: {
    padding: 24,
    paddingTop: 30,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  filledInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 12,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  catGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  catItem: {
    width: "31%", 
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  catActive: { 
    backgroundColor: "#172554", 
    borderColor: "#172554",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  catText: { 
    fontSize: 11,
    fontWeight: "600", 
    color: "#1E293B",
    textAlign: 'center',
  },
  saveBtn: {
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnText: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  bannerContainer: {
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  bannerText: {
    color: "white",
    flex: 1,
    marginHorizontal: 10,
    fontWeight: "600",
    fontSize: 13,
  },
});
