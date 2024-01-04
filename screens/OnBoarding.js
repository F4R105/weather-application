import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import globals from '../styles/global'
import AppContext from '../contexts/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoarding = () => {
    const { setNewUser, newUserKey } = useContext(AppContext)
  return (
    <View style={globals.container}>
      <Text>OnBoarding</Text>
      <Pressable onPress={()=>{
        setNewUser(false)
        AsyncStorage.setItem(newUserKey, 'false')
      }}>
        <Text>Start</Text>
      </Pressable>
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({})