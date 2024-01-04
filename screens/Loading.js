import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import globals from '../styles/global'
import AppContext from '../contexts/AppContext'

const Loading = () => {
    const { error } = useContext(AppContext)

  return (
    <View style={globals.container}>
      <Text>{error ? error : "Loading"}</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})