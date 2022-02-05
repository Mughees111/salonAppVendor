import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { acolors } from '../Components/AppColors';

import Reviews from '../Components/Reviews';
import { ArrowLeft, } from '../Components/Svgs';



const useForceUpdate = () => {
    const [, updateState] = React.useState();
    return useCallback(() => updateState({}), []);
}


const AllReviews = (props) => {

    const forceUpdate = useForceUpdate()
    const keyExtractor = ((item, index) => index.toString())
    const [data, setData] = useState(props?.route?.params ? props?.route?.params : []);

    const [total, setTotal] = useState(0);



    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            <SafeAreaView style={{ flex: 1, height: Dimensions.get('window').height, marginTop: 10 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => goBack()}
                            style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                            <ArrowLeft />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>All Reviews</Text>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: 'rgba(255,255,255,0.5)', alignSelf: 'center' }}>({data.length})</Text>
                        </View>
                        <Text>          </Text>
                    </View>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 17, color: "#FCFCFC", marginTop: 20, }}>Here are all the review</Text>
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={data}
                        contentContainerStyle={{ paddingBottom: 400 }}
                        showsVerticalScrollIndicator={false}
                        style={{ height: "100%" }}
                        renderItem={({ item, index }) => (
                            <Reviews
                                key={index}
                                name={item.username}
                                image={item.profile_pic}
                                review={item.rev_text}
                                rattings={item.rev_rating}
                                rev_datetime={item.rev_datetime}
                            />
                        )}
                    />
                </View>
            </SafeAreaView>
        </View>


    )
}

export default AllReviews
