import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Basit bir kontrol ile başarılı giriş sonrası yönlendirme
    if (username === 'CihanCivit' && password === '123') {
      navigation.replace('Home'); // Başarılı giriş sonrası HomePage'e yönlendir
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#B0B0B0"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#B0B0B0"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={() => alert('Go to Register')}>
        <Text style={styles.registerButtonText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F4F8', // Açık gri arka plan rengi
  },
  title: {
    fontSize: 40,
    color: '#1D3557', // Başlık için koyu mavi renk
    fontFamily: 'Orbitron_400Regular', // Farklı bir yazı tipi kullanabilirsiniz
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000', // Hafif gölge efekti ekleyerek kutuları vurguladık
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button: {
    backgroundColor: '#1D3557',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    color: '#1D3557', // Kayıt ol butonu için renk
    fontSize: 16,
    textDecorationLine: 'underline', // Altı çizili
  },
});

export default LoginPage;
