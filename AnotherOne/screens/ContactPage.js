import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all the fields.');
    } else {
      Alert.alert('Success', 'Your message has been sent!');
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1D3557', '#00A9E0']} style={styles.background} />
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.subtitle}>
        Have questions or feedback? We'd love to hear from you!
      </Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={24} color="#FFFFFF" />
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#BBBBBB"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" size={24} color="#FFFFFF" />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            placeholderTextColor="#BBBBBB"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.textAreaContainer}>
          <MaterialCommunityIcons name="message" size={24} color="#FFFFFF" />
          <TextInput
            style={styles.textArea}
            placeholder="Your Message"
            placeholderTextColor="#BBBBBB"
            multiline
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.contactText}>Email: support@example.com</Text>
        <Text style={styles.contactText}>Phone: +123 456 7890</Text>
      </View>

      <View style={styles.socialMedia}>
        <TouchableOpacity style={styles.socialIcon}>
          <MaterialCommunityIcons name="facebook" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <MaterialCommunityIcons name="twitter" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <MaterialCommunityIcons name="instagram" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 36,
    color: '#FFFFFF',
    fontFamily: 'Orbitron_400Regular',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#BBBBBB',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Orbitron_400Regular',
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D3557',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingLeft: 10,
    fontFamily: 'Orbitron_400Regular',
  },
  textAreaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1D3557',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    width: '100%',
  },
  textArea: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Orbitron_400Regular',
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#00A9E0',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Orbitron_400Regular',
  },
  contactInfo: {
    marginTop: 30,
    alignItems: 'center',
  },
  contactText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
    marginVertical: 5,
  },
  socialMedia: {
    flexDirection: 'row',
    marginTop: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
    backgroundColor: '#1D3557',
    borderRadius: 10,
    padding: 10,
  },
});

export default ContactPage;
