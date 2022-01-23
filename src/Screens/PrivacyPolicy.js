import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch } from 'react-native'
import { acolors } from '../Components/AppColors';
import { OnBoardingHeader } from '../Components/Header';



const PrivacyPolicy = () => {
    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            // translucent={false}
            />
            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <OnBoardingHeader title="Privacy Policy" />
                    <Text style={{ marginTop: 20, fontFamily: 'ABRe', fontSize: 13, color: 'white', lineHeight: 21.5 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue id ultrices nulla sit posuere nunc id. Justo in sed habitasse elit consequat feugiat lobortis lectus erat. Ligula sapien in felis, posuere. Id ac aliquam vulputate maecenas turpis tortor commodo semper. Eget nulla integer risus, pretium pharetra.
                        {"\n"}
                        {"\n"}
                        Nulla hac id amet dignissim quis dignissim ornare. Ultrices viverra diam sit a dui. Ipsum molestie urna leo turpis id id pulvinar. Cras malesuada pulvinar varius et, volutpat integer. Odio laoreet arcu, dignissim purus hac id pretium. Malesuada ut aliquam faucibus risus imperdiet blandit vitae. Duis sit sit odio diam. Et non nibh integer quam leo in pellentesque ipsum. Est ultrices scelerisque turpis nunc. Mauris pellentesque elementum eros non blandit quis. Urna praesent consequat varius morbi pulvinar enim. Interdum blandit nunc, tellus tempor nulla cursus rhoncus. Placerat consectetur tempus, pellentesque malesuada suspendisse nibh nec maecenas.
                        {"\n"}
                        {"\n"}
                        Aenean facilisis enim duis luctus nisi a ut. Feugiat morbi a pharetra in dictum consequat volutpat. Blandit enim, enim proin ut. Egestas nisl risus eu viverra neque ullamcorper nam sapien. Eros elementum posuere vitae pharetra a vel sed ligula. Sit at faucibus faucibus lacus eget adipiscing facilisis. Quis phasellus dolor eu sed magna neque.
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default PrivacyPolicy
