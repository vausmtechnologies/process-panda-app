import responsive from "@/responsive";
import { getPurchasedPlan } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const Dashboard = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (!token) throw new Error("No access token found");

        const res = await getPurchasedPlan(token);

        if (res.status === 1 && res.subscription_image_url) {
          setImageUrl(res.subscription_image_url);
        } else {
          Toast.show({
            type: "error",
            text1: "Error loading dashboard",
            text2: res.message,
          });
        }
      } catch (error) {
        console.error("Dashboard error:", error);
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
      {/* ✅ Ensures status bar is styled properly */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headingText}>ProcessPanda</Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#061326"
            style={{ marginTop: 100 }}
          />
        ) : (
          <View style={styles.imageContainer}>
            <Text style={styles.welcome}>Your training, made simple.</Text>
            <Text style={styles.subtitle}>Watch your assigned videos, track progress and complete your training from your phone.</Text>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Open my assigned training" style={styles.trainingButton} onPress={() => router.push("/(app)/(tabs)/myvideos") }>
              <Ionicons name="play-circle-outline" size={28} color="#061326" />
              <Text style={styles.trainingButtonText}>View my training</Text>
              <Ionicons name="arrow-forward" size={21} color="#061326" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    gap: 20,
    backgroundColor: "#061326",
    paddingVertical: responsive.padding(15),
    paddingHorizontal: responsive.padding(15),
    flexDirection: "row",
  },
  headingText: {
    color: "#fff",
    fontSize: responsive.fontSize(18),
    fontFamily: "NotoSansSemiBold",
  },
  welcome: { fontSize: 27, fontWeight: "800", color: "#061326", marginBottom: 14 },
  subtitle: { fontSize: 16, lineHeight: 24, color: "#465367", marginBottom: 34 },
  trainingButton: { backgroundColor: "#FFBD0B", padding: 17, borderRadius: 13, flexDirection: "row", alignItems: "center", gap: 10 },
  trainingButtonText: { flex: 1, color: "#061326", fontSize: 16, fontWeight: "800" },
  imageButton: {
    width: responsive.width(350),
    height: responsive.height(450),
    borderRadius: responsive.borderRadius(20),
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 25,
    paddingTop: 54,
  },
});

export default Dashboard;
