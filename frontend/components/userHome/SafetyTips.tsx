import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { getCurrentLocation } from "../../services/maps/locationService";

const TIPS = [
  { icon: "map-marker-radius", text: "Share live location with family" },
  { icon: "phone-check", text: "Keep emergency contacts saved offline" },
  { icon: "shield-home", text: "Note local police station address" },
  { icon: "card-account-details", text: "Keep copy of ID documents separately" },
  { icon: "earth", text: "Store embassy contact for abroad travel" },
];

const SafetyTips: React.FC = () => {
  const [sharing, setSharing] = useState(false);

  const handleShareLocation = async () => {
    try {
      setSharing(true);
      const location = await getCurrentLocation();

      if (!location) {
        Alert.alert(
          "Location Unavailable",
          "Unable to get your current location. Please enable location services.",
          [{ text: "OK" }]
        );
        setSharing(false);
        return;
      }

      const { latitude, longitude } = location;
      const mapsUrl = Platform.select({
        ios: `maps:0,0?q=${latitude},${longitude}`,
        android: `geo:0,0?q=${latitude},${longitude}`,
      });
      const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

      Alert.alert(
        "Share Your Location",
        "Choose how you want to share your location:",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Share Link",
            onPress: async () => {
              try {
                await Share.share({
                  message: `📍 I'm sharing my live location!\n\nView on map: ${googleMapsUrl}`,
                  title: "My Current Location",
                });
              } catch (error) {}
            },
          },
          {
            text: "Open in Maps",
            onPress: async () => {
              try {
                const supported = await Linking.canOpenURL(mapsUrl!);
                await Linking.openURL(supported ? mapsUrl! : googleMapsUrl);
              } catch (error) {
                Alert.alert("Error", "Unable to open maps application");
              }
            },
          },
        ]
      );
      setSharing(false);
    } catch (error) {
      Alert.alert("Error", "Failed to share location. Please try again.");
      setSharing(false);
    }
  };

  return (
    <View style={styles.section}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Safety Tips</Text>
          <Text style={styles.sectionSubtitle}>Stay safe while traveling</Text>
        </View>
      </View>

      {/* Safety Card */}
      <View style={styles.safetyCard}>
        {/* Header Banner */}
        <LinearGradient
          colors={["#FF385C", "#CC1A3A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.cardBanner}
        >
          <View style={styles.bannerLeft}>
            <View style={styles.shieldIcon}>
              <MaterialCommunityIcons name="shield-check" size={24} color="#FF385C" />
            </View>
            <View>
              <Text style={styles.bannerTitle}>Travel Safety</Text>
              <Text style={styles.bannerSub}>5 essential tips</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color="rgba(255,255,255,0.6)" />
        </LinearGradient>

        {/* Tips List */}
        <View style={styles.tipsList}>
          {TIPS.map((tip, index) => (
            <View key={index} style={styles.tipRow}>
              <View style={styles.tipIconWrap}>
                <MaterialCommunityIcons name={tip.icon as any} size={16} color="#62DCA3" />
              </View>
              <Text style={styles.tipText}>{tip.text}</Text>
            </View>
          ))}
        </View>

        {/* Share Location Button */}
        <TouchableOpacity
          style={[styles.shareBtn, sharing && styles.shareBtnDisabled]}
          onPress={handleShareLocation}
          disabled={sharing}
          activeOpacity={0.85}
        >
          {sharing ? (
            <>
              <ActivityIndicator size="small" color="#FF385C" />
              <Text style={styles.shareBtnText}>Getting Location...</Text>
            </>
          ) : (
            <>
              <MaterialCommunityIcons name="share-variant" size={18} color="#FF385C" />
              <Text style={styles.shareBtnText}>Share My Location</Text>
              <MaterialCommunityIcons name="arrow-right" size={16} color="#FF385C" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#DAE2FD",
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#8A9BB8",
    fontWeight: "500",
    marginTop: 2,
  },
  safetyCard: {
    backgroundColor: "#171F33",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(92, 63, 65, 0.15)",
  },
  cardBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  bannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  shieldIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  bannerSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginTop: 1,
  },
  tipsList: {
    padding: 16,
    gap: 12,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  tipIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "rgba(98, 220, 163, 0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  tipText: {
    fontSize: 13,
    color: "#DAE2FD",
    fontWeight: "500",
    flex: 1,
    lineHeight: 18,
  },
  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 13,
    borderRadius: 50,
    backgroundColor: "rgba(255, 56, 92, 0.12)",
    borderWidth: 1.5,
    borderColor: "rgba(255, 56, 92, 0.3)",
  },
  shareBtnDisabled: {
    opacity: 0.6,
  },
  shareBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF385C",
  },
});

export default SafetyTips;
