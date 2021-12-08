import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GetStarted from './src/Screens/GetStarted';
import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigationRef } from './Navigations';
import EmailAddress from './src/Screens/EmailAddress';
import AboutInfo from './src/Screens/AboutInfo';
import PasswordSetup from './src/Screens/PasswordSetup';
import SearchAddress from './src/Screens/SearchAddress';
import Address from './src/Screens/Address';
import MapLocation from './src/Screens/MapLocation';
import SalonTiming from './src/Screens/SalonTiming';
import SalonTimingSet from './src/Screens/SalonTimingSet';
import AddSalonPhoto from './src/Screens/AddSalonPhoto';
import AddServices from './src/Screens/AddServices';
import ServiceDetails from './src/Screens/ServiceDetails';
import PaymentMethd from './src/Screens/PaymentMethod';
import Congrats from './src/Screens/Congrats';



const Stack = createStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="EmailAddress" component={EmailAddress} />
      <Stack.Screen name="AboutInfo" component={AboutInfo} />
      <Stack.Screen name="PasswordSetup" component={PasswordSetup} />
      <Stack.Screen name="SearchAddress" component={SearchAddress} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="MapLocation" component={MapLocation} />
      <Stack.Screen name="SalonTiming" component={SalonTiming} />
      <Stack.Screen name="SalonTimingSet" component={SalonTimingSet} />
      <Stack.Screen name="AddSalonPhoto" component={AddSalonPhoto} />
      <Stack.Screen name="AddServices" component={AddServices} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="PaymentMethd" component={PaymentMethd} />
      <Stack.Screen name="Congrats" component={Congrats} />
    </Stack.Navigator>
  )

}

export default function App() {


  const [loaded] = useFonts({
    AbRe: require('./assets/fonts/Abel/Abel-Regular.ttf'),

  })

  if(!loaded) return null



  return (
    <NavigationContainer
      ref={navigationRef}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
