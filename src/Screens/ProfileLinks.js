import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Switch, Share ,Clipboard, ToastAndroid} from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, VerticalDots, ArrowRight1, ArrowLeft } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';
import RNModal from 'react-native-modal'
import * as Linking from 'expo-linking';
import { retrieveItem, storeItem, useForceUpdate } from "../utils/functions";
import { urls } from "../utils/Api_urls";

const ProfileLinks = () => {


    const [tabs, setTabs] = useState('list')
    const [logoutModal, setLogoutModal] = useState(false)
    const [isEnabled, setIsEnabled] = useState(true)
    const [profileLink, setProfileLink] = useState('');

 

    const copyToClipboard = () => {
        Clipboard.setString(profileLink)
      }
    
    //   const fetchCopiedText = async () => {
    //     const text = await Clipboard.getString()
    //     // setCopiedText(text)
    //   }


    async function share(msg) {

        try {
            const result = await Share.share({
                message: msg
            });
            if (result.action === Share.sharedAction) {
                console.log(result)
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log('error')
            console.log(error)
        }
    }

    useEffect(() => {

        retrieveItem('login_data')
            .then(data => {
                var urlll = Linking.createURL('', {
                    queryParams: {
                        fid: data.sal_id,
                        id: data.sal_id,
                        type: "profile"
                    }
                });

                let url = `salonapp://?fid=${data?.sal_id}&id=${data?.sal_id}&type=profile`;
                // salonppvendor://?fid=2&id=2&type=profile
                // exp://192.168.100.35:19000?fid=2&id=2&type=profile

                console.log(url)
                var finalUrl = "http://couaff.com/share_profile.php?id=" + data?.sal_id + "&url=" + encodeURIComponent(url);
                // http://couaff.com/share_profile.php?id=2&url=salonppvendor%3A%2F%2F%3Ffid%3D2%26id%3D2%26type%3Dprofile
                // console.log(finalUrl);
                setProfileLink(finalUrl)

                // var msggg = data?.sal_name + " shared a highlight on heresay app. Click the link below to view it " + finalUrl;
                // share(msggg)

            })

    }, [])



    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Profile Links</Text>
            <View></View>
        </View>
    )




    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            // translucent={false}
            />
            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <Header />
                <Text style={{ fontFamily: "ABRe", fontSize: 15.37, color: 'white', lineHeight: 21, marginTop: 30 }}>Setup your profile link</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, paddingBottom: 20, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.3' }}>
                    <View style={{ width: "80%", paddingVertical: 10, borderRadius: 10, backgroundColor: '#262626', justifyContent: 'center', paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 12.52, color: 'white', fontFamily: 'ABRe', }}>{profileLink}</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>{
                            copyToClipboard()
                            ToastAndroid.show("Copied !", ToastAndroid.SHORT);
                        }}
                        style={{ width: "18%", marginLeft: 10, height: 29, borderRadius: 10, backgroundColor: '#262626', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 12.52, color: 'white', fontFamily: 'ABRe', }}>COPY</Text>
                    </TouchableOpacity>
                </View>



            </SafeAreaView>


        </View>
    )
}


const styles = StyleSheet.create({
    activeTab: {
        backgroundColor: acolors.primary,
        width: "50%",
        height: 28,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inActiveTab: {
        backgroundColor: '#1E1F25',
        // 'rgba(255, 255, 255, 0.1)',
        width: "50%",
        height: 28,
        // borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTabText: {
        fontFamily: 'ABRe',
        fontSize: 16,
        color: '#111111'
    },
    inActiveTabText: {
        fontFamily: 'ABRe',
        fontSize: 14,
        color: '#FFFFFF'
    }
})



export default ProfileLinks

