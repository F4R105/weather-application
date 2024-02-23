import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'

import { EvilIcons } from '@expo/vector-icons';
import AppContext from '../contexts/AppContext';

const Location = () => {
    const { weatherData, currentTime } = useContext(AppContext)

    return (
        <View style={[styles.card, styles.fav]}>
            <View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <EvilIcons name="location" size={23} color="black" />
                <Text style={{fontSize: 20, fontWeight: "bold", color: "black"}}>{weatherData?.name}</Text>
            </View>
            <Text style={{color: "black", fontSize: 10}}>{weatherData?.name}, Tanzania</Text>
            <Text style={{color: "black", fontSize: 10}}>Time: {currentTime}</Text>
            </View>
            <View style={{justifyContent: "center"}}>
            <Text style={{fontSize: 25, fontWeight: "bold", color: "black"}}>{weatherData?.temp}{String.fromCharCode(176)}c</Text>
            <Text style={{color: "black", fontSize: 10}}>{weatherData?.weather[0].description}</Text>
            </View>
        </View>
    )
}

const FavLocations = () => {

    return (
        <View style={{flex: 1}}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <Text style={styles.sectionHeader}>Your other favourite locations</Text>
            <TouchableOpacity>
                <Text>Clear all</Text>
            </TouchableOpacity>
        </View>
        <ScrollView>
          {new Array(8).fill(null).map( (fav, index) => (
            <Location key={index} />
          ))}
        </ScrollView>
      </View>
    )
}

export default FavLocations

const styles = StyleSheet.create({
    sectionHeader: {
        fontWeight: "bold",
        paddingVertical: 5
    },
    card: {
        marginTop: 5,
        flexDirection: "row", 
        justifyContent: "space-between", 
        backgroundColor: "#355e7d",
        borderRadius: 10,
        overflow: "hidden"
    },
    fav: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        // backgroundColor: "#9dbbd1"
        backgroundColor: "white",
        // borderColor: "#9dbbd1",
        // borderWidth: 2,
        marginBottom: 5
    },
})