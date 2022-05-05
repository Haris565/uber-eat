import { View, Text, TextInput, StyleSheet, Button, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
const Profile = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState('0');
  const [lng, setLng] = useState('0');

  const onSave = () => {};

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitude"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput value={lng} onChangeText={setLng} placeholder="Longitude" style={styles.input} />
      <Pressable
        onPress={onSave}
        title="Save"
        style={{
          backgroundColor: '#F66B0E',
          padding: 15,
          alignItems: 'center',
          marginHorizontal: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{}}>Save</Text>
      </Pressable>
      <Pressable
        onPress={() => Auth.signOut()}
        title="Save"
        style={{
          borderColor: '#F66B0E',
          padding: 15,
          alignItems: 'center',
          marginHorizontal: 10,
          borderRadius: 5,
          marginTop: 10,
          borderWidth: 1,
        }}
      >
        <Text style={{ color: '#F66B0E' }}>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
  },
});

export default Profile;
