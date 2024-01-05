import { Dimensions, TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import globals from '../styles/global'
import AppContext from '../contexts/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const BackgroundImage = require('../assets/background_image.jpg')
const OnBoardingImage = require('../assets/onboarding_weather_icon.png')
const screenHeight = Dimensions.get('screen').height;

const OnBoarding = () => {
    const { setNewUser, newUserKey } = useContext(AppContext)
  return (
    <View style={[globals.container]}>
        <Image source={BackgroundImage} />
          <LinearGradient
            colors={['transparent','#315673ff']}
            locations={[0,1]}
            style={styles.contentContainer}
          >
          <Image source={OnBoardingImage} style={styles.onboardingImage}/>
          <Text style={{fontSize: 30, fontWeight: "bold", color: "#e3be02ff"}}>Welcome</Text>
          <View style={styles.features}>
            <Text style={styles.feature}>Welcome to the app that gives you the most accurate and relevant weather information for Tanzania.</Text>
            <Text style={styles.feature}>You can easily check the wind, sunrise and sunset times, humidity and temperature in centigrades for your location in Tanzania.</Text>
            <Text style={styles.feature}>You can also discover fun facts about weather, such as how to measure the height of a mountain using thunder, or why the sun can have different colors.</Text>
          </View>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={()=>{
              setNewUser(false)
              AsyncStorage.setItem(newUserKey, 'false')
            }}
          >
            <Text style={{fontSize: 20, textAlign: "center"}}>START</Text>
          </TouchableOpacity>
        </LinearGradient>
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  container: {

  },
  contentContainer: {
    paddingVertical: 50,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "#315673ff",
    opacity: .95,
    alignItems: "center"
  },
  onboardingImage: {
    width: 200,
    height: 200
  },
  startBtn: {
    width: "60%",
    marginTop: "auto",
    backgroundColor: "#e3be02ff",
    padding: 10,
    borderRadius: 5
  },
  features: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    gap: 20
  },
  feature: {
    fontSize: 15,
    color: "white",
    textAlign: "center"
  }
})