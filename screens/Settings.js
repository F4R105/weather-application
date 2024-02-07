import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globals from '../styles/global'
import { LinearGradient } from 'expo-linear-gradient'

const screenHeight = Dimensions.get('screen').height;

const Settings = () => {
  return (
    <View style={[globals.container, styles.container]}>
      {/* <Text>Settings</Text> */}
      <LinearGradient
          colors={['#315673ff','black']}
          locations={[.6,1]}
          style={styles.background}
      />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#315673ff"
  },
  background: {
    position: 'absolute',
    // flex: 1,
    height: screenHeight,
    left: 0,
    right: 0,
    top: 0,
  },
})