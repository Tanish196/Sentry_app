import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { COLORS } from "../../constants/userHomeData";

interface UserHeaderProps {
  user: any;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  user,
  searchQuery,
  setSearchQuery,
}) => (
  <LinearGradient
    colors={["#0B1326", "#1A1F3C", "#0F1729"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.header}
  >
    {/* Top Row: Greeting + Avatar */}
    <View style={styles.headerTop}>
      <View style={styles.leftSection}>
        <Text style={styles.greetingText}>Hello, Traveler! 👋</Text>
        <Text style={styles.userName}>{user?.name || "Explore India"}</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={46}
          source={{
            uri: user?.avatar || "https://avatar.iran.liara.run/public/3",
          }}
          style={styles.avatar}
        />
        <View style={styles.onlineDot} />
      </View>
    </View>

    {/* Location Row */}
    <TouchableOpacity style={styles.locationRow} activeOpacity={0.7}>
      <MaterialCommunityIcons
        name="map-marker"
        size={16}
        color={COLORS.primary}
      />
      <Text style={styles.locationText}>India • All Destinations</Text>
      <MaterialCommunityIcons
        name="chevron-down"
        size={16}
        color={COLORS.textMuted}
      />
    </TouchableOpacity>

    {/* Big Title */}
    <Text style={styles.headerTitle}>Where would you{"\n"}like to go?</Text>

    {/* Premium Search Bar */}
    <View style={styles.searchBarWrapper}>
      <View style={styles.searchBar}>
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color={COLORS.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations, attractions..."
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery("")}
            style={styles.clearButton}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={18}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>
        )}
        <View style={styles.filterButton}>
          <MaterialCommunityIcons
            name="tune-variant"
            size={18}
            color={COLORS.primary}
          />
        </View>
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  leftSection: {
    flex: 1,
  },
  greetingText: {
    fontSize: 13,
    color: "rgba(218, 226, 253, 0.6)",
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  userName: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 2,
    letterSpacing: -0.3,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    borderWidth: 2.5,
    borderColor: COLORS.primary,
  },
  onlineDot: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#62DCA3",
    borderWidth: 2,
    borderColor: "#0B1326",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: "500",
    flex: 1,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.white,
    lineHeight: 36,
    letterSpacing: -0.5,
    marginBottom: 20,
  },
  searchBarWrapper: {
    shadowColor: "#FF385C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222A3D",
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(92, 63, 65, 0.2)",
    gap: 8,
  },
  searchIcon: {
    marginRight: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },
  clearButton: {
    padding: 2,
  },
  filterButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255, 56, 92, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserHeader;
