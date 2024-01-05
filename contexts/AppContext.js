import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'
import * as SplashScreen from 'expo-splash-screen';

export default AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [newUser, setNewUser] = useState(true)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [weatherData, setWeatherData] = useState(null)
    const newUserKey = 'new-user'

    const getPermissionData = async () => {
        await SplashScreen.preventAutoHideAsync();
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            return await SplashScreen.hideAsync();
          }else{
            return setError("This app needs access to your location to show you the current weather conditions and forecast for your area. Please grant the location permission to continue.")
          }
        }catch(error){
          console.log(error.message)
          return setError("This app needs access to your location to show you the current weather conditions and forecast for your area. Please grant the location permission to continue.")
        }
    }
  
    const checkForNewUser = async () => {
        try {
            const newUser = await AsyncStorage.getItem(newUserKey)
            if(newUser) setNewUser(false)
        }catch(error){
            console.log(error.message)
            return setError("Something went wrong")
        }
    }

    const fetchWeatherData = async () => {
        try {
            setLoading(true)
            const location = await Location.getCurrentPositionAsync();
            const lat = location.coords.latitude
            const lon = location.coords.longitude

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URI}?lat=${lat}&lon=${lon}`)
            if(response.status != 200) throw new Error()
            const weatherData = await response.json()
            if(!error) setLoading(false)
            setWeatherData(weatherData)
        }catch(error){
            console.log(error.message)
            return setError("Something went wrong during fetching weather data. Please check your intenet connection!..")
        }
    }

    const value = {
        weatherData,
        fetchWeatherData,
        loading,
        error,
        newUser,
        setNewUser,
        newUserKey
    }

    useEffect(()=>{
        getPermissionData()
        checkForNewUser()
        fetchWeatherData()       
    }, [])

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}