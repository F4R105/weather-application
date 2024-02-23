import React, {useContext, useCallback, useRef, useState, useEffect} from 'react'
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import globals from '../styles/global'
import AppContext from '../contexts/AppContext'
import { EvilIcons, AntDesign, Ionicons, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import funFacts from '../utils/funfacts';
import { useNavigation } from '@react-navigation/native';
import * as STORAGE from '../utils/asyncStorage'
import Toast from 'react-native-toast-message';

const BackgroundImage = require('../assets/background_image.jpg')
const screenHeight = Dimensions.get('screen').height;

const Home = () => {
    const navigation = useNavigation()
    
    const { weatherData, fetchWeatherData, currentTime, getCurrentLocationData } = useContext(AppContext)
    const [factIndex, setFactIndex] = useState(0)
    const [favourite, setFavourite] = useState(false)

    const sheetRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const snapPoints = ["30%"]

    const handleSnapPress = useCallback(index => {
        sheetRef.current?.snapToIndex(index)
        setIsOpen(true)
    }, [])

    const setRandomFactIndex = () => {
        var randomIndex = Math.floor(Math.random() * funFacts.length);
        setFactIndex(randomIndex)
    }

  return (
    <ImageBackground source={BackgroundImage} style={[globals.container, styles.container]}>
        <LinearGradient
            colors={['#315673ff','black']}
            locations={[.6,1]}
            style={styles.background}
        />

        {/* HEADER */}
        <View style={styles.header}>
            <TouchableOpacity 
                onPress={()=>{
                    (favourite) ? STORAGE.removeLocationFromStorage() : STORAGE.addLocationToStorage()
                    setFavourite(index => !index)
                }} 
                style={{width: 35, height: 35, borderRadius: 5, justifyContent: "center", alignItems: "center"}}
            >
                {favourite ? (
                    <MaterialIcons name="favorite" size={26} color="#f18b8b" />
                ): (
                    <MaterialIcons name="favorite-outline" size={26} color="white" />
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('Settings')} style={{width: 35, height: 35, borderRadius: 5, justifyContent: "center", alignItems: "center"}}>
                <Feather name="menu" size={25} color="white" />
            </TouchableOpacity>
        </View>

        <Toast />

        {/* LOCATION */}
        <View style={{alignItems: "center"}}>
            <View style={{position: 'relative'}}>
                <EvilIcons name="location" size={40} color="white" style={{position: "absolute", left: -40, top: "80%", transform: [{translateY: -17}]}} />
                <Text style={[globals.text, styles.region]} numberOfLines={1}>{weatherData?.name}</Text>
            </View>
            <Text style={[globals.text, styles.country]}>Tanzania</Text>
        </View>

        {/* TEMPERATURE & TIME*/}
        <Text style={[globals.text, styles.temperature]}>{weatherData?.temp}{String.fromCharCode(176)}c</Text>

        {/* TIME FOR WEATHER DATA */}
        <View style={styles.currentTime}>
            <AntDesign name="clockcircleo" size={10} color="#f5c905"/>
            <Text style={{fontSize: 13, color: "#f5c905"}}>{currentTime}</Text>
        </View>

        {/* WEATHER IMAGES */}
        <View style={styles.weatherContainer}>
            {
                weatherData?.weather.map(item => (
                    <View key={item.description} style={styles.oneWeather}>
                        <Image source={{uri: item.icon}} style={styles.weatherIcon}  />
                        <Text style={[globals.text, styles.description]}>{item.description}</Text>
                    </View>
                ))
            }
        </View>

        {/* REFRESH BUTTON */}
        <TouchableOpacity
            style={styles.refreshBtn}
            onPress={async () => {
                const { lat, lon } = await getCurrentLocationData()
                fetchWeatherData(lat, lon)
            }} 
        >
            <Ionicons name="refresh-outline" size={24} color="white" />
        </TouchableOpacity>

        {/* WEATHER EXTRA INFO */}
        <View style={{width: "100%", marginTop: "auto", paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between"}}>
            <View>
                <Feather name="sun" size={24} color="white" />
                <Text style={[globals.text, styles.infoTitle]}>Sun</Text>
                <View style={{flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 5}}>
                    <Feather name="sunrise" size={24} color="white" />
                    <Text style={[globals.text]}>{weatherData?.sun.sunrise}</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                    <Feather name="sunset" size={24} color="white" />
                    <Text  style={[globals.text]}>{weatherData?.sun.sunset}</Text>
                </View>
            </View>
            <View style={{width: 1, height: "50%", backgroundColor: "white", alignSelf: "center"}}></View>
            <View>
                <Feather name="wind" size={24} color="white" />
                <Text style={[globals.text, styles.infoTitle]}>Wind</Text>
                <Text style={[globals.text]}>Speed: {weatherData?.wind.speed} <Text style={{fontSize: 10}}>km/h</Text></Text>
                <Text style={[globals.text]}>Degree: {weatherData?.wind.deg} <Text style={{fontSize: 10}}>deg</Text></Text>
                <Text style={[globals.text]}>Gust: {weatherData?.wind.gust} <Text style={{fontSize: 10}}>km/h</Text></Text>
            </View>
            <View style={{width: 1, height: "50%", backgroundColor: "white", alignSelf: "center"}}></View>
            <View>
                <MaterialCommunityIcons name="air-humidifier" size={24} color="white" />
                <Text style={[globals.text, styles.infoTitle]}>Humidity</Text>
                <Text style={[globals.text, styles.humidity]}>{weatherData?.humidity} %</Text>
            </View>
        </View>


        {/* FUN FACT */}
        <View>
            <TouchableOpacity style={styles.funFactBtn} onPress={()=>{setRandomFactIndex(); handleSnapPress(0)}}>
                <Text style={globals.text}>Fun fact</Text>
            </TouchableOpacity>
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
                <Text style={{fontSize: 20,textAlign: "center", color: "#315673ff"}}>{funFacts[factIndex]}</Text>
            </BottomSheetView>
        </BottomSheet>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        alignItems: "center",
        paddingVertical: 50,
        resizeMode: "cover",
        // gap: 20
    },
    background: {
        position: 'absolute',
        // flex: 1,
        height: screenHeight,
        left: 0,
        right: 0,
        top: 0,
    },
    header: {
        width: "100%",
        padding: 20,
        gap: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    temperature: {
        fontSize: 80,
        fontWeight: "bold",
        paddingVertical: 20
    },
    region: {
        fontSize: 25,
        fontWeight: "bold",
        // paddingVertical: 5
    },
    country: {
        fontSize: 13,
    },
    currentTime: {
        position: "relative",
        alignItems: "center",
        gap: 5,
    },
    weatherContainer:{
        flexDirection: "row",
        justifyContent: "center",
        gap: 15,
        width: "100%", 
        minHeight: 150,
        padding: 10, 
        marginTop: 15, 
    },
    oneWeather: {
        maxWidth: 100,
        borderColor: "white",
        borderRadius: 10,
        borderWidth: .5,
        paddingHorizontal: 2,
        paddingBottom: 15,
        elevation: 5,
        backgroundColor: "#4393f0ff",
    },
    weatherIcon: {
        width: 100,
        height: 100
    },
    description: {
        textAlign: "center"
    },
    refreshBtn: {
        marginTop: 20,
        padding: 10,
        borderRadius: 100,
        elevation: 3,
        backgroundColor: "#1c1b1b"
    }, 
    infoTitle: {
        color: "#4393f0ff",
        fontWeight: "bold",
        marginBottom: 10
    },
    humidity: {
        fontSize: 25,    
    },
    funFactBtn: {
        backgroundColor: "#1c1b1b",
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        elevation: 5,
    }
})