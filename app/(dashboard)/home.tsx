// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { auth } from "@/services/firebase";
// import { Totals, TransactionData } from "@/types/Cash";
// import { getTransactionsByUser } from "@/services/cashService";

// export default function Dashboard() {
//   const [transactions, setTransactions] = useState<TransactionData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [totals, setTotals] = useState<Totals>({
//     balance: 0,
//     income: 0,
//     expense: 0,
//   });

//   useEffect(() => {
//     const unsubscribe = getTransactionsByUser((data) => {
//       setTransactions(data.transArray);
//       setTotals({
//         income: data.income,
//         expense: data.expense,
//         balance: data.income - data.expense,
//       });
//       setLoading(false);
//     });

//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#1A4D2E" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 100 }}
//       >
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.greeting}>Good Morning,</Text>
//             <Text style={styles.userName}>
//               {auth.currentUser?.displayName || "CashStasher"}
//             </Text>
//           </View>
//           <TouchableOpacity style={styles.notifBtn}>
//             <Ionicons name="notifications-outline" size={24} color="#1A4D2E" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.balanceCard}>
//           <Text style={styles.balanceLabel}>Total Balance</Text>
//           <Text style={styles.balanceAmount}>
//             LKR{" "}
//             {totals.balance.toLocaleString(undefined, {
//               minimumFractionDigits: 2,
//             })}
//           </Text>
//           <View style={styles.cardStats}>
//             <View style={styles.statRow}>
//               <Ionicons name="arrow-down-circle" size={20} color="#D2E3C8" />
//               <Text style={styles.statText}>
//                 Income: LKR {totals.income.toLocaleString()}
//               </Text>
//             </View>
//             <View style={styles.statRow}>
//               <Ionicons name="arrow-up-circle" size={20} color="#F9EFDB" />
//               <Text style={styles.statText}>
//                 Spent: LKR {totals.expense.toLocaleString()}
//               </Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Recent Activity</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeAll}>See All</Text>
//           </TouchableOpacity>
//         </View>

//         {transactions.length === 0 ? (
//           <View style={styles.emptyState}>
//             <Text style={styles.emptyText}>No transactions recorded yet.</Text>
//           </View>
//         ) : (
//           transactions.slice(0, 3).map((item) => {
//             const isIncome = item.type === "income";
//             return (
//               <View
//                 key={item.id}
//                 style={[
//                   styles.transactionItem,
//                   {
//                     borderColor: isIncome ? "#D2E3C8" : "#F87171",
//                     borderWidth: 1.5,
//                   },
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.iconBox,
//                     { backgroundColor: isIncome ? "#D2E3C8" : "#FEE2E2" },
//                   ]}
//                 >
//                   <Ionicons
//                     name={isIncome ? "cash-outline" : "cart-outline"}
//                     size={22}
//                     color="#1A4D2E"
//                   />
//                 </View>
//                 <View style={styles.transDetails}>
//                   <Text style={styles.transTitle}>
//                     {item.description || item.categoryName}
//                   </Text>
//                   <Text style={styles.transCat}>{item.categoryName}</Text>
//                 </View>
//                 <Text
//                   style={[
//                     styles.transPrice,
//                     { color: isIncome ? "#4F6F52" : "#B91C1C" },
//                   ]}
//                 >
//                   {isIncome ? "+" : "-"} {item.amount.toLocaleString()}
//                 </Text>
//               </View>
//             );
//           })
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F7F1EE" },
//   loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 25,
//   },
//   greeting: { fontSize: 14, color: "#739072", fontWeight: "500" },
//   userName: { fontSize: 24, color: "#1A4D2E", fontWeight: "800" },
//   notifBtn: { backgroundColor: "#fff", padding: 10, borderRadius: 15 },
//   balanceCard: {
//     backgroundColor: "#1A4D2E",
//     margin: 25,
//     padding: 30,
//     borderRadius: 40,
//     shadowColor: "#1A4D2E",
//     shadowOpacity: 0.3,
//     shadowRadius: 15,
//     elevation: 10,
//   },
//   balanceLabel: {
//     color: "#D2E3C8",
//     fontSize: 12,
//     textTransform: "uppercase",
//     letterSpacing: 1,
//     fontWeight: "600",
//   },
//   balanceAmount: {
//     color: "#fff",
//     fontSize: 30,
//     fontWeight: "800",
//     marginTop: 10,
//   },
//   cardStats: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 25,
//     borderTopWidth: 0.5,
//     borderTopColor: "rgba(210, 227, 200, 0.3)",
//     paddingTop: 20,
//   },
//   statRow: { flexDirection: "row", alignItems: "center" },
//   statText: {
//     color: "#D2E3C8",
//     marginLeft: 8,
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 25,
//     marginTop: 10,
//     marginBottom: 15,
//   },
//   sectionTitle: { fontSize: 18, fontWeight: "700", color: "#1A4D2E" },
//   seeAll: { color: "#739072", fontWeight: "600" },
//   transactionItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     marginHorizontal: 25,
//     marginBottom: 12,
//     padding: 15,
//     borderRadius: 25,
//   },
//   iconBox: { padding: 12, borderRadius: 18 },
//   transDetails: { flex: 1, marginLeft: 15 },
//   transTitle: { fontSize: 16, fontWeight: "600", color: "#2C3639" },
//   transCat: { fontSize: 12, color: "#739072", marginTop: 2 },
//   transPrice: { fontSize: 16, fontWeight: "700" },
//   emptyState: { padding: 40, alignItems: "center" },
//   emptyText: { color: "#739072", fontSize: 14 },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "@/services/firebase";
import { Totals, TransactionData } from "@/types/Cash";
import { getTransactionsByUser } from "@/services/cashService";

const { width } = Dimensions.get("window");

export default function Dashboard() {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totals, setTotals] = useState<Totals>({
    balance: 0,
    income: 0,
    expense: 0,
  });

  useEffect(() => {
    const unsubscribe = getTransactionsByUser((data) => {
      setTransactions(data.transArray);
      setTotals({
        income: data.income,
        expense: data.expense,
        balance: data.income - data.expense,
      });
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#172554" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      
      {/* 1. TOP SECTION (Dark Theme Integrated) */}
      <View style={styles.topSection}>
        <SafeAreaView edges={['top', 'left', 'right']}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {auth.currentUser?.displayName?.[0] || "C"}
                </Text>
              </View>
              <View>
                <Text style={styles.greeting}>Welcome back,</Text>
                <Text style={styles.userName}>
                  {auth.currentUser?.displayName || "CashStasher"}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Ionicons name="notifications" size={20} color="#fff" />
              <View style={styles.redDot} />
            </TouchableOpacity>
          </View>

          {/* Balance Display (Integrated) */}
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>
              <Text style={styles.currency}>LKR</Text>{" "}
              {totals.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Text>
          </View>

          {/* Stats Row (Glass Effect) */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <View style={[styles.iconCircle, { backgroundColor: "rgba(34, 197, 94, 0.2)" }]}>
                <Ionicons name="arrow-down" size={18} color="#4ade80" />
              </View>
              <View>
                <Text style={styles.statLabel}>Income</Text>
                <Text style={styles.statValue}>+{totals.income.toLocaleString()}</Text>
              </View>
            </View>
            
            <View style={styles.dividerVertical} />

            <View style={styles.statBox}>
              <View style={[styles.iconCircle, { backgroundColor: "rgba(239, 68, 68, 0.2)" }]}>
                <Ionicons name="arrow-up" size={18} color="#f87171" />
              </View>
              <View>
                <Text style={styles.statLabel}>Expense</Text>
                <Text style={styles.statValue}>-{totals.expense.toLocaleString()}</Text>
              </View>
            </View>
          </View>

        </SafeAreaView>
      </View>

      {/* 2. BOTTOM SECTION (White Sheet) */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {transactions.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconBg}>
                <Ionicons name="swap-vertical" size={30} color="#94A3B8" />
              </View>
              <Text style={styles.emptyText}>No transactions yet</Text>
            </View>
          ) : (
            transactions.slice(0, 3).map((item, index) => {
              const isIncome = item.type === "income";
              return (
                <View key={item.id}>
                  <View style={styles.transactionRow}>
                    
                    {/* Icon - Squircle Shape */}
                    <View style={[styles.transIcon, { backgroundColor: isIncome ? "#F0FDF4" : "#FEF2F2" }]}>
                      <Ionicons 
                        name={isIncome ? "add" : "remove"} 
                        size={20} 
                        color={isIncome ? "#16A34A" : "#DC2626"} 
                      />
                    </View>

                    {/* Text Info */}
                    <View style={styles.transContent}>
                      <Text style={styles.transTitle}>{item.description || item.categoryName}</Text>
                      <Text style={styles.transDate}>{item.categoryName}</Text>
                    </View>

                    {/* Amount */}
                    <Text style={[styles.transAmount, { color: isIncome ? "#16A34A" : "#DC2626" }]}>
                      {isIncome ? "+" : "-"} {item.amount.toLocaleString()}
                    </Text>

                  </View>
                  {/* Subtle Divider Line (except for last item) */}
                  {index < 2 && <View style={styles.rowDivider} />}
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#172554" 
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#172554", // Overall background fits top
  },
  
  // --- Top Section Styles ---
  topSection: {
    backgroundColor: "#172554", // Midnight Blue
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)"
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700"
  },
  greeting: { 
    fontSize: 13, 
    color: "#93c5fd", 
    fontWeight: "500" 
  },
  userName: { 
    fontSize: 18, 
    color: "#fff", 
    fontWeight: "700" 
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: 'center',
    alignItems: 'center',
  },
  redDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#172554'
  },

  // Balance
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  balanceLabel: {
    color: "#93c5fd",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "800",
  },
  currency: {
    fontSize: 24,
    color: "#60a5fa", // Lighter blue for currency symbol
    fontWeight: "600",
  },

  // Stats Row
  statsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  statBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerVertical: {
    width: 1,
    height: '100%',
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statLabel: {
    color: "#93c5fd",
    fontSize: 12,
    marginBottom: 2,
  },
  statValue: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  // --- Bottom Sheet Styles ---
  bottomSheet: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3b82f6",
  },

  // List Styles (Clean Minimalist)
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  transIcon: {
    width: 48,
    height: 48,
    borderRadius: 16, // Squircle
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transContent: {
    flex: 1,
  },
  transTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  transDate: {
    fontSize: 13,
    color: "#64748B",
  },
  transAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginLeft: 64, // Start divider after icon
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyIconBg: {
    width: 60,
    height: 60,
    backgroundColor: "#E2E8F0",
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "500",
  },
});
