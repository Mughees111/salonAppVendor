import React from 'react'
import { ArrowLeft, CancelIcon, ChatSendIcon } from '../Components/Svgs';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { acolors } from '../Components/AppColors';
import { FlatList } from 'react-native-gesture-handler';
import { MainButton } from '../Components/Buttons';
import { StatusBar } from 'expo-status-bar';


const CheckOut2 = () => {


    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Checkout</Text>
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
            </SafeAreaView>
            <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', flexWrap: 'wrap', width: '80%', alignSelf: 'center' }}>
                <TouchableOpacity
                    // onPress={() => setLogoutModal(false)}
                    style={styles.btnStyle}>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 11.94, color: 'white' }}>Cash</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    // onPress={() => setLogoutModal(false)}
                    style={styles.btnStyle}>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 11.94, color: 'white' }}>Physical card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    // onPress={() => setLogoutModal(false)}
                    style={styles.btnStyle}>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 11.94, color: 'white' }}>Check</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    // onPress={() => setLogoutModal(false)}
                    style={styles.btnStyle}>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 11.94, color: 'white' }}>Paypal</Text>
                </TouchableOpacity>
            </View>
            <View style={{ position: 'absolute', bottom: 100, width: '90%', alignSelf: 'center' }}>
                <MainButton
                    text={"$10.60 . Charge"}
                    btnStyle={{ width: "100%", height: 45 }}
                    textStyle={{ fontSize: 11.94, }}
                    onPress={() => navigate('CheckOutComplete')}
                />
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    btnStyle: {
        width: "40%", height: 45, borderRadius: 26, borderWidth: 1, borderColor: 'white', alignItems: 'center', justifyContent: 'center',
        marginTop: 20,
    }
})

export default CheckOut2
