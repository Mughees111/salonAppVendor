import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, RefreshControl, ActivityIndicator } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { acolors } from '../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';

import { Ionicons } from '@expo/vector-icons';



import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, update_dp, update_dp_2, storeItem, validateEmail } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../Context/DataContext';
import { changeLoggedIn } from '../../Common';

import { ArrowLeft, RattingStarIcon } from '../Components/Svgs';
import ReactNativeModal from 'react-native-modal';

var alertRef

const AccountStatement = (props) => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const userData = state.userData;

    const [current_balance, setCurrentBalance] = useState(props?.route?.params?.current_balance);

    const [refreshing, setRefreshing] = React.useState(false);

    const [loadingStatement, setLoadingStatement] = useState(false);
    const [accountStatement, setAccountStatement] = useState([]);

    const [wAmount, setWAmount] = useState(0);
    const [wView, setWView] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        let x = false
        get_account_statement(x)
        // wait(2000).then(() => setRefreshing(false));
    }, []);


    function get_account_statement(x) {

        forceUpdate();
        if (x) {
            setLoading(true)
        }

        retrieveItem('login_data')
            .then(data => {
                const reqObj = {
                    token: data?.token,
                }

                apiRequest(reqObj, 'get_account_statement')
                    .then(data => {
                        setLoading(false)
                        setRefreshing(false)
                        if (data.action == 'success') {
                            console.log(data)
                            setAccountStatement(data?.data)
                        }
                        else alertRef.alertWithType('error', "Error", data.error);
                    })
                    .catch(err => {
                        setRefreshing(false)
                        setLoading(false)
                    })
            })
    }

    useEffect(() => {
        let x = true
        get_account_statement(x);
    }, [])

    function doWithDraw() {


        retrieveItem('login_data')
            .then(data => {
                const reqObj = {
                    token: data?.token,
                    amount: wAmount
                }

                apiRequest(reqObj, 'make_widthdraw_request')
                    .then(data => {
                        setLoading(false)
                        if (data.action == 'success') {


                            alertRef.alertWithType('success', "Success", data?.msg ? data.msg : "Your request has been recieved. We will contact you soon");
                            setTimeout(() => {
                                setWAmount('');
                                setWView(false);
                                // setStatementModal(false);
                            }, 2000);

                        }
                        else alertRef.alertWithType('error', "Error", data.error);
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })

    }













    const Header = ({ title }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 20 }}>
                <TouchableOpacity
                    onPress={() => goBack()}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#F9F2BC' }}></Text>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'ABRe', fontSize: 20, color: acolors.white }}>Reports</Text>
                <TouchableOpacity
                    onPress={() => {
                        alertRef.alertWithType('warn', "Under Development")
                        // doDel()
                    }}
                >
                    <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#F9F2BC' }}></Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>


            <StatusBar
                style='light'
                backgroundColor={acolors.statusBar}
                translucent={false}
            />

            <SafeAreaView style={{ marginTop: 10, width: "95%", alignSelf: 'center', flex: 1 }}>


                {/*  Accounts Modal */}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={{ paddingBottom: 150 }}
                >
                    {loading && <Loader />}
                    <DropdownAlert ref={(ref) => alertRef = ref} />
                    {
                        loadingStatement ? <ActivityIndicator style={{ position: 'absolute', alignSelf: 'center', top: 100, alignItems: 'center' }} color={acolors.bgColor} />
                            :
                            <View style={{ width: "100%", alignSelf: 'flex-start', height: "100%" }}>

                                <View style={{ flexDirection: 'row', paddingHorizontal: 20, height: 50, alignItems: 'center', justifyContent: 'space-between', }}>
                        
                                    <TouchableOpacity
                                        onPress={() => wView ? setWView(false) : goBack()}
                                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                                        <ArrowLeft />
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: 'ABRe', fontSize: 20, color: acolors.white }}>{wView ? "Withdraw Amount" : "Account Statement"} </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            alertRef.alertWithType('warn', "Under Development")
                                            // doDel()
                                        }}
                                    >
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#F9F2BC' }}></Text>
                                    </TouchableOpacity>
                                </View>



                                {!wView ?
                                    <>
                                        <View style={{ flexDirection: 'row', height: 40 }}>
                                            {
                                                ["id", "ref type", "Amount in", "Amount out", "Balance", "Date",].map((v, i) => {
                                                    return (
                                                        <View key={i} style={{ width: i == 0 ? "11.66%" : "17.65%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: acolors.primary, borderLeftWidth: 0, borderRightWidth: i == 5 ? 0 : 1 }}>
                                                            <Text style={{ fontSize: 10, fontFamily: 'PBo', color: acolors.white }}>{v}</Text>
                                                        </View>
                                                    )
                                                })

                                            }
                                        </View>

                                        {
                                            accountStatement?.map((v, i) => {
                                                return (
                                                    <View style={{ flexDirection: 'row', }}>
                                                        <View style={{ paddingVertical: 10, width: "11.66%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: acolors.primary, borderLeftWidth: 0, }}>
                                                            <Text style={{ color: acolors.white, fontSize: 10, fontFamily: 'ABRe' }}>{v.t_id}</Text>
                                                        </View>
                                                        <View style={{ paddingVertical: 10, width: "17.65%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: acolors.primary, }}>
                                                            <Text style={{ color: acolors.white, fontSize: 10, fontFamily: 'ABRe' }}>{v.ref_type}</Text>
                                                        </View>
                                                        <View style={{ paddingVertical: 10, width: "17.65%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: acolors.primary, }}>
                                                            <Text style={{ color: acolors.white, fontSize: 10, fontFamily: 'ABRe' }}>{v.amount_in}</Text>
                                                        </View>
                                                        <View style={{ paddingVertical: 10, width: "17.65%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: acolors.primary, }}>
                                                            <Text style={{ color: acolors.white, fontSize: 10, fontFamily: 'ABRe' }}>{v.amount_out}</Text>
                                                        </View>
                                                        <View style={{ paddingVertical: 10, width: "17.65%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: acolors.primary, }}>
                                                            <Text style={{ color: acolors.white, fontSize: 10, fontFamily: 'ABRe' }}>{v.balance}</Text>
                                                        </View>
                                                        <View style={{ paddingVertical: 10, width: "17.65%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: acolors.primary, borderRightWidth: 0 }}>
                                                            <Text style={{ color: acolors.white, fontSize: 10, fontFamily: 'ABRe' }}>{v.date_time}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <View style={{ width: "85%", alignSelf: 'center', marginTop: 25, }}>
                                        <Text style={{ position: 'absolute', top: 14, alignSelf: 'center', right: 15, fontSize: 14, color: acolors.white }}>$</Text>
                                        <TextInput
                                            placeholder='Enter widthdraw amount'
                                            keyboardType='numeric'
                                            onChangeText={setWAmount}
                                            placeholderTextColor={acolors.white}
                                            style={{ borderWidth: 1, borderColor: acolors.white, borderRadius: 7, paddingHorizontal: 15, fontSize: 14, fontFamily: 'ABRe', height: 49, color: acolors.white }}
                                        />
                                        <Text></Text>
                                    </View>
                                }


                            </View>
                    }

                </ScrollView>
                <TouchableOpacity
                    onPress={() => {
                        // alertRef.alertWithType("info", "", "Under Development")
                        if (wView) {
                            if (parseInt(wAmount) > parseInt(current_balance)) {
                                alertRef.alertWithType("error", "", "Your current balance is low");
                            }
                            else {
                                if (wAmount == 0) {
                                    alertRef.alertWithType("error", "", "Please enter withdraw amount");
                                }
                                else {
                                    setLoading(true);
                                    doWithDraw();
                                }
                            }

                        }
                        else {
                            setWView(true)
                        }

                    }}
                    style={{ flexDirection: 'row', position: 'absolute', bottom: 0, paddingHorizontal: 20, width: "100%", height: 50, alignItems: 'center', backgroundColor: acolors.white, justifyContent: 'center', }}>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 20, color: acolors.bgColor }}>Request Withdrawal</Text>
                    {wView && <Text style={{ fontFamily: 'ABRe', fontSize: 20, color: acolors.bgColor, }}>- ${wAmount}</Text>}
                </TouchableOpacity>


            </SafeAreaView>

            {/*  Accounts Modal */}




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
    },

})

export default AccountStatement
