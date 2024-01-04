import React, {useContext} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import globals from '../styles/global'
import AppContext from '../contexts/AppContext'
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const { weatherData, fetchWeatherData } = useContext(AppContext)
    const navigation = useNavigation()

  return (
    <View style={[globals.container, styles.container]}>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.navigate('Settings')} style={{width: 35, height: 35, borderRadius: 5, justifyContent: "center", alignItems: "center"}}>
                <Ionicons name="settings" size={25} color="white" />
            </TouchableOpacity>
        </View>
        <Text style={[globals.text, styles.temperature]}>{weatherData?.temp}{String.fromCharCode(176)}c</Text>
        <View>
            <Text style={[globals.text, styles.region]}>{weatherData?.name}</Text>
            <Text style={[globals.text, styles.country]}>Tanzania</Text>
        </View>
        <View style={{marginTop: 50}}>
            {
                weatherData?.weather.map(item => (
                    <View key={item.description} style={styles.oneWeather}>
                        <Image source={{uri: item.icon}} style={styles.weatherIcon}  />
                        <Text style={[globals.text, styles.description]}>{weatherData?.weather[0].description}</Text>
                    </View>
                ))
            }
        </View>
        <TouchableOpacity onPress={fetchWeatherData} style={{marginTop: 30}}>
            <Ionicons name="refresh-outline" size={24} color="white" />
        </TouchableOpacity>
        <View style={{width: "100%", marginTop: "auto", paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between"}}>
            <View>
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
            <View>
                <Text style={[globals.text, styles.infoTitle]}>Wind</Text>
                <View>

                </View>
                <Text style={[globals.text]}>Speed: {weatherData?.wind.speed}</Text>
                <Text style={[globals.text]}>Degree: {weatherData?.wind.deg}</Text>
                <Text style={[globals.text]}>Gust: {weatherData?.wind.gust}</Text>
            </View>
            <View>
                <Text style={[globals.text, styles.infoTitle]}>Humidity</Text>
                <Text style={[globals.text, styles.humidity]}>{weatherData?.humidity}</Text>
            </View>
        </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 50
        // gap: 20
    },
    header: {
        width: "100%",
        padding: 40,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    region: {
        fontSize: 30,
    },
    country: {
        fontSize: 13,
        textAlign: "center"
    },
    oneWeather: {
        borderColor: "white",
        borderRadius: 10,
        // borderWidth: 2,
        paddingBottom: 15,
        paddingHorizontal: 8,
        elevation: 5,
        backgroundColor: "#0000cdff"
    },
    weatherIcon: {
        width: 100,
        height: 100
    },
    description: {
        textAlign: "center"
    },
    temperature: {
        fontSize: 100,
        fontWeight: "bold"
    },
    infoTitle: {
        fontWeight: "bold",
        marginBottom: 10
    },
    humidity: {
        fontSize: 25,
        textAlign: "right"
    }
})