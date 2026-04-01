import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Card, Chip, Text } from "react-native-paper";
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

const TIME_FILTERS = ["Today", "This Week", "This Month", "This Year"];

const OVERVIEW_STATS = [
  {
    label: "Total Tours",
    value: "1,234",
    change: "+12%",
    icon: "map-marker-path",
    color: COLORS.primary,
  },
  {
    label: "Active Users",
    value: "856",
    change: "+8%",
    icon: "account-check",
    color: COLORS.success,
  },
  {
    label: "SOS Alerts",
    value: "23",
    change: "-5%",
    icon: "alert-circle",
    color: COLORS.error,
  },
  {
    label: "Revenue",
    value: "₹12.4L",
    change: "+18%",
    icon: "currency-inr",
    color: COLORS.secondary,
  },
];

const REPORTS = [
  {
    id: "1",
    title: "User Activity Report",
    type: "Daily",
    generated: "Today, 9:00 AM",
    status: "ready",
    icon: "account-group",
  },
  {
    id: "2",
    title: "Tourism Analytics",
    type: "Weekly",
    generated: "Yesterday, 6:00 PM",
    status: "ready",
    icon: "chart-line",
  },
  {
    id: "3",
    title: "Emergency Response",
    type: "Monthly",
    generated: "Feb 1, 2026",
    status: "ready",
    icon: "alert",
  },
  {
    id: "4",
    title: "Revenue Summary",
    type: "Monthly",
    generated: "Processing...",
    status: "processing",
    icon: "currency-inr",
  },
  {
    id: "5",
    title: "Safety Metrics",
    type: "Weekly",
    generated: "Jan 28, 2026",
    status: "ready",
    icon: "shield-check",
  },
];

export default function ReportsScreen() {
  const [selectedTime, setSelectedTime] = useState("This Week");
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 8 }]}>
          <Text style={styles.headerTitle}>Reports & Analytics</Text>
          <Text style={styles.headerSubtitle}>
            Monitor your platform performance
          </Text>
        </View>

        {/* Time Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.timeFilters}
        >
          {TIME_FILTERS.map((filter) => (
            <Chip
              key={filter}
              selected={selectedTime === filter}
              onPress={() => setSelectedTime(filter)}
              style={[
                styles.timeChip,
                selectedTime === filter && styles.timeChipSelected,
              ]}
              textStyle={[
                styles.timeText,
                selectedTime === filter && styles.timeTextSelected,
              ]}
            >
              {filter}
            </Chip>
          ))}
        </ScrollView>

        {/* Overview Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {OVERVIEW_STATS.map((stat, index) => (
              <Card key={index} style={styles.statCard}>
                <Card.Content style={styles.statContent}>
                  <View
                    style={[
                      styles.statIcon,
                      { backgroundColor: `${stat.color}12` },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={stat.icon as any}
                      size={22}
                      color={stat.color}
                    />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <View style={styles.changeContainer}>
                    <MaterialCommunityIcons
                      name={
                        stat.change.startsWith("+") ? "arrow-up" : "arrow-down"
                      }
                      size={12}
                      color={
                        stat.change.startsWith("+")
                          ? COLORS.success
                          : COLORS.error
                      }
                    />
                    <Text
                      style={[
                        styles.changeText,
                        {
                          color: stat.change.startsWith("+")
                            ? COLORS.success
                            : COLORS.error,
                        },
                      ]}
                    >
                      {stat.change}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>

        {/* Chart Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Activity Trend</Text>
          <Card style={styles.chartCard}>
            <Card.Content style={styles.chartContent}>
              <View style={styles.chartIconBg}>
                <MaterialCommunityIcons
                  name="chart-areaspline"
                  size={80}
                  color={COLORS.primary}
                />
              </View>
              <Text style={styles.chartPlaceholder}>Activity Chart</Text>
              <Text style={styles.chartSubtext}>
                Interactive chart will be displayed here
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Generated Reports */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Generated Reports</Text>
            <TouchableOpacity style={styles.generateButton} activeOpacity={0.8}>
              <MaterialCommunityIcons
                name="plus"
                size={18}
                color={COLORS.white}
              />
              <Text style={styles.generateText}>Generate</Text>
            </TouchableOpacity>
          </View>

          {REPORTS.map((report) => (
            <Card key={report.id} style={styles.reportCard}>
              <Card.Content style={styles.reportContent}>
                <View
                  style={[
                    styles.reportIcon,
                    { backgroundColor: `${COLORS.primary}12` },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={report.icon as any}
                    size={22}
                    color={COLORS.primary}
                  />
                </View>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportTitle}>{report.title}</Text>
                  <Text style={styles.reportMeta}>
                    {report.type} • {report.generated}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.downloadButton,
                    report.status === "processing" &&
                      styles.downloadButtonDisabled,
                  ]}
                  disabled={report.status === "processing"}
                >
                  <MaterialCommunityIcons
                    name={
                      report.status === "processing" ? "loading" : "download"
                    }
                    size={20}
                    color={
                      report.status === "processing"
                        ? COLORS.textMuted
                        : COLORS.primary
                    }
                  />
                </TouchableOpacity>
              </Card.Content>
            </Card>
          ))}
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
  timeFilters: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  timeChip: {
    backgroundColor: COLORS.white,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  timeTextSelected: {
    color: COLORS.white,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
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
    color: COLORS.text,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    marginBottom: 12,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#21100B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  statContent: {
    alignItems: "center",
    paddingVertical: 14,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: "500",
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 2,
  },
  changeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  chartCard: {
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#21100B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  chartContent: {
    alignItems: "center",
    paddingVertical: 40,
  },
  chartIconBg: {
    width: 120,
    height: 120,
    borderRadius: 32,
    backgroundColor: `${COLORS.primary}08`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  chartPlaceholder: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 12,
  },
  chartSubtext: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  generateText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.white,
  },
  reportCard: {
    marginBottom: 10,
    borderRadius: 18,
    elevation: 2,
    shadowColor: "#21100B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  reportContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  reportIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  reportInfo: {
    flex: 1,
    marginLeft: 12,
  },
  reportTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  reportMeta: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${COLORS.primary}10`,
    justifyContent: "center",
    alignItems: "center",
  },
  downloadButtonDisabled: {
    backgroundColor: COLORS.border,
  },
});
