import React, { useContext, useState, useRef, useCallback } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import globals from '../styles/global'
import { LinearGradient } from 'expo-linear-gradient'
import AppContext from '../contexts/AppContext';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';


const screenHeight = Dimensions.get('screen').height;

const Settings = () => {
  const { weatherData, fetchWeatherData, currentTime } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  const sheetRef = useRef(null)
  const snapPoints = ["70%"]

  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index)
    setIsOpen(true)
  }, [])

  return (
    <View style={[globals.container, styles.container]}>
      {/* GRADIENT */}
      <LinearGradient
          colors={['white','black']}
          locations={[.6,1]}
          style={styles.background}
      />

      {/* YOUR LOCATION */}
      <View>
        <Text style={styles.sectionHeader}>Your location</Text>
        <View style={styles.card}>
          <View style={{justifyContent: "center", padding: 10}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <EvilIcons name="location" size={23} color="white" />
              <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}>{weatherData?.name}</Text>
            </View>
            <Text style={{color: "white", fontSize: 10}}>{weatherData?.name}, Tanzania</Text>
            <Text style={{color: "white", fontSize: 10}}>Time: {currentTime}</Text>
          </View>
          <View style={{justifyContent: "center", backgroundColor: "#9dbbd1", padding: 20}}>
            <Text style={{fontSize: 25, fontWeight: "bold", color: "white"}}>{weatherData?.temp}{String.fromCharCode(176)}c</Text>
            <Text style={{color: "white", fontSize: 10}}>{weatherData?.weather[0].description}</Text>
          </View>
        </View>
      </View>

      {/* OTHER LOCATION */}
      <View>
        <Text style={styles.sectionHeader}>Your other favourite location</Text>
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
      </View>

      {/* OTHER LOCATION */}
      <View>
        <Text style={styles.sectionHeader}>Other location</Text>
        <View style={styles.addLocation}>
          <TouchableOpacity style={{alignItems: "center"}} onPress={()=>{handleSnapPress(0)}}>
            <Entypo name="add-to-list" size={25} color="black" />
            <Text style={{fontSize: 12}}>Add location</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* BOTTOM SHEET */}
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={()=>setIsOpen(false)}
      >
          <BottomSheetView style={{padding: 30}}>
              <Text style={{fontSize: 20,textAlign: "center", color: "#315673ff"}}>Hello world</Text>
          </BottomSheetView>
      </BottomSheet>
    </View>

    
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#315673ff",
    padding: 20,
    gap: 20
  },
  background: {
    position: 'absolute',
    // flex: 1,
    height: screenHeight,
    left: 0,
    right: 0,
    top: 0,
  },
  sectionHeader: {
    fontWeight: "bold",
    marginBottom: 5
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
    backgroundColor: "transparent",
    borderColor: "#9dbbd1",
    borderWidth: 2
  },
  addLocation: {
    borderColor: "#9dbbd1",
    borderWidth: 2,
    height: 80,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  }
})