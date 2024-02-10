import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'
import * as SplashScreen from 'expo-splash-screen';

export default AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [newUser, setNewUser] = useState(true)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentTime, setCurrentTime] = useState(null)
    const [weatherData, setWeatherData] = useState(null)
    const newUserKey = 'new-user'

    const getCurrentTime = () => {
      const now = new Date()

      let hours = now.getHours().toString().padStart(2, "0")
      let minutes = now.getMinutes().toString().padStart(2, "0")

      const currentTime = hours + ":" + minutes

      setCurrentTime(currentTime)
    }

    const checkForNewUser = async () => {
        try {
            const newUser = await AsyncStorage.getItem(newUserKey)
            if(newUser) setNewUser(false)
        }catch(error){
            console.log('error while checking for new user: ', error.message)
            setError("Something went wrong")
            return await SplashScreen.hideAsync()
        }
    }

    const getSunriseAndSunsetTimes = (timezone, sunrise, sunset) => {
        const sunrise_time = new Date((sunrise + timezone) * 1000);
        let sunset_time = new Date((sunset + timezone) * 1000);
      
        return {
          sunrise: sunrise_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sunset: sunset_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    }

    const getCurrentLocationData = async () => {
      try {
        // console.log('trying to get location data')
        const location = await Location.getCurrentPositionAsync();
        const lat = location.coords.latitude
        const lon = location.coords.longitude
        return {lat,lon}
      }catch(error){
        console.log("error getting current location", error.message)
        setError("Something went wrong")
        return await SplashScreen.hideAsync()
      }
    }

    const fetchWeatherData = async () => {
        try {
            setLoading(true)
            const { lat, lon } = await getCurrentLocationData()

            // console.log('getting weather data', 'lat -> ', lat, ', lon -> ', lon)
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URI}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.EXPO_PUBLIC_API_KEY}`)
            if(response.status != 200) throw new Error()
            const data = await response.json()
          
            // console.log('weather data -> ', data)
            const {weather, main, name, sys, timezone, wind} = data
            const {country, sunrise, sunset} = sys
            if(country !== "TZ") return res.status(406).json({ message: "Country not supported"})
            const weatherData = {
                name, 
                temp: parseInt(main.temp), 
                weather: weather.map(weatherItem => 
                  ({
                    description: weatherItem.description, 
                    icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
                  })
                ),
                humidity: main.humidity,
                wind,
                sun: getSunriseAndSunsetTimes(timezone, sunrise, sunset)
            }
            if(!error) setLoading(false)
            getCurrentTime()
            setWeatherData(weatherData)
        }catch(error){
            console.log('error while fetching weather: ', error.message)
            setError(`Sorry, Something went wrong!..`)
            return await SplashScreen.hideAsync()
        }
    }


    const getPermissionData = async () => {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            return setError("This app needs access to your location to show you the current weather conditions and forecast for your area. Please grant the location permission on your phone settings to continue.")
          }
        }catch(error){
          console.log('error while requesting for permission: ', error.message)
          return setError("This app needs access to your location to show you the current weather conditions and forecast for your area. Please grant the location permission to continue.")
        }
    }

    const prepareApp = async () => {
      await SplashScreen.preventAutoHideAsync();
      await getPermissionData()   
      await checkForNewUser()
      await SplashScreen.hideAsync()
      await fetchWeatherData()
    }

    const value = {
        weatherData,
        fetchWeatherData,
        loading,
        error,
        newUser,
        setNewUser,
        newUserKey,
        currentTime
    }

    useEffect(()=>{
      prepareApp()
    }, [])

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}
