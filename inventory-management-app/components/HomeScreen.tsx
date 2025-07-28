// import { View, StyleSheet, ScrollView } from "react-native";
// import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../shared/SharedConstants";
// import {
//   Button,
//   Card,
//   Divider,
//   Icon,
//   IconButton,
//   Text,
// } from "react-native-paper";

import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, Text } from "react-native-paper";
import GradientBackground from "../utils/GradientBackground";
import { DEFAULT_THEME_COLOR } from "../utils/SysConsts";
import { CallApiGet } from "../utils/ServiceHelper";

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Load custom fonts

  // Sample inventory data
  const inventoryStats = {
    totalProducts: 158,
    productsIn: 24,
    productsOut: 12,
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Welcome to Shine Collection</Text>
          <Text style={styles.headerSubtitle}>Inventory Management</Text>
        </View>

        {/* Inventory Stats Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              Inventory Overview
            </Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <MaterialIcons name="inventory" size={32} color="#d4af37" />
                <Text style={styles.statText}>Total Products</Text>
                <Text style={styles.statNumber}>
                  {inventoryStats.totalProducts}
                </Text>
              </View>
              <View style={styles.statSeparator} />
              <View style={styles.statItem}>
                <MaterialCommunityIcons
                  name="arrow-bottom-left"
                  size={32}
                  color="#2ecc71"
                />
                <Text style={styles.statText}>Products In</Text>
                <Text style={styles.statNumber}>
                  {inventoryStats.productsIn}
                </Text>
              </View>
              <View style={styles.statSeparator} />
              <View style={styles.statItem}>
                <MaterialCommunityIcons
                  name="arrow-top-right"
                  size={32}
                  color="#e74c3c"
                />
                <Text style={styles.statText}>Products Out</Text>
                <Text style={styles.statNumber}>
                  {inventoryStats.productsOut}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Action Cards Container */}
        <View style={styles.actionCardsContainer}>
          {/* Billing Counter Card */}
          <TouchableOpacity onPress={() => navigation.navigate("Billing")}>
            <Card style={styles.actionCard}>
              <Card.Content style={styles.actionCardContent}>
                <MaterialCommunityIcons
                  name="point-of-sale"
                  size={48}
                  color="#d4af37"
                  onPress={() => navigation.navigate("Billing")}
                />
                <Text style={styles.actionCardTitle}>Billing Counter</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>

          {/* Inventory Management Card */}
          <TouchableOpacity onPress={() => navigation.navigate("Inventory")}>
            <Card style={styles.actionCard}>
              <Card.Content style={styles.actionCardContent}>
                <MaterialIcons
                  name="store"
                  size={48}
                  color="#d4af37"
                  onPress={() => navigation.navigate("Inventory")}
                />
                <Text style={styles.actionCardTitle}>SKU</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          {/*Inventory Screen */}
          <TouchableOpacity
            onPress={() => navigation.navigate("InventoryList")}
          >
            <Card style={styles.actionCard}>
              <Card.Content style={styles.actionCardContent}>
                <MaterialIcons
                  name="menu-book"
                  size={48}
                  color="#d4af37"
                  onPress={() => navigation.navigate("InventoryList")}
                />
                <Text style={styles.actionCardTitle}>Inventory</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          {/* Ledger */}
          <TouchableOpacity onPress={() => navigation.navigate("Ledger")}>
            <Card style={styles.actionCard}>
              <Card.Content style={styles.actionCardContent}>
                <MaterialIcons
                  name="menu-book"
                  size={48}
                  color="#d4af37"
                  onPress={() => navigation.navigate("Ledger")}
                />
                <Text style={styles.actionCardTitle}>Ledger</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 16,
  },
  headerContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "PlayfairDisplay-Regular",
    fontSize: 24,
    color: DEFAULT_THEME_COLOR,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "#f8f8f8",
    letterSpacing: 1,
  },
  card: {
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: "PlayfairDisplay-Regular",
    color: DEFAULT_THEME_COLOR,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statText: {
    fontFamily: "Montserrat-Regular",
    color: "#f8f8f8",
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  statNumber: {
    fontFamily: "PlayfairDisplay-Regular",
    color: "#f8f8f8",
    fontSize: 20,
    fontWeight: "bold",
  },
  statSeparator: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 8,
  },
  actionCardsContainer: {
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionCard: {
    width: Dimensions.get("window").width * 0.45,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    marginBottom: 16,
  },
  actionCardContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  actionCardTitle: {
    fontFamily: "Montserrat-Regular",
    color: "#f8f8f8",
    fontSize: 16,
    marginTop: 12,
  },
});

export default HomeScreen;
