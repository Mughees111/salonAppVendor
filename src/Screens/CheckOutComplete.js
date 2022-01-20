import React from 'react'
import { CheckOutCompleteIcon } from '../Components/Svgs';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { acolors } from '../Components/AppColors';
import { MainButton } from '../Components/Buttons';



const CheckOutComplete = (props) => {

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor, paddingTop: 150 }}>
            <CheckOutCompleteIcon style={{ alignSelf: 'center', }} />
            <Text style={{ alignSelf: 'center', fontFamily: 'ABRe', fontSize: 24, color: 'white', marginTop: 18 }}>Checkout Complete</Text>
            <View style={{ alignSelf: 'center', position: 'absolute', bottom: 100, width: '90%', alignSelf: 'center' }}>
                <MainButton
                    text={"Back"}
                    btnStyle={{ width: "100%", height: 45 }}
                    textStyle={{ fontSize: 11.94, }}
                    onPress={() => props.navigation.popToTop()}
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

export default CheckOutComplete
