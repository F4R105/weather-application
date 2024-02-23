import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const EmptyFav = () => {
  return (
    <View style={styles.empty}>
        <View style={{flexDirection: "row", alignItems: "center", alignSelf: "center"}}>
            <Ionicons name="alert" size={24} color="gray" />
            <Text style={{color: "gray"}}>You don't have favourite locations yet</Text>
        </View>
        <View style={{gap: 5, alignSelf: "center", alignItems: "center", marginTop: 20, opacity: .2}}>
            <MaterialIcons name="favorite-outline" size={20} color="black" />
            <Text style={{fontSize: 10, width: 100, textAlign: "center"}}>Press the icon on home screen to add location to your favourites</Text>
        </View>
    </View>
  )
}

export default EmptyFav

const styles = StyleSheet.create({
    empty: {
        minHeight: "30%",
        justifyContent: "center",
    },
})