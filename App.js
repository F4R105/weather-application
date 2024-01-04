import 'react-native-gesture-handler';
import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppContext, { AppContextProvider } from './contexts/AppContext';
import { Ionicons } from '@expo/vector-icons';
import globals from './styles/global';

// SCREENS
import Home from './screens/Home';
import Loading from './screens/Loading';
import OnBoarding from './screens/OnBoarding';
import Settings from './screens/Settings';
import { Pressable } from 'react-native';

const Stack = createStackNavigator();

const MyStack = () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{headerShown: false}}
      />
      <Stack.Screen name="Settings" component={Settings} />
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
