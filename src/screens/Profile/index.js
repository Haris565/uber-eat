import { View, Text, TextInput, StyleSheet, Button, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
import { User } from '../../models';
import { DataStore } from 'aws-amplify';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
const Profile = () => {
  const { sub, setDbUser, authUser, dbUser } = useAuthContext();
  const [name, setName] = useState(dbUser?.name || '');
  const [address, setAddress] = useState(dbUser?.address || '');
  const [lat, setLat] = useState(dbUser?.lat.toString() || '');
  const [lng, setLng] = useState(dbUser?.lng.toString() || '');
  const navigation = useNavigation();

  const onSave = async () => {
    try {
      if (!dbUser) {
        if (!name.length > 0 && !address.length > 0) {
          Alert.alert('Cant be empty');
          return;
        }
        let user = await DataStore.save(
          new User({ name, address, lng: parseFloat(lng), lat: parseFloat(lat), sub })
        );
        if (user) {
          setDbUser(user);
          Alert.alert('User saved successfully');
        }
      } else {
        let user = await DataStore.save(
          User.copyOf(dbUser, (updated) => {
            updated.name = name;
            updated.address = address;
            updated.lat = parseFloat(lat);
            updated.lng = parseFloat(lng);
          })
        );
        console.log('Db', user);
        setDbUser(user);
        Alert.alert('User updated successfully');
        navigation.navigate('Restaurants');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // useEffect(() => {
  //   DataStore.query(User, (user) => user.sub('eq', sub)).then((users) => {
  //     setAddress(users[0].user.address);
  //     setName(users[0].user.Name);
  //     setLng(users[0].user.lng);
  //     setLat(users[0].user.lat);
  //     console.log('user', users[0].user);
  //   });
  // }, []);

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
