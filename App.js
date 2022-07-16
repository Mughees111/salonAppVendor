import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import GetStarted from './src/Screens/GetStarted';
import { useFonts } from 'expo-font';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons'

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
import { loggedInObservable, navigateToPostNow } from './Common';
import { Provider } from './src/Context/DataContext';
import EditProfile from './src/Screens/EditProfile';
import EditHours from './src/Screens/EditHours';
import EditServices from './src/Screens/EditServices';
import SignIn from './src/Screens/SignIn';
import AllAppoints from './src/Screens/AllAppoints';
import SeeAllServices from './src/Screens/SeeAllServices';
import BookAppointment from './src/Screens/BookAppointment';
import MakeGroup from './src/Screens/MakeGroup';
import AllReviews from './src/Screens/AllReviews';
import PaypalAccount from './src/Screens/PaypalAccount';
import PaymentMethods from './src/Screens/PaymentMethod1';
import UserChat from './src/Screens/UserChat';
import ChatDetails from './src/Screens/ChatDetails';
import GroupMessages from './src/Screens/GroupMessages';
import HealthSafety from './src/Screens/HealthSafety';
import DelAccount from './src/Screens/DelAccount';
import Support from './src/Screens/Support';
import Insights from './src/Screens/Insights';

import * as Notificationss from 'expo-notifications'
import DropdownAlert from 'react-native-dropdownalert';
import AddCardDetails from './src/Screens/AddCardDetails';
import AccountStatement from './src/Screens/AccountStatement';
import AddCancellation from './src/Screens/AddCancellation';
import ForgetPass from './src/Screens/ForgetPass';
import ForgetPassOpt from './src/Screens/ForgetPassOpt';
import NewPass from './src/Screens/NewPass';


const Stack = createStackNavigator()
const BottomTabs = createMaterialBottomTabNavigator();


function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="EmailAddress" component={EmailAddress} />
      <Stack.Screen name="AboutInfo" component={AboutInfo} />
      <Stack.Screen name="PasswordSetup" component={PasswordSetup} />
      {/* <Stack.Screen name="SearchAddress" component={SearchAddress} /> */}
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="MapLocation" component={MapLocation} />
      <Stack.Screen name="SalonTiming" component={SalonTiming} />
      <Stack.Screen name="SalonTimingSet" component={SalonTimingSet} />
      <Stack.Screen name="AddSalonPhoto" component={AddSalonPhoto} />
      <Stack.Screen name="AddServices" component={AddServices} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="PaymentMethd" component={PaymentMethd} />
      <Stack.Screen name="Congrats" component={Congrats} />

      <Stack.Screen name="ForgetPass" component={ForgetPass} />
      <Stack.Screen name="ForgetPassOpt" component={ForgetPassOpt} />
      <Stack.Screen name="NewPass" component={NewPass} />

    </Stack.Navigator>
  )

}

function UserChatNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserChat" component={UserChat} />
      <Stack.Screen name="ChatDetails" component={ChatDetails} />
      <Stack.Screen name="GroupMessages" component={GroupMessages} />
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
      <Stack.Screen name="UserChatNavigator" component={UserChatNavigator} />
    </Stack.Navigator>
  )
}

function AppointmentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="AllAppoints" component={AllAppoints} />
      <Stack.Screen name="PendingAppoint" component={PendingAppoint} />
      <Stack.Screen name="SeeAllServices" component={SeeAllServices} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
      <Stack.Screen name="AddNewClient" component={AddNewClient} />
      <Stack.Screen name="NewAppoint" component={NewAppoint} />
    </Stack.Navigator>
  )
}

function SalonProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="SalonProfile" component={SalonProfile} />
      <Stack.Screen name="AllReviews" component={AllReviews} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditHours" component={EditHours} />
      <Stack.Screen name="EditServices" component={EditServices} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
    </Stack.Navigator>

  )
}
function InsightsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Insights" component={Insights} />
      <Stack.Screen name="AccountStatement" component={AccountStatement} />
      
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
            // <ProfileBtmIcon color={color} />
            <MaterialCommunityIcons color={color} name="account-multiple" size={23} />
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

      <BottomTabs.Screen
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name='event-note' color={color} size={22} />
          )
        }}
        name="Insights" component={InsightsStack} />

    </BottomTabs.Navigator>
  )
}


const useForceUpdate = () => {
  const [, updateState] = React.useState();
  return React.useCallback(() => updateState({}), []);
}

var alertRef;


export default function App() {

  const forceUpdate = useForceUpdate();
  const [loaded] = useFonts({
    ABRe: require('./assets/fonts/Abel/Abel-Regular.ttf'),
    PBo: require('./assets/fonts/Poppins-Bold.ttf'),
  })



  const [loggedIn, setLoggedIn] = useState(0);
  const [loading, setLoading] = useState(false)

  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  const [notification, setNotification] = useState(false);



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
        // console.log(data)
        setLoading(false)
        doConsole(" I receive ");
        // doConsole(data);
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
          // console.log('else')
          // storeItem('login_data',)
          setLoggedIn(2)
          forceUpdate()
        }

      }).catch((error) => {
        // console.log(error)
        setLoading(false)
        setLoggedIn(2)
        forceUpdate()
      });

  }

  function checkLogin() {
    loggedInObservable.subscribe((v) => {
      // console.log("Yessss won the warrrrr");
      // console.log(v)
      setLoggedIn(v)
      forceUpdate();
    })
  }


  const handleNotifClick = (notif) => {
    if (typeof notif?.request?.content?.data?.open != 'undefined') {
      navigateToPostNow.navigate({ id: notif?.request?.content?.data?.post_id, where: notif?.request?.content?.data?.open })
    }
  }


  useEffect(() => {
    notificationListener.current = Notificationss.addNotificationResponseReceivedListener(response => {
      console.log("Notificationssss")
      // console.log(response);
      setTimeout(() => {
        handleNotifClick(response.notification);
      }, 500)
    });

    responseListener.current = Notificationss.addNotificationReceivedListener(notification => {
      setNotification(notification);
      alertRef.alertWithType("", notification.request.content.title, notification.request.content.body, notification.request.content.data);
    });

    return () => {
      Notificationss.removeNotificationSubscription(notificationListener.current);
      Notificationss.removeNotificationSubscription(responseListener.current);
    };
  }, [])


  useEffect(() => {

    

    // if (notification) {
    //   console.log('yes i am a notification')
    //   console.log(notification)
    // }



    setLoading(true)
    retrieveItem('login_data')
      .then(data => {
        // console.log('local storage data')
        // console.log(data)

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
    <Provider>
      <DropdownAlert updateStatusBar={false}
        ref={ref => alertRef = ref}
      />


      <NavigationContainer
        ref={navigationRef}
      >


        {
          loggedIn == 2 ?
            <Stack.Navigator screenOptions={{ headerShown: false }} >
              <Stack.Screen name="AuthStack" component={AuthStack} />
            </Stack.Navigator>
            :
            loggedIn == 1 &&
            <Stack.Navigator screenOptions={{ headerShown: false }} >
              <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
              <Stack.Screen name="DelAccount" component={DelAccount} />
              <Stack.Screen name="Notifications" component={Notifications} />
              <Stack.Screen name="UserChatNavigatorr" component={UserChatNavigator} />

              <Stack.Screen name="PersonalSettings" component={PersonalSettings} />
              <Stack.Screen name="HealthSafety" component={HealthSafety} />
              <Stack.Screen name="PaymentMethd" component={PaymentMethd} />
              <Stack.Screen name="AddCardDetails" component={AddCardDetails} />
              <Stack.Screen name="PaypalAccount" component={PaypalAccount} />
              <Stack.Screen name="Insights" component={Insights} />
              <Stack.Screen name="NotificationsS" component={NotificationsS} />
              <Stack.Screen name="Language" component={Language} />
              <Stack.Screen name="AdvancedSettings" component={AdvancedSettings} />
              <Stack.Screen name="BookingSettings" component={BookingSettings} />
              <Stack.Screen name="RevenuePolicies" component={RevenuePolicies} />
              <Stack.Screen name="ProfileLinks" component={ProfileLinks} />
              <Stack.Screen name="SubscriptionAndBiiling" component={SubscriptionAndBiiling} />
              <Stack.Screen name="PaymentMethod1" component={PaymentMethods} />
              <Stack.Screen name="CauffAppS" component={CauffAppS} />
              <Stack.Screen name="Support" component={Support} />
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

              <Stack.Screen name="MakeGroup" component={MakeGroup} />
              <Stack.Screen name="AddCancellation" component={AddCancellation} />

            </Stack.Navigator>
        }
      </NavigationContainer>
    </Provider>

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
