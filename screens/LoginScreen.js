import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const LoginScreen = ({navigation}) => {
  const [name, setName] = useState('')

  const continueNav = () => {
    navigation.navigate('Chat', {name})
  }
  return (
    <View>
      <View style={StyleSheet.circle} />
      <View style={{marginTop: 64}}>
        <Image source={require("../assets/chat.png")} style={{width: 100, height: 100, alignSelf: 'center'}} />
      </View>
      <View style={{marginHorizontal: 32}}>
        <Text style={styles.header}>Username</Text>
        <TextInput style={styles.input} placeholder="username" onChangeText={name => setName(name)} value={name} />
      </View>
      <View style={{alignItems: 'flex-end', marginTop: 64}}>
        <TouchableOpacity style={styles.continue} onPress={continueNav}>
          <Ionicons name='md-arrow-round-forward' size={24} color='#FFF' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7"
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: "#FFF",
    position: 'absolute',
    left: -120,
    top: -20
  },
  header: {
    fontWeight: '800',
    fontSize: 30,
    color: '#514E5A',
    marginTop: 32
  },
  input: {
    marginTop: 32,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BAB7C3',
    borderRadius: 16,
    paddingHorizontal: 16,
    color: '#514E5a',
    fontWeight: '600'
  },
  continue: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: '#9075E3',
    alignItems: 'center',
    justifyContent: 'center'
  }
});