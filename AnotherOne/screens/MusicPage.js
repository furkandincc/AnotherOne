import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Orbitron_400Regular } from '@expo-google-fonts/orbitron';
import * as SplashScreen from 'expo-splash-screen'; 
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/Ionicons'; 

const MusicPage = () => {
  const [fontsLoaded] = useFonts({ Orbitron_400Regular });
  const [searchQuery, setSearchQuery] = useState(''); // Arama sorgusu için state
  const [music, setMusics] = useState([]); // Filmleri sakla
  const [loading, setLoading] = useState(true); // Yüklenme durumu
  const navigation = useNavigation(); 

  useEffect(() => {
    // Python dosyasını çalıştır v
    fetch('http://192.168.1.170:3000/run-python/music')
      .then((response) => response.json())
      .then((data) => {
        console.log('Gelen veri:', data);
        setMusics(data); // Alınan veriyi state'e kaydet
        setLoading(false);
      })
      .catch((error) => {
        console.error('Veri alınırken hata oluştu:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); 
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

// Filmleri arama sorgusuna göre filtrele
const filteredMusics = Array.isArray(music)
  ? music.filter((music) => music.name.toLowerCase().includes(searchQuery.toLowerCase()))
  : [];

  return (
    <View style={styles.container}>
      {/* Navigasyon Menüsü */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navItem}>
          <Icon name="home" size={24} color="#FFF" />
          <Text style={styles.navBarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Books')} style={styles.navItem}> 
          <Icon name="book" size={24} color="#FFF" /> 
          <Text style={styles.navBarText}>Books</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Movies')} style={styles.navItem}>
          <Icon name="film" size={24} color="#FFF" />
          <Text style={styles.navBarText}>Film</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Series')} style={styles.navItem}>
          <Icon name="tv" size={24} color="#FFF" />
          <Text style={styles.navBarText}>Series</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Musics"
        value={searchQuery}
        onChangeText={setSearchQuery} // Arama sorgusunu güncelle
      />

      {/* Filmler Listesi */}
      <FlatList
        data={filteredMusics} // Filtrelenmiş müzikler
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <Text style={styles.cardLan}>{item.lan}</Text>
          </View>
        )}
        numColumns={2} 
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3557', 
    padding: 20,
  },
  list: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#457B9D',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    minHeight: 150,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Orbitron_600SemiBold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  cardDescription: {
    marginTop: 8,
    fontSize: 16,
    color: '#CBD5E1',
    fontFamily: 'Roboto_400Regular',
    lineHeight: 22,
    textAlign: 'justify',
  },
  cardLan: {
    marginTop: 6,
    fontSize: 14,
    color: '#94A3B8',
    fontFamily: 'Roboto_300Light',
    fontStyle: 'italic',
    textAlign: 'left',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    paddingVertical: 10,
    backgroundColor: '#1D3557',
    borderBottomWidth: 1,
    borderBottomColor: '#457B9D',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  navBarText: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Orbitron_400Regular',
    marginTop: 5,
  },
  searchBar: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
});

export default MusicPage;
