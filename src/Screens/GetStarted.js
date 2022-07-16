import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { navigate } from '../../Navigations';
import { ArrowRight } from '../Components/Svgs';
import { StatusBar } from 'expo-status-bar';
import { MainButton } from '../Components/Buttons';

import { checkLoginSteps } from '../utils/functions'

const GetStarted = () => {
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        checkLoginSteps()
            .then(d => {
                setLoading(false)
            })

    }, [])

    if (loading) return <View style={{ flex: 1, backgroundColor: '#111111' }}>
    </View>
    return (
        <View style={{ flex: 1 }}>
            <Image
                style={{ position: 'absolute', width: "100%", height: "100%", }}
                source={require('../assets/onBoarding1img.png')}
            />
            <Image
                style={{ position: 'absolute', bottom: 0, width: "100%" }}
                source={require('../assets/onBoarding1Mask.png')}
            />
            <View style={{ width: "90%", alignSelf: 'center', position: 'absolute', bottom: 150 }}>
                <Text style={{ alignSelf: 'center', textAlign: 'center', color: 'white', fontSize: 21, fontFamily: 'ABRe' }}>Welcome to the future of your Salon</Text>
                <Text style={{ alignSelf: 'center', color: 'rgba(255,255,255,0.6)', fontFamily: 'ABRe', textAlign: 'center', marginTop: 45 }}>Get an overview of how you are performing & motivate yourself to achieve even more.</Text>
                <MainButton
                    text="Get Started"
                    btnStyle={{ marginTop: 100 }}
                    onPress={() => navigate('EmailAddress')}
                />
                <Text style={{ alignSelf: 'center', color: 'rgba(255,255,255,1)', fontFamily: 'ABRe', textAlign: 'center', marginTop: 5 }}>or</Text>
                <MainButton
                    text="login with existing account"
                    btnStyle={{ marginTop: 10 }}
                    onPress={() => navigate('SignIn')}
                />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    activeDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#E2B378',
        marginLeft: 5
    },
    inActiveDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#FCFCFC',
        marginLeft: 8
    }
})

export default GetStarted
