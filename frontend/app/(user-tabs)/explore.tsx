import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import React, { useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    Share,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    COLORS,
    FEATURED_DESTINATIONS,
} from "../../constants/userHomeData";

// Dark theme override for Explore screen
const THEME = {
  background: "#0B1326",
  surfaceContainer: "#171F33",
  surfaceContainerHigh: "#222A3D",
  surfaceContainerHighest: "#2D3449",
  text: "#DAE2FD",
  textMuted: "#8A9BB8",
  primary: "#FF385C",
  secondary: "#62DCA3",
  accent: "#F59E0B",
  white: "#FFFFFF",
  border: "rgba(92, 63, 65, 0.15)",
};

const SCREEN_WIDTH = Dimensions.get("window").width;

// Extended destination details
const DESTINATION_DETAILS: Record<string, {
  description: string;
  openingHours: string;
  entryFee: string;
  bestTime: string;
  duration: string;
  highlights: string[];
  howToReach: string;
  tips: string[];
  reviews: { name: string; rating: number; comment: string; date: string }[];
  images: string[];
  coordinates: { latitude: number; longitude: number };
}> = {
  "1": {
    description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.",
    openingHours: "6:00 AM - 6:30 PM (Closed on Fridays)",
    entryFee: "₹50 (Indians), ₹1100 (Foreigners)",
    bestTime: "October to March",
    duration: "2-3 hours",
    highlights: ["UNESCO World Heritage Site", "Seven Wonders of the World", "Mughal Architecture", "Sunset View"],
    howToReach: "Agra is well connected by rail, road, and air. The nearest airport is Agra Airport (5 km). Agra Cantt Railway Station is the main station.",
    tips: ["Visit early morning to avoid crowds", "Carry water and wear comfortable shoes", "Photography is allowed but tripods are not", "Avoid Fridays as it's closed"],
    reviews: [
      { name: "Rahul S.", rating: 5, comment: "Absolutely magnificent! A must-visit for everyone.", date: "2 weeks ago" },
      { name: "Sarah M.", rating: 5, comment: "The most beautiful building I've ever seen. Go at sunrise!", date: "1 month ago" },
      { name: "Amit K.", rating: 4, comment: "Crowded but worth it. The architecture is stunning.", date: "1 month ago" },
    ],
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
      "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
      "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
    ],
    coordinates: { latitude: 27.1751, longitude: 78.0421 },
  },
  "2": {
    description: "The Red Fort is a historic fort in the Old Delhi neighbourhood of Delhi, India, that historically served as the main residence of the Mughal Emperors. Emperor Shah Jahan commissioned construction of the Red Fort in 1639.",
    openingHours: "9:30 AM - 4:30 PM (Closed on Mondays)",
    entryFee: "₹35 (Indians), ₹500 (Foreigners)",
    bestTime: "October to March",
    duration: "2-3 hours",
    highlights: ["UNESCO World Heritage Site", "Independence Day Celebrations", "Sound & Light Show", "Mughal Architecture"],
    howToReach: "Located in Old Delhi. Nearest Metro: Chandni Chowk (Yellow Line). Auto-rickshaws and taxis are available.",
    tips: ["Attend the evening Light & Sound show", "Combine with Chandni Chowk visit", "Hire a guide for historical insights", "Wear comfortable walking shoes"],
    reviews: [
      { name: "Priya R.", rating: 5, comment: "Rich in history! The Light & Sound show is amazing.", date: "1 week ago" },
      { name: "John D.", rating: 4, comment: "Beautiful architecture. Gets hot in summer.", date: "3 weeks ago" },
    ],
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
      "https://images.unsplash.com/photo-1580714975263-3e992f62b38c?w=800",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800",
    ],
    coordinates: { latitude: 28.6562, longitude: 77.2410 },
  },
  "3": {
    description: "India Gate is a war memorial located astride the Rajpath, on the eastern edge of the ceremonial axis of New Delhi. It was dedicated to the 82,000 soldiers of the British Indian Army who died during the First World War.",
    openingHours: "Open 24 hours",
    entryFee: "Free",
    bestTime: "October to March, Evening hours",
    duration: "1-2 hours",
    highlights: ["Amar Jawan Jyoti", "Evening Illumination", "Rajpath View", "Street Food"],
    howToReach: "Located on Rajpath, Central Delhi. Nearest Metro: Central Secretariat (Yellow/Violet Line). Taxis and autos available.",
    tips: ["Visit in the evening for beautiful lighting", "Try local street food nearby", "Great for photography", "Combine with Rashtrapati Bhavan visit"],
    reviews: [
      { name: "Vikram S.", rating: 5, comment: "Beautiful at night! Great atmosphere.", date: "5 days ago" },
      { name: "Emma L.", rating: 4, comment: "Iconic landmark. Very crowded on weekends.", date: "2 weeks ago" },
    ],
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      "https://images.unsplash.com/photo-1606932842418-b1ac53b57618?w=800",
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800",
    ],
    coordinates: { latitude: 28.6129, longitude: 77.2295 },
  },
};

// Default details for destinations without specific data
const DEFAULT_DETAILS = {
  description: "A beautiful tourist destination in India offering rich cultural heritage and stunning architecture. This place attracts visitors from around the world seeking to explore India's diverse history and traditions.",
  openingHours: "9:00 AM - 6:00 PM",
  entryFee: "₹20 - ₹100 (varies)",
  bestTime: "October to March",
  duration: "1-2 hours",
  highlights: ["Historical Significance", "Architectural Beauty", "Photo Opportunities", "Cultural Experience"],
  howToReach: "Well connected by metro, buses, and taxis. Check local transport options.",
  tips: ["Carry water and sunscreen", "Wear comfortable shoes", "Respect local customs", "Hire a local guide for better experience"],
  reviews: [
    { name: "Tourist", rating: 4, comment: "Great place to visit!", date: "Recently" },
  ],
  images: [],
  coordinates: { latitude: 28.6139, longitude: 77.2090 },
};

const CATEGORIES = [
  { id: "all", label: "All", icon: "apps" },
  { id: "Heritage", label: "Heritage", icon: "bank" },
  { id: "Monument", label: "Monuments", icon: "statue" },
  { id: "Religious", label: "Religious", icon: "home-variant" },
  { id: "Market", label: "Markets", icon: "shopping" },
  { id: "Museum", label: "Museums", icon: "museum" },
  { id: "Nature", label: "Nature", icon: "tree" },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState<typeof FEATURED_DESTINATIONS[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isSaved, setIsSaved] = useState<Record<string, boolean>>({});

  const filteredDestinations = FEATURED_DESTINATIONS.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDetails = async (dest: typeof FEATURED_DESTINATIONS[0]) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedDestination(dest);
    setShowDetails(true);
  };

  const handleSavePlace = async (destId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsSaved(prev => ({ ...prev, [destId]: !prev[destId] }));
    if (!isSaved[destId]) {
      Alert.alert("Saved!", "Added to your saved places.");
    }
  };

  const handleShare = async () => {
    if (!selectedDestination) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        message: `Check out ${selectedDestination.name} in ${selectedDestination.location}! Rating: ${selectedDestination.rating}⭐`,
        title: selectedDestination.name,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  const handleOpenMaps = async () => {
    if (!selectedDestination) return;
    const details = DESTINATION_DETAILS[selectedDestination.id] || DEFAULT_DETAILS;
    const { latitude, longitude } = details.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    await Linking.openURL(url);
  };

  const getDetails = (destId: string) => {
    return DESTINATION_DETAILS[destId] || DEFAULT_DETAILS;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>
            Discover amazing places in India
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={20} color={THEME.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search destinations..."
              placeholderTextColor={THEME.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <MaterialCommunityIcons name="close-circle" size={18} color={THEME.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipSelected,
              ]}
              onPress={() => setSelectedCategory(category.id)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name={category.icon as any}
                size={15}
                color={selectedCategory === category.id ? THEME.white : THEME.textMuted}
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextSelected,
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Destinations */}
        <View style={styles.destinationsContainer}>
          <Text style={styles.sectionTitle}>
            {filteredDestinations.length} destinations found
          </Text>

          {filteredDestinations.map((dest) => (
            <TouchableOpacity key={dest.id} style={styles.destinationCard} onPress={() => handleViewDetails(dest)} activeOpacity={0.88}>
              <View style={styles.cardContent}>
                <Image source={{ uri: dest.image }} style={styles.cardImage} />
                <LinearGradient colors={["transparent", "rgba(11,19,38,0.95)"]} style={styles.cardImageOverlay} />
                <View style={styles.cardInfo}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{dest.name}</Text>
                    <View style={styles.categoryPill}>
                      <Text style={styles.categoryPillText}>{dest.category}</Text>
                    </View>
                  </View>
                  <View style={styles.locationRow}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={13}
                      color={THEME.textMuted}
                    />
                    <Text style={styles.locationText}>{dest.location}</Text>
                  </View>
                  <View style={styles.ratingRow}>
                    <MaterialCommunityIcons
                      name="star"
                      size={14}
                      color="#FFD700"
                    />
                    <Text style={styles.ratingText}>{dest.rating}</Text>
                  </View>
                  <View style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View Details</Text>
                    <MaterialCommunityIcons
                      name="arrow-right"
                      size={16}
                      color={THEME.primary}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Destination Details Modal */}
      <Modal
        visible={showDetails}
        animationType="slide"
        onRequestClose={() => setShowDetails(false)}
      >
        {selectedDestination && (
          <SafeAreaView style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Hero Image */}
              <View style={styles.heroContainer}>
                <Image
                  source={{ uri: selectedDestination.image }}
                  style={styles.heroImage}
                />
                <LinearGradient
                  colors={["transparent", "rgba(11,19,38,0.9)"]}
                  style={styles.heroOverlay}
                >
                  <View style={styles.heroContent}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>
                        {selectedDestination.category}
                      </Text>
                    </View>
                    <Text style={styles.heroTitle}>{selectedDestination.name}</Text>
                    <View style={styles.heroMeta}>
                      <MaterialCommunityIcons name="map-marker" size={16} color={THEME.white} />
                      <Text style={styles.heroLocation}>{selectedDestination.location}</Text>
                    </View>
                    <View style={styles.heroRating}>
                      <MaterialCommunityIcons name="star" size={18} color="#FFD700" />
                      <Text style={styles.heroRatingText}>{selectedDestination.rating}</Text>
                      <Text style={styles.heroReviewCount}>
                        ({getDetails(selectedDestination.id).reviews.length} reviews)
                      </Text>
                    </View>
                  </View>
                </LinearGradient>

                {/* Back Button */}
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setShowDetails(false)}
                >
                  <MaterialCommunityIcons name="arrow-left" size={24} color={THEME.white} />
                </TouchableOpacity>

                {/* Action Buttons */}
                <View style={styles.heroActions}>
                  <TouchableOpacity
                    style={styles.actionIcon}
                    onPress={() => handleSavePlace(selectedDestination.id)}
                  >
                    <MaterialCommunityIcons
                      name={isSaved[selectedDestination.id] ? "heart" : "heart-outline"}
                      size={22}
                      color={isSaved[selectedDestination.id] ? THEME.primary : THEME.white}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionIcon} onPress={handleShare}>
                    <MaterialCommunityIcons name="share-variant" size={22} color={THEME.white} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Photo Gallery */}
              {getDetails(selectedDestination.id).images.length > 0 && (
                <View style={styles.photoGallerySection}>
                  <Text style={styles.galleryHeader}>Photos</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.photoGallery}
                  >
                    {getDetails(selectedDestination.id).images.map((image, index) => (
                      <Image
                        key={index}
                        source={{ uri: image }}
                        style={styles.galleryImage}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Quick Info Cards */}
              <View style={styles.quickInfoContainer}>
                <View style={styles.quickInfoCard}>
                  <MaterialCommunityIcons name="clock-outline" size={24} color={THEME.primary} />
                  <Text style={styles.quickInfoLabel}>Duration</Text>
                  <Text style={styles.quickInfoValue}>{getDetails(selectedDestination.id).duration}</Text>
                </View>
                <View style={styles.quickInfoCard}>
                  <MaterialCommunityIcons name="currency-inr" size={24} color={THEME.primary} />
                  <Text style={styles.quickInfoLabel}>Entry Fee</Text>
                  <Text style={styles.quickInfoValue} numberOfLines={2}>
                    {getDetails(selectedDestination.id).entryFee.split(",")[0]}
                  </Text>
                </View>
                <View style={styles.quickInfoCard}>
                  <MaterialCommunityIcons name="calendar-check" size={24} color={THEME.primary} />
                  <Text style={styles.quickInfoLabel}>Best Time</Text>
                  <Text style={styles.quickInfoValue} numberOfLines={2}>
                    {getDetails(selectedDestination.id).bestTime}
                  </Text>
                </View>
              </View>

              {/* About Section */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionHeader}>About</Text>
                <Text style={styles.descriptionText}>
                  {getDetails(selectedDestination.id).description}
                </Text>
              </View>

              {/* Opening Hours */}
              <View style={styles.detailSection}>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="clock-outline" size={20} color={THEME.primary} />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Opening Hours</Text>
                    <Text style={styles.infoValue}>
                      {getDetails(selectedDestination.id).openingHours}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Highlights */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionHeader}>Highlights</Text>
                <View style={styles.highlightsContainer}>
                  {getDetails(selectedDestination.id).highlights.map((highlight, index) => (
                    <View key={index} style={styles.highlightChip}>
                      <MaterialCommunityIcons name="check-circle" size={16} color={THEME.primary} />
                      <Text style={styles.highlightText}>{highlight}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* How to Reach */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionHeader}>How to Reach</Text>
                <Text style={styles.descriptionText}>
                  {getDetails(selectedDestination.id).howToReach}
                </Text>
                <TouchableOpacity style={styles.directionsButton} onPress={handleOpenMaps}>
                  <MaterialCommunityIcons name="google-maps" size={20} color={THEME.white} />
                  <Text style={styles.directionsButtonText}>Open in Google Maps</Text>
                </TouchableOpacity>
              </View>

              {/* Tips */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionHeader}>Travel Tips</Text>
                {getDetails(selectedDestination.id).tips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <MaterialCommunityIcons name="lightbulb-outline" size={18} color={THEME.accent} />
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>

              {/* Reviews */}
              <View style={styles.detailSection}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionHeader}>Reviews</Text>
                  <View style={styles.overallRating}>
                    <MaterialCommunityIcons name="star" size={18} color="#FFD700" />
                    <Text style={styles.overallRatingText}>{selectedDestination.rating}</Text>
                  </View>
                </View>
                {getDetails(selectedDestination.id).reviews.map((review, index) => (
                  <View key={index} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <View style={styles.reviewerInfo}>
                        <View style={styles.reviewerAvatar}>
                          <Text style={styles.reviewerInitial}>{review.name[0]}</Text>
                        </View>
                        <View>
                          <Text style={styles.reviewerName}>{review.name}</Text>
                          <Text style={styles.reviewDate}>{review.date}</Text>
                        </View>
                      </View>
                      <View style={styles.reviewRating}>
                        {[...Array(5)].map((_, i) => (
                          <MaterialCommunityIcons
                            key={i}
                            name={i < review.rating ? "star" : "star-outline"}
                            size={14}
                            color="#FFD700"
                          />
                        ))}
                      </View>
                    </View>
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                  </View>
                ))}
              </View>

              {/* Bottom Spacing */}
              <View style={{ height: 20 }} />
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: THEME.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: THEME.textMuted,
    marginTop: 4,
    fontWeight: "500",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.surfaceContainerHigh,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: THEME.text,
    fontWeight: "500",
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: THEME.surfaceContainerHigh,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
    marginRight: 6,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  categoryChipSelected: {
    backgroundColor: THEME.primary,
    borderColor: THEME.primary,
  },
  categoryText: {
    color: THEME.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  categoryTextSelected: {
    color: THEME.white,
    fontWeight: "700",
  },
  destinationsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    color: THEME.textMuted,
    marginBottom: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  destinationCard: {
    marginBottom: 14,
    borderRadius: 18,
    backgroundColor: THEME.surfaceContainer,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: THEME.border,
  },
  cardContent: {
    flexDirection: "row",
    position: "relative",
  },
  cardImage: {
    width: 110,
    height: 130,
  },
  cardImageOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 110,
    height: 130,
  },
  cardInfo: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: THEME.text,
    flex: 1,
    letterSpacing: -0.2,
  },
  categoryPill: {
    backgroundColor: `${THEME.primary}18`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: `${THEME.primary}30`,
  },
  categoryPillText: {
    fontSize: 10,
    fontWeight: "700",
    color: THEME.primary,
    letterSpacing: 0.3,
  },
  priceTag: {
    backgroundColor: `${THEME.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 12,
    fontWeight: "600",
    color: THEME.primary,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    color: THEME.textMuted,
    fontWeight: "500",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    color: THEME.text,
  },
  reviewsText: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  viewButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: THEME.primary,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  heroContainer: {
    height: 300,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
    justifyContent: "flex-end",
    padding: 20,
  },
  heroContent: {
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: THEME.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  categoryBadgeText: {
    color: THEME.white,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: THEME.white,
    letterSpacing: -0.4,
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  heroLocation: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontWeight: "500",
  },
  heroRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  heroRatingText: {
    color: THEME.white,
    fontSize: 16,
    fontWeight: "800",
  },
  heroReviewCount: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(11,19,38,0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  heroActions: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    gap: 10,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(11,19,38,0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  photoGallerySection: {
    paddingVertical: 16,
  },
  galleryHeader: {
    fontSize: 18,
    fontWeight: "800",
    color: THEME.text,
    paddingHorizontal: 20,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  photoGallery: {
    paddingHorizontal: 16,
    gap: 12,
  },
  galleryImage: {
    width: SCREEN_WIDTH * 0.7,
    height: 200,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  quickInfoContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  quickInfoCard: {
    flex: 1,
    backgroundColor: THEME.surfaceContainer,
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.border,
  },
  quickInfoLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginTop: 6,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  quickInfoValue: {
    fontSize: 12,
    fontWeight: "700",
    color: THEME.text,
    textAlign: "center",
    marginTop: 2,
  },
  detailSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "800",
    color: THEME.text,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: THEME.textMuted,
    fontWeight: "500",
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME.text,
    marginTop: 2,
  },
  highlightsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  highlightChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: `${THEME.primary}12`,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: `${THEME.primary}20`,
  },
  highlightText: {
    fontSize: 13,
    color: THEME.primary,
    fontWeight: "600",
  },
  directionsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#4285F4",
    padding: 14,
    borderRadius: 50,
    marginTop: 12,
  },
  directionsButtonText: {
    color: THEME.white,
    fontWeight: "700",
    fontSize: 14,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: THEME.textMuted,
    lineHeight: 20,
    fontWeight: "500",
  },
  overallRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  overallRatingText: {
    fontSize: 18,
    fontWeight: "800",
    color: THEME.text,
  },
  reviewCard: {
    backgroundColor: THEME.surfaceContainer,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  reviewerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewerInitial: {
    color: THEME.white,
    fontSize: 15,
    fontWeight: "700",
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "700",
    color: THEME.text,
  },
  reviewDate: {
    fontSize: 12,
    color: THEME.textMuted,
    fontWeight: "500",
  },
  reviewRating: {
    flexDirection: "row",
    gap: 2,
  },
  reviewComment: {
    fontSize: 14,
    color: THEME.textMuted,
    lineHeight: 20,
    fontWeight: "500",
  },
});
