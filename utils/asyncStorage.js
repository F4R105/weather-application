import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const STORAGE_KEY = "favourite-locations"

const showToast = (type, heading, subHeading) => {
    Toast.show({
      type: type,
      text1: heading,
      text2: subHeading,
    });
  }

export const addLocationToStorage = async (value) => {
    try {
        showToast('success', 'Muleba', 'Location added to favourites')
        // await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (e) {
        console.log(e.message)
    }
} 

export const getFavoriteLocations = async () => {
    try {
        showToast('error', 'Get favourite locations', 'Location removed from favourites')
        // await AsyncStorage.getItem(STORAGE_KEY);
    } catch (e) {
        console.log(e.message)
    }
}

export const removeLocationFromStorage = async () => {
    try {
        showToast('error', 'Muleba', 'Location removed from favourites')
        // await AsyncStorage.getItem(STORAGE_KEY);
    } catch (e) {
        console.log(e.message)
    }
}

export const clearStorage = async () => {
    try {
        showToast('error', 'Storage cleared', 'Location removed from favourites')
        // await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.log(e.message)
    }
}