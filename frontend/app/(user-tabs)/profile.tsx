<<<<<<< HEAD
import {
  Wallet,
  MapPin,
  Ticket,
  Languages,
  HelpCircle,
  Bell,
  LogOut,
  ArrowLeft,
  MoreVertical,
  Edit2,
  ChevronRight
} from "lucide-react-native";
=======
import {
  ArrowLeft,
  MoreVertical,
  Pencil,
  Wallet,
  MapPin,
  Ticket,
  Globe,
  CircleHelp,
  Bell,
  Lock,
  CreditCard,
  LogOut,
  ChevronRight,
  Camera,
} from "lucide-react-native";
import { BlurView } from "expo-blur";
>>>>>>> feature/profile-modification
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Alert,

  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../store/AuthContext";

<<<<<<< HEAD
// Leveraging design tokens derived from userHomeData.ts
const COLORS = {
  primary: "#21100B",
  primaryContainer: "#4A4341",
  background: "#F2F2F2",
  white: "#FFFFFF",
  secondary: "#8C7D79",
  textPrimary: "#1A1818",
  textSecondary: "#8C7D79",
  danger: "#FF6B6B",
  cardBorder: "rgba(33, 16, 11, 0.05)",
  cardShadow: "#21100B",
=======
const THEME = {
  background: "#F6F4F0",
  surface: "#FFFFFF",
  cardBg: "#F1E8DF",
  primary: "#8C4B35",
  secondary: "#C7A27D",
  accent: "#C89766",
  text: "#1A1A1A",
  textMuted: "#8E8E93",
  white: "#FFFFFF",
  iconBox: "#EAD8C9",
  logoutBg: "#F2D8C9",
  logoutText: "#5C2C22",
  gold: "#D4BA94",
>>>>>>> feature/profile-modification
};

const ACCOUNT_ITEMS = [
  {
    id: "wallet",
    title: "My Wallet",
    icon: Wallet,
<<<<<<< HEAD
=======
    color: THEME.primary,
>>>>>>> feature/profile-modification
  },
  {
    id: "address",
    title: "My Address",
    icon: MapPin,
<<<<<<< HEAD
=======
    color: THEME.primary,
>>>>>>> feature/profile-modification
  },
  {
    id: "tickets",
    title: "My Tickets",
    icon: Ticket,
<<<<<<< HEAD
=======
    color: THEME.primary,
>>>>>>> feature/profile-modification
  },
];

const SETTINGS_ITEMS = [
  {
    id: "language",
    title: "App Language",
<<<<<<< HEAD
    icon: Languages,
=======
    icon: Globe,
    color: THEME.textMuted,
>>>>>>> feature/profile-modification
  },
  {
    id: "help",
    title: "Help Center",
<<<<<<< HEAD
    icon: HelpCircle,
=======
    icon: CircleHelp,
    color: THEME.textMuted,
>>>>>>> feature/profile-modification
  },
  {
    id: "notifications",
    title: "Notification Settings",
    icon: Bell,
<<<<<<< HEAD
=======
    color: THEME.textMuted,
  },
  {
    id: "privacy",
    title: "Privacy Preferences",
    icon: Lock,
    color: THEME.textMuted,
  },
  {
    id: "payment",
    title: "Payment Methods",
    icon: CreditCard,
    color: THEME.textMuted,
>>>>>>> feature/profile-modification
  },
];



export default function ProfileScreen() {
  const { user, logout, updateUser } = useAuth();
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/user-login");
        },
      },
    ]);
  };

  const handleMenuPress = (id: string) => {
    console.log("Menu pressed:", id);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

<<<<<<< HEAD
  {/* Hero Header matching UserHeader.tsx style */ }
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}
      >
        <View style={styles.headerSpacer} />

        <View style={styles.heroSection}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <ProfilePhotoPicker user={user} updateUser={updateUser} />
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{user?.name || "Vilash Kumar"}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {ACCOUNT_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleMenuPress(item.id)} activeOpacity={0.7} style={styles.cardWrapper}>
              <View style={styles.card}>
                <View style={styles.cardLeft}>
                  <View style={styles.cardIconBox}>
                    <item.icon size={22} color={COLORS.primaryContainer} strokeWidth={2} />
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
                <ChevronRight size={20} color={COLORS.textSecondary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {SETTINGS_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleMenuPress(item.id)} activeOpacity={0.7} style={styles.cardWrapper}>
              <View style={styles.card}>
                <View style={styles.cardLeft}>
                  <View style={styles.cardIconBox}>
                    <item.icon size={22} color={COLORS.primaryContainer} strokeWidth={2} />
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
                <ChevronRight size={20} color={COLORS.textSecondary} />
              </View>
=======
      {/* Header Overlays */}
      <View style={[styles.headerActions, { top: Math.max(insets.top, 10) }]}>
        <TouchableOpacity style={styles.headerBtn}>
          <ArrowLeft size={22} color={THEME.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <MoreVertical size={22} color={THEME.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <LinearGradient
            colors={["#3E1911", "#5C2C22", "#8C4B35", "#C89766"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          {/* Artistic metallic highlights */}
          <View style={styles.metallicReflect} />
          <View style={styles.decoCircle1} />
          <View style={styles.decoCircle2} />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.1)"]}
            style={StyleSheet.absoluteFill}
          />
        </View>

        {/* Profile Info Header (Premium Gradient Card) */}
        <View style={styles.profileHeaderCard}>
          <LinearGradient
            colors={["#5C2C22", "#8C4B35", "#C89766"]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={styles.cardContent}>
            <View style={styles.avatarContainer}>
              <ProfilePhotoPicker user={user} updateUser={updateUser} />
            </View>
            <View style={styles.userTextContainer}>
              <Text style={[styles.userName, { color: THEME.white }]}>{user?.name || "Henry Leo"}</Text>
            </View>
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.menuList}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuCard}
              onPress={() => handleMenuPress(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.menuCardLeft}>
                <View style={styles.iconBox}>
                  <item.icon size={22} color={THEME.primary} strokeWidth={2} />
                </View>
                <Text style={styles.menuCardText}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color={THEME.textMuted} />
            </TouchableOpacity>
          ))}

          {/* Settings Section Header */}
          <View style={styles.settingsHeader}>
            <Text style={styles.settingsHeaderText}>SETTINGS</Text>
          </View>

          {SETTINGS_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuCard}
              onPress={() => handleMenuPress(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.menuCardLeft}>
                <View style={styles.iconBox}>
                  <item.icon size={22} color={THEME.textMuted} strokeWidth={2} />
                </View>
                <Text style={styles.menuCardText}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color={THEME.textMuted} />
>>>>>>> feature/profile-modification
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
<<<<<<< HEAD
  <View style={styles.logoutSection}>
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
      <LogOut size={18} color={COLORS.danger} strokeWidth={2.5} />
      <Text style={styles.logoutText}>Sign Out</Text>
=======
        <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <LogOut size={20} color={THEME.logoutText} strokeWidth={2.5} />
          <Text style={styles.logoutBtnText}>Logout</Text>
>>>>>>> feature/profile-modification
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
  );
}

// ------------------------------------------------------------------
// Dedicated Photo Picker Component
// ------------------------------------------------------------------
const ProfilePhotoPicker = ({ user, updateUser }: { user: any, updateUser: any }) => {
  const pickImage = async () => {
    // 1. Request Media Library Permissions
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Permission Required",
          "We need camera roll permissions to let you choose a profile picture!"
        );
        return;
      }
    }

    // 2. Launch the Phone Photo Library
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [1, 1],
        quality: 0.8,
      });

      // 3. Update the Image
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const localUri = result.assets[0].uri;
        updateUser({ avatar: localUri });
      }
    } catch (error) {
      console.error("ImagePicker Error: ", error);
      Alert.alert("Error", "Something went wrong opening the photo library.");
    }
  };

  return (
    <View style={styles.avatarWrapper}>
<<<<<<< HEAD
      <View style={styles.avatarBorder}>
        {user?.avatar ? (
          <Avatar.Image
            size={72}
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
        ) : (
          <Avatar.Text
            size={72}
            label={user?.name ? user.name.charAt(0).toUpperCase() : "V"}
            style={[styles.avatar, { backgroundColor: "rgba(255,255,255,0.1)" }]}
            color={COLORS.white}
          />
        )}
      </View>
=======
      {user?.avatar ? (
        <Avatar.Image
          size={88}
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
      ) : (
          <Avatar.Text
            size={88}
            label={user?.name ? user.name.charAt(0).toUpperCase() : "H"}
            style={[styles.avatar, { backgroundColor: THEME.iconBox }]}
            color={THEME.primary}
          />
      )}
>>>>>>> feature/profile-modification
      <TouchableOpacity 
        style={styles.editAvatarBtn} 
        onPress={pickImage} 
        activeOpacity={0.8}
      >
<<<<<<< HEAD
<Edit2 size={12} color={COLORS.primary} strokeWidth={3} />
=======
        <Pencil size={14} color={THEME.primary} strokeWidth={2.5} />
>>>>>>> feature/profile-modification
      </TouchableOpacity >
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: COLORS.white,
  },
  header: {
    paddingBottom: 48,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: "hidden",
  },
  headerSpacer: {
    height: 24,
    width: "100%",
  },
  heroSection: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.white,
    letterSpacing: -1,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 16,
    gap: 16,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarBorder: {
    padding: 3,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.15)",
  },
  avatar: {
    backgroundColor: "transparent",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  userNameContainer: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  userEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "600",
    marginTop: 2,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.primary,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  card: {
=======
    backgroundColor: THEME.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerActions: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 60,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: THEME.text,
  },
  heroContainer: {
    height: 240,
    width: "100%",
    overflow: "hidden",
  },
  metallicReflect: {
    position: "absolute",
    top: -100,
    left: -50,
    width: "150%",
    height: "200%",
    backgroundColor: "rgba(212, 186, 148, 0.15)",
    transform: [{ rotate: "25deg" }],
  },
  decoCircle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: -50,
    right: -60,
  },
  decoCircle2: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(200, 151, 102, 0.2)",
    bottom: 20,
    left: -40,
  },
  profileHeaderCard: {
    marginTop: -60,
    marginHorizontal: 16,
    borderRadius: 24,
    marginBottom: 32,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.4)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  cardContent: {
>>>>>>> feature/profile-modification
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
<<<<<<< HEAD
    backgroundColor: COLORS.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  cardLeft: {
=======
    gap: 16,
  },
  avatarContainer: {
    // container for avatar
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    borderWidth: 4,
    borderColor: THEME.white,
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: THEME.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.cardBg,
  },
  userTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: "900",
    color: THEME.text,
    letterSpacing: -0.5,
  },
  designation: {
    fontSize: 13,
    fontWeight: "700",
    color: THEME.textMuted,
    marginTop: 1,
  },
  menuList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: THEME.surface,
    padding: 20,
    borderRadius: 20,
    shadowColor: THEME.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  menuCardLeft: {
>>>>>>> feature/profile-modification
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
<<<<<<< HEAD
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
=======
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: THEME.cardBg,
>>>>>>> feature/profile-modification
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(33, 16, 11, 0.04)",
  },
<<<<<<< HEAD
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
    letterSpacing: -0.2,
  },
  logoutSection: {
    marginTop: 32,
    paddingHorizontal: 20,
    alignItems: "center",
=======
  menuCardText: {
    fontSize: 16,
    fontWeight: "700",
    color: THEME.text,
  },
  settingsHeader: {
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 10,
  },
  settingsHeaderText: {
    fontSize: 11,
    fontWeight: "900",
    color: THEME.textMuted,
    letterSpacing: 2.5,
    textTransform: "uppercase",
  },
  logoutContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
>>>>>>> feature/profile-modification
  },
  logoutBtn: {
    width: "100%",
    height: 60,
    backgroundColor: THEME.logoutBg,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
<<<<<<< HEAD
    backgroundColor: "rgba(33, 16, 11, 0.04)",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 50,
    gap: 8,
    borderWidth: 1.5,
    borderColor: "rgba(33, 16, 11, 0.1)",
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.danger,
=======
    gap: 10,
    borderWidth: 1.5,
    borderColor: "rgba(140, 75, 53, 0.1)",
  },
  logoutBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: THEME.logoutText,
>>>>>>> feature/profile-modification
  },
});


