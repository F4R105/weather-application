import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import globals from '../styles/global'
import AppContext from '../contexts/AppContext'
import { LinearGradient } from 'expo-linear-gradient';
const AppIcon = require('../assets/icon-ts.png')
const screenHeight = Dimensions.get('screen').height;
import funFacts from '../utils/funfacts';
import {BallIndicator} from 'react-native-indicators';
import { Feather } from '@expo/vector-icons';

const Loading = () => {
    const { error } = useContext(AppContext)
    const [factIndex, setFactIndex] = useState(0)

    useEffect(()=>{
      var randomIndex = Math.floor(Math.random() * funFacts.length);
      setFactIndex(randomIndex)
    },[])

  return (
    <View style={styles.container}>
        <LinearGradient
            // Background Linear Gradient
            colors={['#315673ff','black']}
            locations={[.6,1]}
            style={styles.background}
        />
        {
          error ? (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <View style={{backgroundColor: "white", paddingHorizontal: 10, paddingVertical: 20, borderRadius: 8, alignItems: "center", gap: 20, elevation: 5}}>
                <Feather name="alert-circle" size={50} color="#f18b8b" />
                <Text style={{color: "#f18b8b", textAlign: "center", fontWeight: "bold"}}>{error}</Text>
              </View>
            </View>
          ) : (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <Image source={AppIcon} style={styles.appicon}/>
              <Text style={{textAlign: "center", color: "white", paddingHorizontal: 10}}>{funFacts[factIndex]}</Text>
            </View>
          )
        }
        <View style={{height: 100, justifyContent: "center", alignItems: "center"}}>
          {
            !error && (
              <View style={{height: 60}}>
                <BallIndicator color={"white"} size={25} />
                <Text style={{color: "white", fontSize: 12}}>Loading...</Text>
              </View>
            )
          }
        </View>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    position: 'absolute',
    // flex: 1,
    height: screenHeight,
    left: 0,
    right: 0,
    top: 0,
  },
  appicon: {
    width: 100,
    height: 100
  }
})