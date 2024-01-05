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
    <View style={[globals.container, styles.container]}>
        <LinearGradient
            // Background Linear Gradient
            colors={['#315673ff','black']}
            locations={[.6,1]}
            style={styles.background}
        />
        {
          error ? (
            <View><Feather name="alert-circle" size={24} color="black" />
              <Feather name="alert-circle" size={30} color="red" />
              <Text style={{color: "red"}}>{error}</Text>
            </View>
          ) : (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <Image source={AppIcon} style={styles.appicon}/>
              <Text style={{textAlign: "center", color: "white"}}>{funFacts[factIndex]}</Text>
            </View>
          )
        }
        <View style={{marginTop: 'auto', alignItems: "center", gap: 50}}>
          {
            !error && (
              <View style={{flexDirection: "row"}}>
                <BallIndicator color={"white"} size={25} />
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
    paddingVertical: 50,
    paddingHorizontal: 20
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