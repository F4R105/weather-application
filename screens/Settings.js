import React, { useContext, useState, useRef, useCallback } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import globals from '../styles/global'
import { LinearGradient } from 'expo-linear-gradient'
import AppContext from '../contexts/AppContext';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import tanzaniaRegions from "../utils/regions"
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('screen').height;

const Region = ({ item }) => {
  const navigation = useNavigation()
  const { fetchWeatherData, setError } = useContext(AppContext)

  const getOtherLocationGeoData = async (city) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_GEOCODE_URI}?q=${city}&limit=1&appid=${process.env.EXPO_PUBLIC_API_KEY}`)
      if(response.status != 200) throw new Error("Something went wrong while getting geocode data")
      const geoData = await response.json()
      const {lat, lon} = geoData[0]
      await fetchWeatherData(lat, lon)
      navigation.navigate('Home')
    }catch(error){
      console.log('error while fetching geodata: ', error.message)
      return setError(`Sorry, Something went wrong!..`)
    }
  }

  return (
    <TouchableOpacity onPress={() => getOtherLocationGeoData(item)}>
      <Text style={styles.region}>{item}</Text>
    </TouchableOpacity>
  )
}

const Settings = () => {
  const { weatherData, currentTime } = useContext(AppContext)
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
              <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}} numberOfLines={1}>{weatherData?.name}</Text>
            </View>
            <Text style={{color: "white", fontSize: 10}} numberOfLines={1}>{weatherData?.name}, Tanzania</Text>
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
        style={styles.bottomSheet}
      >
        <View>
          <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 15, color: "#355e7d"}}>Tanzania regions</Text>
        </View>
          
        <BottomSheetFlatList
          data={tanzaniaRegions}
          keyExtractor={item => item}
          renderItem={({item}) => <Region item={item} />}
          style={{paddingVertical: 20}}
        />
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
  },
  bottomSheet: {
    paddingHorizontal: 20,
    paddingVertical:30,
    elevation: 5
  },
  region: {
    paddingVertical: 10
  }
})