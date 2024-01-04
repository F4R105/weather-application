import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import globals from '../styles/global'
import AppContext from '../contexts/AppContext'

const Loading = () => {
    const { error } = useContext(AppContext)

  return (
    <View style={globals.container}>
        <ActivityIndicator 
            color={"black"} 
            size={30} 
        />
        <Text>{error ? error : "Loading"}</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})