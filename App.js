import 'react-native-gesture-handler';
import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppContext, { AppContextProvider } from './contexts/AppContext';
import { Ionicons } from '@expo/vector-icons';

// SCREENS
import Home from './screens/Home';
import Loading from './screens/Loading';
import OnBoarding from './screens/OnBoarding';
import Settings from './screens/Settings';
import { Pressable, Text } from 'react-native';

const Stack = createStackNavigator();

const BackButton = () => {
  const navigation = useNavigation()

  return (
    <Pressable 
      onPress={() => navigation.navigate('Home')}
      style={{paddingLeft: 10, backgroundColor: "transparent"}}
    >
      <Ionicons name="arrow-back-circle" size={30} color="white" />
    </Pressable>
  )
}

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="Settings" 
        component={Settings} 
        options={{headerStyle: {backgroundColor: "#315673ff", height: 90}, headerTitleStyle: {color: "white"}, headerLeftContainerStyle: {color: "white"}, headerLeft: () => <BackButton />}}
      />
    </Stack.Navigator>
  );
}

const Application = () => {
  const { newUser, loading } = useContext(AppContext)
  return (
    <>
        <StatusBar style='light' />
        {
          newUser ? <OnBoarding /> : 
          loading ? <Loading /> : <MyStack />
        }
    </>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <AppContextProvider>
        <Application />
      </AppContextProvider>
    </NavigationContainer>
  );
}
