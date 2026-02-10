// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { auth } from "@/services/firebase";
// import { logoutUser } from "@/services/authServices";

// export default function Profile() {
//   const router = useRouter();
//   const user = auth.currentUser;

//   const handleLogout = async () => {
//     Alert.alert("Logout", "Are you sure you want to sign out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Logout",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             await logoutUser();
//             router.replace("/login");
//           } catch (e) {
//             Alert.alert("Error", "Failed to logout");
//           }
//         },
//       },
//     ]);
//   };

//   const ProfileOption = ({
//     icon,
//     title,
//     subtitle,
//     onPress,
//     color = "#1A4D2E",
//   }: any) => (
//     <TouchableOpacity style={styles.optionCard} onPress={onPress}>
//       <View style={[styles.iconContainer, { backgroundColor: color + "15" }]}>
//         <Ionicons name={icon} size={22} color={color} />
//       </View>
//       <View style={styles.optionTextContainer}>
//         <Text style={styles.optionTitle}>{title}</Text>
//         {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
//       </View>
//       <Ionicons name="chevron-forward" size={20} color="#A9AF94" />
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <View style={styles.avatarPlaceholder}>
//             <Text style={styles.avatarText}>
//               {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
//             </Text>
//           </View>
//           <Text style={styles.userName}>
//             {user?.displayName || "CashStasher"}
//           </Text>
//           <Text style={styles.userEmail}>{user?.email}</Text>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionLabel}>Account Settings</Text>
//           <ProfileOption
//             icon="person-outline"
//             title="Personal Information"
//             subtitle="Update your name and email"
//             onPress={() => {router.push("/updateprofile");}}
//           />
//           <ProfileOption
//             icon="notifications-outline"
//             title="Notifications"
//             subtitle="Manage alerts and reminders"
//             onPress={() => {}}
//           />
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionLabel}>Support</Text>
//           <ProfileOption
//             icon="help-circle-outline"
//             title="Help Center"
//             onPress={() => {}}
//           />
//           <ProfileOption
//             icon="shield-checkmark-outline"
//             title="Privacy Policy"
//             onPress={() => {}}
//           />
//         </View>

//         <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//           <Ionicons name="log-out-outline" size={22} color="#B91C1C" />
//           <Text style={styles.logoutText}>Sign Out</Text>
//         </TouchableOpacity>

//         <Text style={styles.versionText}>Smart Spend v1.0.0</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F7F1EE" },
//   header: {
//     alignItems: "center",
//     paddingVertical: 40,
//     backgroundColor: "#FFFFFF",
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//     shadowColor: "#1A4D2E",
//     shadowOpacity: 0.05,
//     shadowRadius: 15,
//     elevation: 2,
//   },
//   avatarPlaceholder: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#1A4D2E",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   avatarText: { color: "white", fontSize: 40, fontWeight: "800" },
//   userName: { fontSize: 22, fontWeight: "800", color: "#1A4D2E" },
//   userEmail: { fontSize: 14, color: "#739072", marginTop: 4 },
//   section: { paddingHorizontal: 25, marginTop: 30 },
//   sectionLabel: {
//     fontSize: 12,
//     fontWeight: "700",
//     color: "#739072",
//     textTransform: "uppercase",
//     letterSpacing: 1.5,
//     marginBottom: 15,
//     marginLeft: 5,
//   },
//   optionCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     padding: 15,
//     borderRadius: 20,
//     marginBottom: 12,
//   },
//   iconContainer: {
//     padding: 10,
//     borderRadius: 12,
//   },
//   optionTextContainer: { flex: 1, marginLeft: 15 },
//   optionTitle: { fontSize: 16, fontWeight: "700", color: "#2C3639" },
//   optionSubtitle: { fontSize: 12, color: "#A9AF94", marginTop: 2 },
//   logoutBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginHorizontal: 25,
//     marginTop: 40,
//     padding: 18,
//     borderRadius: 20,
//     backgroundColor: "#FEE2E2",
//   },
//   logoutText: {
//     color: "#B91C1C",
//     fontWeight: "700",
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   versionText: {
//     textAlign: "center",
//     color: "#A9AF94",
//     fontSize: 12,
//     marginTop: 30,
//     marginBottom: 100,
//   },
// });


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { auth } from "@/services/firebase";
import { logoutUser } from "@/services/authServices";

export default function Profile() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logoutUser();
            router.replace("/login");
          } catch (e) {
            Alert.alert("Error", "Failed to logout");
          }
        },
      },
    ]);
  };

  const ProfileOption = ({
    icon,
    title,
    subtitle,
    onPress,
    color = "#3B82F6", // Default Blue
  }: any) => (
    <TouchableOpacity 
      style={styles.optionCard} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + "15" }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      
      {/* 1. Curved Blue Header Background */}
      <View style={styles.headerBackground}>
        <SafeAreaView edges={['top', 'left', 'right']}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>My Profile</Text>
            <TouchableOpacity style={styles.editBtn} onPress={() => router.push("/updateprofile")}>
              <Ionicons name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* User Info Block */}
          <View style={styles.userInfoBlock}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
              </Text>
            </View>
            <Text style={styles.userName}>
              {user?.displayName || "CashStasher"}
            </Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACCOUNT SETTINGS</Text>
          <ProfileOption
            icon="person"
            title="Personal Information"
            subtitle="Update your name and email"
            onPress={() => {router.push("/updateprofile");}}
          />
          <ProfileOption
            icon="notifications"
            title="Notifications"
            subtitle="Manage alerts and reminders"
            onPress={() => {}}
            color="#F59E0B" // Amber
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SUPPORT & LEGAL</Text>
          <ProfileOption
            icon="help-buoy"
            title="Help Center"
            subtitle="Get support and answers"
            onPress={() => {}}
            color="#10B981" // Emerald
          />
          <ProfileOption
            icon="shield-checkmark"
            title="Privacy Policy"
            subtitle="Terms and conditions"
            onPress={() => {}}
            color="#6366F1" // Indigo
          />
        </View>

        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <View style={styles.logoutIconBox}>
            <Ionicons name="log-out" size={20} color="#EF4444" />
          </View>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Smart Spend v1.0.0</Text>
        
        {/* Bottom Spacer to clear nav bar */}
        <View style={{height: 120}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: "#F1F5F9" // Slate 100
  },
  
  // --- Header ---
  headerBackground: {
    backgroundColor: "#172554", // Midnight Blue
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#172554",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // User Info
  userInfoBlock: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.1)", // Glass effect
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  avatarText: { 
    color: "#ffffff", 
    fontSize: 36, 
    fontWeight: "800" 
  },
  userName: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: "#ffffff",
    marginBottom: 4,
  },
  userEmail: { 
    fontSize: 14, 
    color: "#93C5FD", // Light Blue
    fontWeight: "500",
  },

  // --- Content ---
  scrollContent: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  section: { 
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B", // Slate 500
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 12,
    marginLeft: 8,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    // Shadow
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 14,
    marginRight: 16,
  },
  optionTextContainer: { 
    flex: 1,
  },
  optionTitle: { 
    fontSize: 16, 
    fontWeight: "700", 
    color: "#1E293B" 
  },
  optionSubtitle: { 
    fontSize: 12, 
    color: "#94A3B8", 
    marginTop: 2,
    fontWeight: "500",
  },
  arrowContainer: {
    backgroundColor: "#F8FAFC",
    padding: 6,
    borderRadius: 8,
  },

  // Logout Button
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#FEE2E2",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  logoutIconBox: {
    marginRight: 10,
    backgroundColor: "#FEF2F2",
    padding: 6,
    borderRadius: 8,
  },
  logoutText: {
    color: "#EF4444", // Red
    fontWeight: "700",
    fontSize: 16,
  },
  versionText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 30,
    marginBottom: 10,
  },
});