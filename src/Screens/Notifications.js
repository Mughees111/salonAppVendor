import React from 'react'
import { ArrowLeft, ChatSendIcon } from '../Components/Svgs';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { acolors } from '../Components/AppColors';
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';


const Notifications = () => {


    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Notifications</Text>
            <TouchableOpacity
                onPress={() => navigate('Chats')}
            >
                <ChatSendIcon />
            </TouchableOpacity>
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
                <FlatList
                    contentContainerStyle={{ paddingBottom: 100 }}
                    style={{ marginTop: 10 }}
                    showsVerticalScrollIndicator={false}
                    data={[1, 2, 3, 4, 5, 6]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ width: "100%", paddingVertical: 12, paddingHorizontal: 15, marginTop: 12, backgroundColor: 'black', borderRadius: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 14.62, color: 'white' }}>Notification</Text>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 7, color: 'white', marginLeft: 10 }}>(1h ago) 20-10-2021</Text>
                            </View>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 10.96, color: 'white', lineHeight: 14, marginTop: 3 }}>Lorem ipsum dolor sit amet, consectetur adipiscing.</Text>
                        </View>
                    )}
                />

            </SafeAreaView>
        </View>

    )
}

export default Notifications
