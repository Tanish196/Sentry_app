import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { COLORS } from "../../constants/userHomeData";
import {
  getCachedWeather,
  WeatherData,
} from "../../services/api/weatherService";
import { getCurrentLocation } from "../../services/maps/locationService";

const getIconColor = (icon: string) => {
  if (icon.includes("sunny")) return "#F59E0B";
  if (icon.includes("cloudy")) return "#8A9BB8";
  if (icon.includes("rainy") || icon.includes("lightning")) return "#4F8EF7";
  if (icon.includes("snowy")) return "#60A5FA";
  return "#F59E0B";
};

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(false);
      const location = await getCurrentLocation();
      if (!location) {
        setError(true);
        setLoading(false);
        return;
      }
      const weatherData = await getCachedWeather(location);
      setWeather(weatherData);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.section}>
        <View style={styles.weatherCard}>
          <ActivityIndicator size="small" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading weather...</Text>
        </View>
      </View>
    );
  }

  if (error || !weather) {
    return (
      <View style={styles.section}>
        <View style={styles.weatherCard}>
          <View style={styles.errorRow}>
            <MaterialCommunityIcons name="weather-cloudy-alert" size={36} color="#8A9BB8" />
            <View style={styles.errorInfo}>
              <Text style={styles.errorText}>Weather unavailable</Text>
              <TouchableOpacity onPress={fetchWeather}>
                <Text style={styles.retryText}>Tap to retry</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  const iconColor = getIconColor(weather.icon);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Current Weather</Text>
        <TouchableOpacity onPress={fetchWeather} style={styles.refreshBtn}>
          <MaterialCommunityIcons name="refresh" size={14} color={COLORS.textMuted} />
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weatherCard}>
        {/* Left: Temp + Icon */}
        <View style={styles.weatherLeft}>
          <View style={[styles.weatherIconBg, { backgroundColor: `${iconColor}20` }]}>
            <MaterialCommunityIcons
              name={weather.icon as any}
              size={36}
              color={iconColor}
            />
          </View>
          <View style={styles.tempInfo}>
            <Text style={styles.temperature}>{weather.temperature}°</Text>
            <Text style={styles.weatherCondition}>{weather.condition}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Right: Location + Advice */}
        <View style={styles.weatherRight}>
          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker" size={13} color={COLORS.primary} />
            <Text style={styles.locationName} numberOfLines={1}>
              {weather.city}
            </Text>
          </View>
          <Text style={styles.weatherAdvice} numberOfLines={2}>
            {weather.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#DAE2FD",
    letterSpacing: -0.3,
  },
  refreshBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  refreshText: {
    fontSize: 12,
    color: "#8A9BB8",
    fontWeight: "500",
  },
  weatherCard: {
    backgroundColor: "#171F33",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(92, 63, 65, 0.12)",
    gap: 16,
  },
  weatherLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  weatherIconBg: {
    width: 58,
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  tempInfo: {
    gap: 2,
  },
  temperature: {
    fontSize: 32,
    fontWeight: "800",
    color: "#DAE2FD",
    letterSpacing: -1,
  },
  weatherCondition: {
    fontSize: 13,
    color: "#8A9BB8",
    fontWeight: "500",
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: "rgba(92, 63, 65, 0.2)",
  },
  weatherRight: {
    flex: 1,
    gap: 6,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DAE2FD",
    flex: 1,
  },
  weatherAdvice: {
    fontSize: 12,
    color: "#8A9BB8",
    lineHeight: 16,
  },
  loadingText: {
    fontSize: 14,
    color: "#8A9BB8",
    marginLeft: 12,
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  errorInfo: {},
  errorText: {
    fontSize: 14,
    color: "#8A9BB8",
  },
  retryText: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 4,
    textDecorationLine: "underline",
  },
});

export default WeatherWidget;
