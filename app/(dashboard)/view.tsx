
import { useLoader } from "@/hooks/useLoader";
import {
  deleteTransactions,
  getTransactionsByUser,
} from "@/services/cashService";
import { TransactionData } from "@/types/Cash";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ViewTransactions() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const unsubscribe = getTransactionsByUser((data) => {
      setTransactions(data.transArray);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Transaction",
      "This action cannot be undone. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              showLoader();
              await deleteTransactions(id);
            } catch (error) {
              Alert.alert("Error", "Failed to delete record.");
            } finally {
              hideLoader();
            }
          },
        },
      ]
    );
  };

  const handleUpdate = (item: TransactionData) => {
    const qs = new URLSearchParams({
      id: item.id || "",
      amount: item.amount?.toString() || "",
      description: item.description || "",
      category: item.categoryName || "",
    }).toString();

    router.push(`/update?${qs}`);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const renderItem = ({ item }: { item: TransactionData }) => {
    const isIncome = item.type === "income";

    return (
      <View style={styles.rowItem}>
        {/* Left: Color Strip Indicator */}
        <View
          style={[
            styles.colorStrip,
            { backgroundColor: isIncome ? "#10B981" : "#EF4444" }
          ]}
        />

        {/* Content Container */}
        <View style={styles.rowContent}>

          {/* Middle: Text Info */}
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {item.description || "No Description"}
            </Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.categoryName}</Text>
            </View>
          </View>

          {/* Right: Amount & Actions */}
          <View style={styles.rightContainer}>
            <Text
              style={[
                styles.amount,
                { color: isIncome ? "#10B981" : "#EF4444" },
              ]}
            >
              {isIncome ? "+" : "-"} {item.amount.toLocaleString()}
            </Text>

            {/* Compact Action Icons Row */}
            <View style={styles.miniActionRow}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => handleUpdate(item)}
              >
                <Ionicons name="pencil" size={16} color="#3B82F6" />
              </TouchableOpacity>

              <View style={styles.verticalDivider} />

              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => item.id && handleDelete(item.id)}
              >
                <Ionicons name="trash" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#172554" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />

      {/* --- NEW HEADER STYLE START --- */}
      <View style={styles.curvedHeader}>
        <SafeAreaView edges={['top', 'left', 'right']}>
          <View style={styles.headerContent}>

            {/* Title Section */}
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Ionicons name="wallet" size={20} color="#60A5FA" style={{ marginRight: 8 }} />
                <Text style={styles.topLabel}>OVERVIEW</Text>
              </View>
              <Text style={styles.mainTitle}>My Activity</Text>
            </View>

            {/* Glass Badge Section */}
            <View style={styles.glassBadge}>
              <Text style={styles.badgeNumber}>{transactions.length}</Text>
              <Text style={styles.badgeLabel}>Records</Text>
            </View>

          </View>
        </SafeAreaView>
      </View>
      {/* --- NEW HEADER STYLE END --- */}

      {/* List Area */}
      <View style={styles.listArea}>
        <FlatList
          data={transactions.slice(0, visibleCount)}
          keyExtractor={(item) => item.id || Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            visibleCount < transactions.length ? (
              <TouchableOpacity style={styles.loadMoreBtn} onPress={loadMore}>
                <Text style={styles.loadMoreText}>View Older Records</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ height: 40 }} />
            )
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="list-outline" size={50} color="#CBD5E1" />
              <Text style={styles.emptyText}>No records found</Text>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Structure
  mainContainer: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
  },

  // --- NEW HEADER STYLES ---
  curvedHeader: {
    backgroundColor: "#172554", // Midnight Blue
    paddingHorizontal: 24,
    paddingBottom: 40, // Extra padding for the curve effect
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    shadowColor: "#172554",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 10,
  },
  headerContent: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLabel: {
    color: "#60A5FA", // Light Blue
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  mainTitle: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  glassBadge: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  badgeNumber: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
  },
  badgeLabel: {
    color: "#93C5FD",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },

  // --- LIST & ROW STYLES (Unchanged) ---
  listArea: {
    flex: 1,
    marginTop: -10, // Slight overlap
  },
  listPadding: {
    padding: 20,
    paddingTop: 20,
  },
  rowItem: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F8FAFC",
  },
  colorStrip: {
    width: 6,
    height: "100%",
  },
  rowContent: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: "#F1F5F9",
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
  },
  miniActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  iconBtn: {
    padding: 8,
  },
  verticalDivider: {
    width: 1,
    height: 14,
    backgroundColor: "#CBD5E1",
  },
  loadMoreBtn: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  loadMoreText: {
    color: "#172554",
    fontWeight: "700",
    fontSize: 14,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 60,
    opacity: 0.6,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
});
