import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { Orbitron_400Regular } from "@expo-google-fonts/orbitron";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import outputMusic from "../outputMusic.json";  // Music data
import outputFilm from "../outputFilm.json";  // Film data
import outputSeries from "../outputSeries.json";  // Series data
import outputBooks from "../outputBooks.json";  // Book data

const screenWidth = Dimensions.get("window").width;

const strings = {
  en: {
    title: "Account",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    editProfile: "Edit Profile",
    changePassword: "Change Password",
    notifications: "Notifications",
    preferences: "Preferences",
    welcome: "Welcome,",
  },
  tr: {
    title: "Hesap",
    profile: "Profil",
    settings: "Ayarlar",
    logout: "Çıkış",
    editProfile: "Profili Düzenle",
    changePassword: "Şifreyi Değiştir",
    notifications: "Bildirimler",
    preferences: "Tercihler",
    welcome: "Hoş geldiniz,",
  },
};

function AccountPage({ navigation }) {
  const [fontsLoaded] = useFonts({ Orbitron_400Regular });
  const [language, setLanguage] = React.useState("en");
  const [genreDistributionMusic, setGenreDistributionMusic] = useState([]);
  const [genreDistributionFilm, setGenreDistributionFilm] = useState([]);
  const [genreDistributionSeries, setGenreDistributionSeries] = useState([]);
  const [genreDistributionBooks, setGenreDistributionBooks] = useState([]);

  // Renk paleti
  const colorPalette = [
    "#1E3A8A", "#3B82F6", "#2563EB", "#60A5FA", "#93C5FD", "#A5B4FC", 
    "#BFDBFE", "#B1D0E0", "#6495ED", "#7FDBFF", "#0044CC", "#1D4ED8", 
    "#0096C7", "#0F4C75", "#5B8FB9", "#4682B4", "#3D8B97", "#00BFFF", 
    "#8EC8E5", "#A2D2FF",
  ];

  // Genre dağılımlarını hesapla
  const calculateGenreDistribution = (data) => {
    const genreCounter = {};
    data.forEach((item) => {
      if (item.genre_1) {
        genreCounter[item.genre_1] = (genreCounter[item.genre_1] || 0) + 1;
      }
      if (item.genre_2) {
        genreCounter[item.genre_2] = (genreCounter[item.genre_2] || 0) + 1;
      }
    });
  
    return Object.entries(genreCounter).map(([genre, count], index) => ({
      name: genre,
      population: count,
      color: colorPalette[index % colorPalette.length],
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    }));
  };

  useEffect(() => {
    // Müzik için genre dağılımı
    setGenreDistributionMusic(calculateGenreDistribution(outputMusic));

    // Film için genre dağılımı
    setGenreDistributionFilm(calculateGenreDistribution(outputFilm));

    // Dizi için genre dağılımı
    setGenreDistributionSeries(calculateGenreDistribution(outputSeries));

    // Kitaplar için genre dağılımı
    setGenreDistributionBooks(calculateGenreDistribution(outputBooks));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const stringsSelected = strings[language];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={["#00A9E0", "#1D3557"]} style={styles.gradientBackground} />
      <Text style={styles.title}>{stringsSelected.title}</Text>

      <View style={styles.profileContainer}>
        <ImageBackground
          source={{ uri: "https://www.w3schools.com/w3images/avatar2.png" }} // Profil resmi URL'si
          style={styles.profileImage}
          imageStyle={{ borderRadius: 50 }}
          resizeMode="cover"
        >
          <Text style={styles.initials}>JD</Text>
        </ImageBackground>
        <Text style={styles.welcomeText}>{stringsSelected.welcome} John Doe</Text>
      </View>

      <Text style={styles.subtitle}>Music Genre Distribution</Text>
      <PieChart
        data={genreDistributionMusic}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#1D3557",
          backgroundGradientFrom: "#1D3557",
          backgroundGradientTo: "#457B9D",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft="15"
        absolute
      />

      <Text style={styles.subtitle}>Film Genre Distribution</Text>
      <PieChart
        data={genreDistributionFilm}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#1D3557",
          backgroundGradientFrom: "#1D3557",
          backgroundGradientTo: "#457B9D",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft="15"
        absolute
      />

      <Text style={styles.subtitle}>Series Genre Distribution</Text>
      <PieChart
        data={genreDistributionSeries}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#1D3557",
          backgroundGradientFrom: "#1D3557",
          backgroundGradientTo: "#457B9D",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft="15"
        absolute
      />

      <Text style={styles.subtitle}>Book Genre Distribution</Text>
      <PieChart
        data={genreDistributionBooks}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#1D3557",
          backgroundGradientFrom: "#1D3557",
          backgroundGradientTo: "#457B9D",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft="15"
        absolute
      />

      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("EditProfile")}>
            <Text style={styles.optionText}>{stringsSelected.editProfile}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("ChangePassword")}>
            <Text style={styles.optionText}>{stringsSelected.changePassword}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Notifications")}>
            <Text style={styles.optionText}>{stringsSelected.notifications}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Preferences")}>
            <Text style={styles.optionText}>{stringsSelected.preferences}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Settings")}>
            <Text style={styles.optionText}>{stringsSelected.settings}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Logout")}>
            <Text style={styles.optionText}>{stringsSelected.logout}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "flex-start", alignItems: "center", paddingBottom: 20 },
  gradientBackground: { position: "absolute", top: 0, left: 0, right: 0, height: "100%" },
  title: { fontSize: 40, fontFamily: "Orbitron_400Regular", color: "#FFFFFF", marginTop: 50 },
  profileContainer: { alignItems: "center", marginTop: 30 },
  profileImage: { width: 100, height: 100, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  initials: { fontSize: 30, fontFamily: "Orbitron_400Regular", color: "#FFFFFF" },
  welcomeText: { fontSize: 18, fontFamily: "Orbitron_400Regular", color: "#FFFFFF" },
  subtitle: { fontSize: 20, fontFamily: "Orbitron_400Regular", color: "#FFFFFF", marginTop: 20 },
  optionsContainer: { marginTop: 30, width: "80%", alignItems: "center" },
  optionsRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 20 },
  option: { backgroundColor: "#1D3557", padding: 15, borderRadius: 10, width: "48%" },
  optionText: { color: "#FFFFFF", fontFamily: "Orbitron_400Regular", fontSize: 20, textAlign: "center" },
});

export default AccountPage;
