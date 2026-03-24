import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
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
<<<<<<< HEAD
import { COLORS } from "../../constants/userHomeData";
import { getCurrentLocation } from "../../services/maps/locationService";
=======
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";
import { useAuth } from "../../store/AuthContext";
>>>>>>> feature/backend-connect

const ShareLocation: React.FC = () => {
  const { user } = useAuth();
  const [sharing, setSharing] = useState(false);

  const handleShareLocation = async () => {
    if (sharing) return;
    setSharing(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // 1. Request Permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setSharing(false);
        Alert.alert(
          "Permission Denied",
          "Location permission is required to share your location. Please enable it in Settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }

      // 2. Get Current Location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;

      // 3. Reverse Geocode
      let addressStr = "";
      try {
        const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (geocode.length > 0) {
          const place = geocode[0];
          const parts = [
            place.name,
            place.street,
            place.city,
            place.region,
            place.postalCode,
          ].filter(Boolean);
          addressStr = parts.join(", ");
        }
      } catch (e) {
        console.warn("Reverse geocode failed", e);
      }

      // 4. Build Professional Message
      const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      const userName = user?.name || "A Sentry User";
      const timestamp = new Date().toLocaleString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const shareMessage =
        `*LIVE LOCATION — Emergency Share*\n\n` +
        `From: ${userName}\n` +
        `Location: ${addressStr || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`}\n` +
        `Time: ${timestamp}\n\n` +
        `Google Maps URL:\n${mapsLink}\n\n` +
        `This location was shared via the Sentry Emergency App.`;

      // 5. Open Share Sheet
      const result = await Share.share({
        message: shareMessage,
        title: "My Current Location",
      });

      if (result.action === Share.sharedAction) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error("Share location error", error);
      Alert.alert("Error", "Failed to get location. Please try again.");
    } finally {
      setSharing(false);
    }
  };

  return (
    <View style={styles.section}>
      <BlurView intensity={30} tint="light" style={styles.safetyCard}>
        <View style={styles.content}>
          <TouchableOpacity
            style={[styles.shareBtn, sharing && styles.shareBtnDisabled]}
            onPress={handleShareLocation}
            disabled={sharing}
            activeOpacity={0.85}
          >
            {sharing ? (
              <>
                <ActivityIndicator size="small" color={COLORS.gold} />
                <Text style={styles.shareBtnText}>Getting Location...</Text>
              </>
            ) : (
              <>
                <MaterialCommunityIcons name="share-variant" size={18} color={COLORS.gold} />
                <Text style={styles.shareBtnText}>Share My Location</Text>
                <MaterialCommunityIcons name="arrow-right" size={16} color={COLORS.gold} />
              </>
            )}
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  safetyCard: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: COLORS.glassBorder,
  },
  content: {
    padding: 18,
  },
  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 14,
    borderRadius: 50,
    backgroundColor: "rgba(207, 176, 132, 0.15)",
    borderWidth: 1.5,
    borderColor: "rgba(207, 176, 132, 0.3)",
  },
  shareBtnDisabled: {
    opacity: 0.6,
  },
  shareBtnText: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.white,
  },
});

export default ShareLocation;
