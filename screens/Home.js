import React, {useContext, useCallback, useRef, useState, useEffect} from 'react'
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import globals from '../styles/global'
import AppContext from '../contexts/AppContext'
import { EvilIcons, AntDesign, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import funFacts from '../utils/funfacts';

const BackgroundImage = require('../assets/background_image.jpg')
const screenHeight = Dimensions.get('screen').height;

const Home = () => {
    const { weatherData, fetchWeatherData, currentTime } = useContext(AppContext)
    const [factIndex, setFactIndex] = useState(0)

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
        <View style={styles.header}>
            {/* <TouchableOpacity onPress={()=>navigation.navigate('Settings')} style={{width: 35, height: 35, borderRadius: 5, justifyContent: "center", alignItems: "center"}}>
                <Ionicons name="settings" size={25} color="white" />
            </TouchableOpacity> */}
        </View>
        <Text style={[globals.text, styles.temperature]}>{weatherData?.temp}{String.fromCharCode(176)}c</Text>
        <View style={{alignItems: "center"}}>
            <View style={{position: 'relative'}}>
                <EvilIcons name="location" size={40} color="white" style={{position: "absolute", right: -40, top: 5}} />
                <Text style={[globals.text, styles.region]}>{weatherData?.name}</Text>
            </View>
            <Text style={[globals.text, styles.country]}>Tanzania</Text>
            <View style={styles.currentTime}>
                <AntDesign name="clockcircleo" size={13} color="#f5c905" style={{position: "absolute", right: -18, top: 2.5}}/>
                <Text style={{fontSize: 13, color: "#f5c905"}}>{currentTime}</Text>
            </View>
        </View>
        <View style={styles.weatherContainer}>
            {
                weatherData?.weather.map(item => (
                    <View key={item.description} style={styles.oneWeather}>
                        <Image source={{uri: item.icon}} style={styles.weatherIcon}  />
                        <Text style={[globals.text, styles.description]}>{weatherData?.weather[0].description}</Text>
                    </View>
                ))
            }
        </View>
        <TouchableOpacity onPress={fetchWeatherData} style={styles.refreshBtn}>
            <Ionicons name="refresh-outline" size={24} color="white" />
        </TouchableOpacity>
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
                <View>

                </View>
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
        <View>
            <TouchableOpacity style={styles.funFactBtn} onPress={()=>{setRandomFactIndex(); handleSnapPress(0)}}>
                <Text style={globals.text}>Fun fact</Text>
            </TouchableOpacity>
        </View>
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
        justifyContent: "center",
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
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    temperature: {
        fontSize: 100,
        fontWeight: "bold",
    },
    region: {
        fontSize: 30,
        fontWeight: "bold"
    },
    country: {
        fontSize: 13,
        alignSelf: "flex-start"
        // fontWeight: "bold"
    },
    currentTime: {
        position: "relative",
        marginTop: 20,
        gap: 5,
    },
    weatherContainer:{
        flexDirection: "row",
        justifyContent: "center",
        gap: 15,
        width: "100%", 
        minHeight: 150,
        padding: 10, 
        marginTop: 50, 
    },
    oneWeather: {
        maxWidth: 100,
        borderColor: "white",
        borderRadius: 10,
        borderWidth: .5,
        paddingHorizontal: 2,
        paddingBottom: 15,
        elevation: 5,
        backgroundColor: "#4393f0ff"
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