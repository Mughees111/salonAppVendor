import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, VerticalDots, ArrowRight1, ArrowLeft } from '../Components/Svgs';
import { FontAwesome } from '@expo/vector-icons';



const Language = () => {


    const [ln, setLn] = useState('')
    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Language</Text>
            <View></View>
        </View>
    )



    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
            />
            <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Header title="Settings" />
                    <TouchableOpacity
                        onPress={() => setLn('gb')}
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 55, width: "100%", paddingBottom: 20, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <View style={{ width: 18, height: 18, borderRadius: 4, borderWidth: 2, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            {ln == 'gb' && <FontAwesome name="check" size={10} color={'white'} />}
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontFamily: "ABRe", fontSize: 15.37, color: 'white', lineHeight: 21, }}>French</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setLn('us')}
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, width: "100%", paddingBottom: 20, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <View style={{ width: 18, height: 18, borderRadius: 4, borderWidth: 2, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            {ln == 'us' && <FontAwesome name="check" size={10} color={'white'} />}
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontFamily: "ABRe", fontSize: 15.37, color: 'white', lineHeight: 21, }}>English  (United States)</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setLn('mx')}
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, width: "100%", paddingBottom: 20, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <View style={{ width: 18, height: 18, borderRadius: 4, borderWidth: 2, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            {ln == 'mx' && <FontAwesome name="check" size={10} color={'white'} />}
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontFamily: "ABRe", fontSize: 15.37, color: 'white', lineHeight: 21, }}>Espanol (Mexico)</Text>
                        </View>

                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
    iconCircle: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 34 / 2,
        backgroundColor: 'rgba(226, 179, 120, 0.05)'
    },
    text: {
        fontFamily: 'ABRe',
        fontSize: 14,
        color: '#FFFFFF',
        marginLeft: 10
    },
    containers: {
        marginTop: 50,
        width: "100%",
        alignSelf: 'center',
        backgroundColor: '#1B1B1B', paddingBottom: 15, paddingHorizontal: 10,
    }
})



export default Language
