import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import GetStarted from './src/Screens/GetStarted';
import { useFonts } from 'expo-font';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import { navigate, navigationRef, navigateFromStack } from './Navigations';
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
import { ProfileBtmIcon, SalonProfileIcon, ScheduleAppBtmIcon } from './src/Components/Svgs';
import Clients from './src/Screens/Clients';
import ClientProfile from './src/Screens/ClientProfile';
import NewAppoint from './src/Screens/NewAppoint';
import AddNewClient from './src/Screens/AddNewClient';
import Appointments from './src/Screens/Appointments';
import PendingAppoint from './src/Screens/PendingAppoint';
import Notifications from './src/Screens/Notifications';
import SalonProfile from './src/Screens/SalonProfile';
import SettingsScreen from './src/Screens/SettingsScreen';
import PersonalSettings from './src/Screens/PersonalSettings';
import NotificationsS from './src/Screens/NotificationsS';
import Language from './src/Screens/Language';
import AdvancedSettings from './src/Screens/AdvancedSettings';
import BookingSettings from './src/Screens/BookingSettings';
import RevenuePolicies from './src/Screens/RevenuePolicies';
import ProfileLinks from './src/Screens/ProfileLinks';
import SubscriptionAndBiiling from './src/Screens/SubscriptionAndBilling';
import CauffAppS from './src/Screens/CauffAppS';
import TermsOfUse from './src/Screens/TermsOfUse';
import PrivacyPolicy from './src/Screens/PrivacyPolicy';
import SendFeedBack from './src/Screens/SendFeedBacks';
import Confirmed from './src/Screens/Confirmed';
import CheckOut from './src/Screens/CheckOut';
import CheckOut2 from './src/Screens/CheckOut2';
import CheckOutComplete from './src/Screens/CheckOutComplete';
import CancelAppointment from './src/Screens/CancelAppointment';
import Chats from './src/Screens/Chat';
import MassMsg from './src/Screens/MassMsg';
import EditClientsProfile from './src/Screens/EditClientsProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeItem, retrieveItem, doConsole, checkLoginSteps } from './src/utils/functions'
import { urls } from './src/utils/Api_urls';
import { apiRequest } from './src/utils/apiCalls';
import { loggedInObservable } from './Common';


const Stack = createStackNavigator()
const BottomTabs = createMaterialBottomTabNavigator();


function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      {/* <Stack.Screen name="GetStarted" component={GetStarted} /> */}
      {/* <Stack.Screen name="EmailAddress" component={EmailAddress} /> */}
      {/* <Stack.Screen name="AboutInfo" component={AboutInfo} /> */}
      {/* <Stack.Screen name="PasswordSetup" component={PasswordSetup} /> */}
      {/* <Stack.Screen name="SearchAddress" component={SearchAddress} /> */}
      {/* <Stack.Screen name="Address" component={Address} /> */}
      {/* <Stack.Screen name="MapLocation" component={MapLocation} /> */}
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


function ClientsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Clients" component={Clients} />
      <Stack.Screen name="ClientProfile" component={ClientProfile} />
      <Stack.Screen name="NewAppoint" component={NewAppoint} />
      <Stack.Screen name="AddNewClient" component={AddNewClient} />
      <Stack.Screen name="EditClientsProfile" component={EditClientsProfile} />
    </Stack.Navigator>
  )
}

function AppointmentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="PendingAppoint" component={PendingAppoint} />
    </Stack.Navigator>

  )
}

function SalonProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="SalonProfile" component={SalonProfile} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>

  )
}



function BottomTabNavigator() {
  return (
    <BottomTabs.Navigator
      inactiveColor="rgba(255, 255, 255, 0.5)"
      activeColor="#E2B378"
      barStyle={{
        backgroundColor: '#1D1D1D'
      }}
      shifting={false}
    // labeled={false}
    >

      <BottomTabs.Screen
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => (
            <ScheduleAppBtmIcon color={color} />
          )
        }}
        name="AppointmentStack" component={AppointmentStack} />

      <BottomTabs.Screen
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => (
            <ProfileBtmIcon color={color} />
          )
        }}
        name="ClientsStack" component={ClientsStack} />
      <BottomTabs.Screen
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => (
            <SalonProfileIcon color={color} />
          )
        }}
        name="SalonProfileStack" component={SalonProfileStack} />

    </BottomTabs.Navigator>
  )
}


const useForceUpdate = () => {
  const [, updateState] = React.useState();
  return React.useCallback(() => updateState({}), []);
}


export default function App() {

  const forceUpdate = useForceUpdate();
  const [loaded] = useFonts({
    ABRe: require('./assets/fonts/Abel/Abel-Regular.ttf'),
    PBo: require('./assets/fonts/Poppins-Bold.ttf'),
  })
  const [loggedIn, setLoggedIn] = useState(0);
  const [loading, setLoading] = useState(false)


  const checkWithServer = (data) => {
    if (data) var token = data.token;
    else var token = "khali";
    var body_data = { token: token };
    doConsole(" I request @ " + urls.API + "check_login_vendor");
    doConsole(body_data);

    fetch(urls.API + 'check_login_vendor', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body_data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setLoading(false)
        doConsole(" I receive ");
        doConsole(data);
        if (data.action == "success") {
          storeItem("login_data", data.data)
            .then(dataa => {
              var step = data.data.step
              if (step && step == 0 || step == null) {
                setLoggedIn(2)
                return
              }
              // var step = data.step;
              if (step > 7) {
                setLoggedIn(1)
                forceUpdate();
                return
              }
              else if (step < 8) {
                setLoggedIn(2)
                forceUpdate();
              }

              if (step == 1) {
                navigate('AboutInfo')
                return
              }
              else if (step == 2) {
                navigate('PasswordSetup')
                return
              }
              else if (step == 3) {
                navigate('Address')
                return
              }
              else if (step == 4) {
                navigate('Address')
                return
              }
              else if (step == 5) {
                navigate('SalonTiming')
                return
              }
              else if (step == 6) {
                navigate('AddSalonPhoto')
                return
              }
              else if (step == 7) {
                navigate('AddServices')
                return
              }


              setLoggedIn(1)
              forceUpdate()
            });
        }
        else {
          console.log('else')
          setLoggedIn(2)
          forceUpdate()
        }

      }).catch((error) => {
        console.log(error)
        setLoading(false)
        setLoggedIn(2)
        forceUpdate()
      });

  }
  function checkLogin() {
    loggedInObservable.subscribe((v) => {
      console.log("Yessss won the warrrrr");
      console.log(v)
      console.log(v)
      setLoggedIn(v)
    })
  }

  useEffect(() => {

    // storeItem('login_data','')
    setLoading(true)
    retrieveItem('login_data')
      .then(data => {
        console.log('local storage data')
        console.log(data)

        if (data?.token) {
          checkWithServer(data)
        }
        else {
          setLoggedIn(2)
          checkLoginSteps()
          forceUpdate();
        }
      })
    checkLogin();
  }, [])





  if (!loaded) return null

  return (
    <NavigationContainer
      ref={navigationRef}
    >


      {
        loggedIn == 2 ?
          <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="AuthStack" component={AuthStack} />
          </Stack.Navigator>
          : null
      }
      {
        loggedIn == 1 &&
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
          <Stack.Screen name="Notifications" component={Notifications} />

          <Stack.Screen name="PersonalSettings" component={PersonalSettings} />
          <Stack.Screen name="NotificationsS" component={NotificationsS} />
          <Stack.Screen name="Language" component={Language} />
          <Stack.Screen name="AdvancedSettings" component={AdvancedSettings} />
          <Stack.Screen name="BookingSettings" component={BookingSettings} />
          <Stack.Screen name="RevenuePolicies" component={RevenuePolicies} />
          <Stack.Screen name="ProfileLinks" component={ProfileLinks} />
          <Stack.Screen name="SubscriptionAndBiiling" component={SubscriptionAndBiiling} />
          <Stack.Screen name="CauffAppS" component={CauffAppS} />
          <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="SendFeedBack" component={SendFeedBack} />
          <Stack.Screen name="Confirmed" component={Confirmed} />
          <Stack.Screen name="CancelAppointment" component={CancelAppointment} />

          <Stack.Screen name="CheckOut" component={CheckOut} />
          <Stack.Screen name="CheckOut2" component={CheckOut2} />
          <Stack.Screen name="CheckOutComplete" component={CheckOutComplete} />

          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="MassMsg" component={MassMsg} />

        </Stack.Navigator>
      }
    </NavigationContainer >

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
