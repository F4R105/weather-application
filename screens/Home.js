import React, {useContext} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import globals from '../styles/global'
import AppContext from '../contexts/AppContext'

const Home = () => {
    const { weatherData } = useContext(AppContext)

  return (
    <View style={globals.container}>
        <Text>{weatherData?.name}</Text>
        {
            weatherData?.weather.map(item => (
                <View>
                    <Image source={{uri: item.icon}} style={{width: 100, height: 100}} />
                    <Text>{item.description}</Text>
                </View>
            ))
        }
        <Text>{weatherData?.temp}{String.fromCharCode(176)}c</Text>
        <Text>{weatherData?.humidity}</Text>
        <View>
            <Text>Wind</Text>
            <Text>Speed: {weatherData?.wind.speed}</Text>
            <Text>Degree: {weatherData?.wind.deg}</Text>
            <Text>Gust: {weatherData?.wind.gust}</Text>
        </View>
        <View>
            <Text>Sun</Text>
            <Text>Sunrise: {weatherData?.sun.sunrise}</Text>
            <Text>Sunset: {weatherData?.sun.sunset}</Text>
        </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})