import {
  Bell,
  Mail,
  AlertTriangle,
  Languages,
  Trash2,
  Database,
  ChevronRight,
  LogOut,
} from "lucide-react-native";
import { router } from "expo-router";
import { useAuth } from "../../store/AuthContext";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Divider, Switch, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const COLORS = {
  primary: "#21100B",
  accent: "#38302E",
  secondary: "#8C7D79",
  error: "#D93636",
  success: "#10B981",
  background: "#F5F1EE",
  surface: "#FFFFFF",
  text: "#1A1818",
  textLight: "#4A4341",
  textMuted: "#8C7D79",
  white: "#FFFFFF",
  border: "#EDE7E3",
};

const GENERAL_SETTINGS = [
  {
    id: "notifications",
    title: "Push Notifications",
    icon: Bell,
    color: "#F59E0B",
    type: "switch",
  },
  {
    id: "email",
    title: "Email Notifications",
    icon: Mail,
    color: "#10B981",
    type: "switch",
  },
  {
    id: "alerts",
    title: "SOS Alerts",
    icon: AlertTriangle,
    color: "#EF4444",
    type: "switch",
  },
  {
    id: "language",
    title: "Language",
    icon: Languages,
    color: "#8B5CF6",
    type: "navigate",
    value: "English",
  },
];

export default function SettingsScreen() {
  const { logout } = useAuth();
  const [switches, setSwitches] = useState<Record<string, boolean>>({
    notifications: true,
    email: true,
    alerts: true,
  });
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout from admin panel?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/admin-login");
        },
      },
    ]);
  };

  const toggleSwitch = (id: string) => {
    setSwitches({ ...switches, [id]: !switches[id] });
  };

  const renderSettingItem = (item: any, index: number, isLast: boolean) => (
    <React.Fragment key={item.id}>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() =>
          item.type === "navigate" && console.log("Navigate to", item.id)
        }
        disabled={item.type === "switch"}
        activeOpacity={0.7}
      >
        <View
          style={[styles.settingIcon, { backgroundColor: `${item.color}12` }]}
        >
          <item.icon
            size={20}
            color={item.color}
            strokeWidth={2}
          />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
        </View>
        {item.type === "switch" ? (
          <Switch
            value={switches[item.id]}
            onValueChange={() => toggleSwitch(item.id)}
            color={COLORS.primary}
          />
        ) : (
          <ChevronRight
            size={20}
            color={COLORS.textMuted}
          />
        )}
      </TouchableOpacity>
      {!isLast && <Divider style={styles.divider} />}
    </React.Fragment>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 8 }]}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>
            Manage your admin preferences
          </Text>
        </View>

        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <Card style={styles.settingsCard}>
            {GENERAL_SETTINGS.map((item, index) =>
              renderSettingItem(
                item,
                index,
                index === GENERAL_SETTINGS.length - 1,
              ),
            )}
          </Card>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: COLORS.error }]}>
            Danger Zone
          </Text>
          <Card style={[styles.settingsCard, styles.dangerCard]}>
            <TouchableOpacity
              style={styles.dangerItem}
              onPress={() =>
                Alert.alert(
                  "Clear Cache",
                  "This will clear all cached data. Continue?",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Clear", style: "destructive" },
                  ],
                )
              }
              activeOpacity={0.7}
            >
              <View
                style={[styles.settingIcon, { backgroundColor: "#FEE2E2" }]}
              >
                <Trash2
                  size={20}
                  color={COLORS.error}
                  strokeWidth={2}
                />
              </View>
              <Text style={styles.dangerText}>Clear System Cache</Text>
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity
              style={styles.dangerItem}
              onPress={() =>
                Alert.alert(
                  "Reset Database",
                  "⚠️ This action cannot be undone! Are you sure?",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Reset", style: "destructive" },
                  ],
                )
              }
              activeOpacity={0.7}
            >
              <View
                style={[styles.settingIcon, { backgroundColor: "#FEE2E2" }]}
              >
                <Database
                  size={20}
                  color={COLORS.error}
                  strokeWidth={2}
                />
              </View>
              <Text style={styles.dangerText}>Reset Database</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <LogOut
              size={20}
              color={COLORS.error}
              strokeWidth={2.5}
            />
            <Text style={styles.logoutText}>Logout from Admin Panel</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>SentryApp Admin v1.0.0</Text>
          <Text style={styles.appCopyright}>
            © 2026 SentryApp. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  settingsCard: {
    borderRadius: 20,
    elevation: 3,
    overflow: "hidden",
    shadowColor: "#21100B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  settingIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  settingValue: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  divider: {
    backgroundColor: COLORS.border,
  },
  dangerCard: {
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  dangerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  dangerText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.error,
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: 32,
  },
  appVersion: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textMuted,
  },
  appCopyright: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
    paddingVertical: 16,
    borderRadius: 18,
    gap: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.error,
  },
});
