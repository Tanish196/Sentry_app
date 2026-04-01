import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Avatar, Card, Chip, FAB, Searchbar, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const SCREEN_WIDTH = Dimensions.get("window").width;

const COLORS = {
  primary: "#21100B",
  accent: "#38302E",
  secondary: "#8C7D79",
  error: "#D93636",
  success: "#10B981",
  warning: "#F59E0B",
  background: "#F5F1EE",
  surface: "#FFFFFF",
  text: "#1A1818",
  textLight: "#4A4341",
  textMuted: "#8C7D79",
  white: "#FFFFFF",
  border: "#EDE7E3",
};

const USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "active",
    avatar: "https://avatar.iran.liara.run/public/1",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    avatar: "https://avatar.iran.liara.run/public/2",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@example.com",
    role: "User",
    status: "inactive",
    avatar: "https://avatar.iran.liara.run/public/3",
  },
  {
    id: "4",
    name: "Sarah Connor",
    email: "sarah@example.com",
    role: "User",
    status: "active",
    avatar: "https://avatar.iran.liara.run/public/4",
  },
  {
    id: "5",
    name: "Tom Hardy",
    email: "tom@example.com",
    role: "Admin",
    status: "active",
    avatar: "https://avatar.iran.liara.run/public/5",
  },
  {
    id: "6",
    name: "Emily Brown",
    email: "emily@example.com",
    role: "User",
    status: "pending",
    avatar: "https://avatar.iran.liara.run/public/6",
  },
];

const FILTERS = ["All", "Active", "Inactive", "Pending"];

export default function UsersScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const insets = useSafeAreaInsets();

  const filteredUsers = USERS.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" ||
      user.status.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return COLORS.success;
      case "inactive":
        return COLORS.error;
      case "pending":
        return COLORS.warning;
      default:
        return COLORS.textLight;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 8 }]}>
        <Text style={styles.headerTitle}>User Management</Text>
        <Text style={styles.headerSubtitle}>{USERS.length} total users</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search users..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor={COLORS.textMuted}
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {FILTERS.map((filter) => (
          <Chip
            key={filter}
            selected={selectedFilter === filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.filterChipSelected,
            ]}
            textStyle={[
              styles.filterText,
              selectedFilter === filter && styles.filterTextSelected,
            ]}
          >
            {filter}
          </Chip>
        ))}
      </ScrollView>

      {/* User List */}
      <ScrollView style={styles.userList} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {filteredUsers.map((user) => (
          <Card key={user.id} style={styles.userCard}>
            <Card.Content style={styles.userContent}>
              <View style={styles.avatarRing}>
                <Avatar.Image size={48} source={{ uri: user.avatar }} />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <View style={styles.userMeta}>
                  <View style={styles.roleTag}>
                    <Text style={styles.roleText}>{user.role}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(user.status) },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(user.status) },
                    ]}
                  >
                    {user.status}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={24}
                  color={COLORS.textMuted}
                />
              </TouchableOpacity>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {/* FAB */}
      <FAB
        icon="account-plus"
        style={styles.fab}
        color={COLORS.white}
        onPress={() => console.log("Add user")}
      />
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    borderRadius: 18,
    elevation: 3,
    backgroundColor: COLORS.white,
    shadowColor: "#21100B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  searchInput: {
    fontSize: 14,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  filterChip: {
    backgroundColor: COLORS.white,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextSelected: {
    color: COLORS.white,
  },
  userList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userCard: {
    marginBottom: 12,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#21100B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  userContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarRing: {
    padding: 2,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  userInfo: {
    flex: 1,
    marginLeft: 14,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: -0.2,
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  userMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 8,
  },
  roleTag: {
    backgroundColor: `${COLORS.primary}12`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  roleText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  moreButton: {
    padding: 8,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 100,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});
