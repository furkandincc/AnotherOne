import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Orbitron_400Regular } from '@expo-google-fonts/orbitron';

const strings = {
  en: {
    home: 'Home',
    account: 'Account',
    contact: 'Contact Us',
    books: 'Books',
    movies: 'Movies',
    music: 'Music',
    series: 'Series',
    title: 'AnotherOne',
    findBooks: 'Find your favorite books here.',
    findMovies: 'The latest and popular movies.',
    musicTitle: 'Let the rhythm of music take over.',
    seriesTitle: 'Must-watch series are here.',
  },
  tr: {
    home: 'Anasayfa',
    account: 'Hesap',
    contact: 'Bize Ulaşın',
    books: 'Kitaplar',
    movies: 'Filmler',
    music: 'Müzik',
    series: 'Diziler',
    title: 'AnotherOne',
    findBooks: 'Favori kitaplarını burada bul.',
    findMovies: 'En yeni ve popüler filmler.',
    musicTitle: 'Müziğin ritmine kapıl.',
    seriesTitle: 'İzlenmesi gereken diziler burada.',
  },
};

function HomePage({ navigation }) {
  const [fontsLoaded] = useFonts({ Orbitron_400Regular });
  const [language, setLanguage] = React.useState('en');

  if (!fontsLoaded) {
    return null;
  }

  const stringsSelected = strings[language];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#00A9E0', '#1D3557']} style={styles.gradientBackground} />
      
      {/* Logo Eklendi */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* "AnotherOne" Yazısı Silindi */}
      {/* <Text style={styles.title}>{stringsSelected.title}</Text> */}

      <View style={styles.menuBar}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <MaterialCommunityIcons name="home" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>{stringsSelected.home}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Account')}>
          <MaterialCommunityIcons name="account-circle" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>{stringsSelected.account}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Contact')}>
          <MaterialCommunityIcons name="email" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>{stringsSelected.contact}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => setLanguage(language === 'en' ? 'tr' : 'en')}>
          <MaterialCommunityIcons name="translate" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>{language === 'en' ? 'Türkçe' : 'English'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.categoryContainer}>
        <View style={styles.categoryGrid}>
          <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Books')}>
            <MaterialCommunityIcons name="book" size={100} color="#FFFFFF" />
            <Text style={styles.categoryText}>{stringsSelected.books}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Movies')}>
            <MaterialCommunityIcons name="film" size={100} color="#FFFFFF" />
            <Text style={styles.categoryText}>{stringsSelected.movies}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Music')}>
            <MaterialCommunityIcons name="music" size={100} color="#FFFFFF" />
            <Text style={styles.categoryText}>{stringsSelected.music}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Series')}>
            <MaterialCommunityIcons name="television" size={100} color="#FFFFFF" />
            <Text style={styles.categoryText}>{stringsSelected.series}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center' },
  gradientBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: '100%' },
  // title: { fontSize: 40, fontFamily: 'Orbitron_400Regular', color: '#FFFFFF', marginTop: 50 }, // Silindi
  menuBar: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', padding: 10, backgroundColor: '#1D3557', borderBottomWidth: 1, borderColor: '#444', marginTop: 30 },
  menuItem: { justifyContent: 'center', alignItems: 'center' },
  menuText: { color: '#FFFFFF', fontFamily: 'Orbitron_400Regular' },
  categoryContainer: { alignItems: 'center', marginBottom: 30, paddingTop: 20 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%' },
  category: { width: 225, height: 225, justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#1D3557', borderRadius: 10, padding: 10, alignSelf: 'center' },
  categoryText: { color: '#FFFFFF', fontFamily: 'Orbitron_400Regular', marginTop: 10 },
  logo: { width: 150, height: 150, marginTop: 20 }, // Logo boyutlandırma
});

export default HomePage;
