import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, ScrollView, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../Navigations';
import { acolors } from '../Components/AppColors';
import { ArrowLeft, RattingStarIcon, HeartIcon, MsgIcon, PhoneIcon, SettingsIcon, PencilIcon, CameraIcon2 } from '../Components/Svgs';
import Reviews from '../Components/Reviews';
import { MainButton } from '../Components/Buttons';
// import { SliderBox } from "react-native-image-slider-box";


const SalonProfile = () => {


    const keyExtractor = ((item, index) => index.toString())
    const images = [
        require('../assets/SalonDetailImg.png'),
        require('../assets/SalonDetailImg.png'),
        require('../assets/SalonDetailImg.png'),
    ]

    const ServicesView = ({ title }) => (
        <View style={{ marginTop: 10, flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ width: "50%" }}>
                <Text style={{ color: '#FCFCFC', fontSize: 15, fontFamily: 'ABRe' }}>{title}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, fontFamily: 'ABRe' }}>25 - 30 mins</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'ABRe', fontSize: 15, color: '#FCFCFC', }}>$50</Text>
            </View>


        </View>
    )


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                translucent={true}
            />

            {/* <Image
                source={require('../assets/SalonDetailMask.png')}
                style={{ position: 'absolute', height: 200, resizeMode: 'stretch', top: 0, width: "100%" }}
            /> */}

            <View>
                <Image
                    style={{ width: "100%" }}
                    source={require('../assets/SalonDetailImg.png')}
                />
                <TouchableOpacity style={{ paddingHorizontal: 15, position: 'absolute', bottom: 50, right: 10, height: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: acolors.primary, borderRadius: 6 }}>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 10.82, color: '#111111' }}>Change Cover</Text>

                </TouchableOpacity>
            </View>


            <SafeAreaView style={{ position: 'absolute', top: 30, }}>
                <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width, }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('SettingsScreen')}
                        style={{}}>
                        <SettingsIcon width={30} height={30} />
                    </TouchableOpacity>

                </View>
            </SafeAreaView>



            <SafeAreaView style={{ marginTop: 22, backgroundColor: '#111111', marginTop: -40, borderTopLeftRadius: 30 }}>

                <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>

                    <View style={{ flexDirection: 'row', flex: 1, paddingRight: 10 }}>
                        <View style={{ width: "25%", marginLeft: 20, }}>
                            <Image
                                style={{ width: "100%", }}
                                source={require('../assets/salonProfileImg1.png',)}
                            />
                            <TouchableOpacity style={{ position: 'absolute', bottom: -6, right: -6, width: 22, height: 22, borderRadius: 11, backgroundColor: acolors.white, alignItems: 'center', justifyContent: 'center' }}>
                                <CameraIcon2 />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 15, marginTop: 7, flex: 1 }}>
                            <TouchableOpacity style={{ position: 'absolute', top: 2, right: 5, width: 33, marginLeft: 10, height: 33, borderRadius: 33 / 2, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                <PencilIcon width={17} height={17} color="black" />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 17, color: acolors.primary, lineHeight: 25 }}>Hiana Saloon</Text>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FFFFFF', lineHeight: 15 }}>Robert
                                <Text style={{ color: 'rgba(255,255,255,0.5)' }}> (Owner)</Text>
                            </Text>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 3, }}>2400 US-30 Suite 106, Oswego, IL 60543, United States</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 12, color: '#FFFFFF' }}>4.5</Text>
                                <RattingStarIcon />
                                <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>5.5 Km</Text>
                            </View>

                        </View>
                    </View>


                    <View style={{ paddingHorizontal: 20, marginTop: 15, }}>
                        {/* Description */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.headingText}>Description</Text>
                            <TouchableOpacity style={{ padding: 5, }}>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.simpleText, { lineHeight: 20 }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend nunc a nisi placerat aliquam.</Text>
                        {/* Tax Id */}
                        <TouchableOpacity style={{ padding: 5, alignSelf: 'flex-end' }}>
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.headingText}>Tax ID</Text>
                            <Text style={[styles.headingText, { fontSize: 14 }]}>75654</Text>
                        </View>
                        {/* Opening Hours */}
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                                <Text style={[styles.headingText]}>Opening Hours</Text>
                                <TouchableOpacity style={{ padding: 5, alignSelf: 'flex-end' }}>
                                    <Text style={styles.editText}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={styles.simpleText}>Monday - Friday</Text>
                                <View style={{}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: acolors.primary }}></View>
                                        <Text style={[styles.simpleText, { marginLeft: 20 }]}>7:30 - 11:30 AM</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: acolors.primary }}></View>
                                        <Text style={[styles.simpleText, { marginLeft: 20 }]}>7:30 - 11:30 AM</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: acolors.primary }}></View>
                                        <Text style={[styles.simpleText, { marginLeft: 20 }]}>7:30 - 11:30 AM</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Services */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={[styles.headingText]}>Service List</Text>
                            <TouchableOpacity style={{ padding: 5, alignSelf: 'flex-end' }}>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <ServicesView title="Peaceful Massage" />
                        <ServicesView title="Men Skin Polish" />
                        <ServicesView title="Oil Treatment" />

                        {/* Location */}

                        <View style={{ marginTop: 20 }}>
                            <Image
                                style={{ width: "100%", resizeMode: 'stretch', }}
                                source={require('../assets/map.png')}
                            />
                            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, padding: 15 }}>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 12, color: acolors.primary, }}>Change</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Photos */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={styles.headingText}>Photos</Text>
                            <TouchableOpacity style={{ padding: 5, alignSelf: 'flex-end' }}>
                                <Text style={styles.editText}>+ Add Photos</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            style={{ marginTop: 10 }}
                            keyExtractor={keyExtractor}
                            showsVerticalScrollIndicator={false}
                            horizontal={true}
                            data={[
                                { img: require('../assets/salonImg1.png') },
                                { img: require('../assets/salonImg3.png') },
                                { img: require('../assets/salonImg2.png') },
                                { img: require('../assets/salonImg1.png') },
                                { img: require('../assets/salonImg2.png') },
                                { img: require('../assets/salonImg3.png') },
                            ]}

                            renderItem={({ item }) => (
                                <Image
                                    style={{ width: 79, height: 69, borderRadius: 5, marginLeft: 10, borderRadius: 8 }}
                                    source={item.img}
                                />
                            )}
                        />
                        {/* Reviews */}
                        <Text style={{ marginTop: 20, fontSize: 17, fontFamily: 'ABRe', color: 'white' }}>Reviews (113)</Text>
                        <View>
                            <Reviews
                                name="William David:"
                                image={require("../assets/reviewImg1.png")}
                                review="Lorem ipsum dolor sit , consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                                rattings="5.0"
                            />
                            <Reviews
                                name="Richard Thomas"
                                image={require("../assets/reviewImg1.png")}
                                review="Lorem ipsum dolor sit , consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                                rattings="4.5"
                            />
                            <Reviews
                                name="Xquenda Cuauhtémoc"
                                image={require("../assets/reviewImg1.png")}
                                review="Lorem ipsum dolor sit , consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                                rattings="4.8"
                                last={true}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    console.log('pressed')
                                    navigate('AllReviews')
                                }}
                            >
                                <Text style={{ color: acolors.primary, fontFamily: 'ABRe', fontSize: 12, }}>View all reviews</Text>
                            </TouchableOpacity>
                        </View>

                        <MainButton
                            btnStyle={{ marginTop: 15 }}
                            onPress={() => navigate('BookAppointment')}
                            text="Save"

                        />
                    </View>
                </ScrollView>
            </SafeAreaView>

        </View >
    )
}

const styles = StyleSheet.create({
    headingText: {
        marginTop: 5,
        fontSize: 17,
        fontFamily: 'ABRe',
        color: 'white'
    },

    simpleText: {
        fontSize: 14,
        fontFamily: 'ABRe',
        color: 'rgba(255,255,255,0.8)',

    },
    editText: {
        fontFamily: 'ABRe',
        fontSize: 12,
        color: '#E2B378',

    }
})

export default SalonProfile
