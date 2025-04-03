import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './screens/HomePage'; // HomePage.js dosyasına yönlendirme
import BooksPage from './screens/BooksPage'; // BooksPage.js dosyasına yönlendirme
import MoviesPage from './screens/MoviesPage'; // MoviesPage.js dosyasına yönlendirme
import MusicPage from './screens/MusicPage'; // MusicPage.js dosyasına yönlendirme
import SeriesPage from './screens/SeriesPage'; // SeriesPage.js dosyasına yönlendirme
import LoginPage from './screens/LoginPage'; // LoginPage.js dosyasına yönlendirme
import ContactPage from './screens/ContactPage'; // ContactPage.js dosyasına yönlendirme
import AccountPage from './screens/AccountPage'; // AccountPage.js dosyasına yönlendirme

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Books" component={BooksPage} options={{ headerShown: false }} /> 
        <Stack.Screen name="Movies" component={MoviesPage} options={{ headerShown: false }} />
        <Stack.Screen name="Music" component={MusicPage} options={{ headerShown: false }} />
        <Stack.Screen name="Series" component={SeriesPage} options={{ headerShown: false }} />
        <Stack.Screen name="Account" component={AccountPage} options={{ headerShown: false }} />
        <Stack.Screen name="Contact" component={ContactPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
