
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart } from "react-native-chart-kit";
import { getStatsData } from "@/services/cashService";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function Stats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = getStatsData((data) => {
      setStats(data);
      setLoading(false);
    });
    return () => unsubscribe && unsubscribe();
  }, []);

  if (loading || !stats) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#3B82F6" size="large" />
      </View>
    );
  }

  const savingsRatio =
    stats.totalIncome > 0
      ? Math.max(
          0,
          Math.min(
            100,
            ((stats.totalIncome - stats.totalExpense) / stats.totalIncome) *
              100,
          ),
        )
      : 0;

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* 1. Minimal Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Analytics</Text>
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>THIS MONTH</Text>
            </View>
          </View>

          {/* 2. Hero Section: Savings Health */}
          <View style={styles.heroSection}>
            <View style={styles.ringContainer}>
              {/* Outer Ring Visual */}
              <View style={[
                  styles.outerRing, 
                  { borderColor: savingsRatio > 20 ? "#10B981" : "#EF4444" }
                ]}>
                <View style={styles.innerCircle}>
                  <Text style={styles.heroScore}>{savingsRatio.toFixed(0)}%</Text>
                  <Text style={styles.heroLabel}>SAVED</Text>
                </View>
              </View>
            </View>
            <Text style={styles.heroMessage}>
              {savingsRatio > 20 
                ? "Excellent! You're building wealth." 
                : "Watch your spending closely."}
            </Text>
          </View>

          {/* 3. Dark Chart Card */}
          <View style={styles.darkCard}>
            <Text style={styles.cardTitle}>Spending Split</Text>
            {stats.pieData.length > 0 ? (
              <PieChart
                data={stats.pieData}
                width={screenWidth - 40}
                height={200}
                chartConfig={{
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                accessor={"amount"}
                backgroundColor={"transparent"}
                paddingLeft={"0"}
                center={[10, 0]}
                absolute
                hasLegend={true}
              />
            ) : (
              <Text style={styles.emptyText}>No data available</Text>
            )}
          </View>

          {/* 4. The 2x2 Stats Grid */}
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.gridContainer}>
            
            {/* Daily Avg */}
            <View style={styles.gridItem}>
              <Ionicons name="calendar" size={24} color="#60A5FA" style={{marginBottom: 8}}/>
              <Text style={styles.gridValue}>
                {(stats.totalExpense / 30).toFixed(0)}
              </Text>
              <Text style={styles.gridLabel}>Daily Avg (LKR)</Text>
            </View>

            {/* Top Category */}
            <View style={styles.gridItem}>
              <Ionicons name="pricetag" size={24} color="#F472B6" style={{marginBottom: 8}}/>
              <Text style={[styles.gridValue, {fontSize: 16}]} numberOfLines={1}>
                {stats.topCategory || "-"}
              </Text>
              <Text style={styles.gridLabel}>Top Expense</Text>
            </View>

            {/* Income */}
            <View style={styles.gridItem}>
              <Ionicons name="arrow-down-circle" size={24} color="#34D399" style={{marginBottom: 8}}/>
              <Text style={styles.gridValue}>
                {(stats.totalIncome / 1000).toFixed(1)}k
              </Text>
              <Text style={styles.gridLabel}>Income (LKR)</Text>
            </View>

            {/* Total Spent */}
            <View style={styles.gridItem}>
              <Ionicons name="arrow-up-circle" size={24} color="#F87171" style={{marginBottom: 8}}/>
              <Text style={styles.gridValue}>
                {(stats.totalExpense / 1000).toFixed(1)}k
              </Text>
              <Text style={styles.gridLabel}>Spent (LKR)</Text>
            </View>

          </View>

          <View style={{height: 120}}/>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: "#0F172A" // Slate 900 (Dark Theme)
  },
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#0F172A"
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  dateBadge: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  dateText: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "700",
  },

  // Hero Ring
  heroSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  ringContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  outerRing: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    // Glow effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  innerCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#1E293B", // Darker circle inside
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroScore: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
  },
  heroLabel: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "700",
    marginTop: 2,
  },
  heroMessage: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "500",
  },

  // Charts
  darkCard: {
    backgroundColor: "#1E293B", // Slate 800
    margin: 20,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  emptyText: {
    color: "#6b0024",
    textAlign: 'center',
    marginVertical: 20,
  },

  // Grid
  sectionTitle: {
    marginLeft: 24,
    marginBottom: 12,
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: "48%", // 2 columns
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  gridValue: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  gridLabel: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});