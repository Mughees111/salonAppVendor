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

const Insights = () => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const userData = state.userData;

    const [lastWeek, setLastWeek] = useState({});
    const [currentWeek, setCurrentWeek] = useState({});
    const [lastMonth, setLastMonth] = useState({});
    const [currentMonth, setCurrentMonth] = useState({});
    const [currentYear, setCurrentYear] = useState({});
    const [lastYear, setLastYear] = useState({});

    const [reviews, setReviews] = useState();
    const [ratings, setRatings] = useState();

    const [current_balance, setCurrentBalance] = useState('');

    const [refreshing, setRefreshing] = React.useState(false);
    const [statementModal, setStatementModal] = useState(false);

    const [loadingStatement, setLoadingStatement] = useState(false);
    const [accountStatement, setAccountStatement] = useState([]);

    const [wAmount, setWAmount] = useState(0);
    const [wView, setWView] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        get_stats()
        // wait(2000).then(() => setRefreshing(false));
    }, []);




    function get_stats() {

        retrieveItem('login_data')
            .then(data => {
                const reqObj = {
                    token: data?.token,
                }

                if (!refreshing) {
                    setLoading(true)
                }

                apiRequest(reqObj, 'get_stats')
                    .then(data => {
                        setLoading(false)
                        setRefreshing(false)
                        if (data.action == 'success') {
                            setLastWeek(data.last_week);
                            setCurrentWeek(data.current_week);
                            setLastMonth(data.last_month);
                            setCurrentMonth(data.current_month);
                            setCurrentYear(data?.current_year);
                            setLastYear(data?.lat_year);
                            console.log(data)
                            setReviews(data?.reviews[0]?.total_reviews);
                            setRatings(data?.ratings[0]?.average);
                            setCurrentBalance(data?.current_balance[0]?.current_balance)
                        }
                        else alertRef.alertWithType('error', "Error", data.error);
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })
    }


    function get_account_statement() {

        setLoadingStatement(true)
        retrieveItem('login_data')
            .then(data => {
                const reqObj = {
                    token: data?.token,
                }

                apiRequest(reqObj, 'get_account_statement')
                    .then(data => {
                        setLoadingStatement(false)
                        setRefreshing(false)
                        if (data.action == 'success') {
                            console.log(data)
                            setAccountStatement(data?.data)
                        }
                        else alertRef.alertWithType('error', "Error", data.error);
                    })
                    .catch(err => {
                        setLoadingStatement(false)
                    })
            })
    }

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
                                setStatementModal(false);
                            }, 2000);

                        }
                        else alertRef.alertWithType('error', "Error", data.error);
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })

    }

    useEffect(() => {
        get_stats();
    }, [])


    const MakeReview = () => {
        let number = ratings;
        console.log('number is')
        console.log(ratings)
        var stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <View>
                    <RattingStarIcon width={25} height={25} color={i > number ? "grey" : null} />
                </View>
            )
        }
        return <View style={{ flexDirection: 'row' }}>{stars}</View>

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
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            {/*  Accounts Modal */}
            <ReactNativeModal
                isVisible={statementModal}
                style={{ backgroundColor: 'white', margin: 0 }}
                onRequestClose={() => { setStatementModal(false) }}
            >
                {loading && <Loader />}
                <DropdownAlert ref={(ref) => alertRef = ref} />
                {
                    loadingStatement ? <ActivityIndicator style={{ position: 'absolute', alignSelf: 'center', top: 100, alignItems: 'center' }} color={acolors.bgColor} />
                        :
                        <View style={{ width: "100%", alignSelf: 'flex-start', height: "100%" }}>

                            <View style={{ flexDirection: 'row', paddingHorizontal: 20, height: 50, alignItems: 'center', backgroundColor: acolors.bgColor, justifyContent: 'space-between', }}>
                                <TouchableOpacity
                                    onPress={() => wView ? setWView(false) : setStatementModal(false)}
                                    style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
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
                                style={{ flexDirection: 'row', position: 'absolute', bottom: 0, paddingHorizontal: 20, width: "100%", height: 50, alignItems: 'center', backgroundColor: acolors.bgColor, justifyContent: 'center', }}>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 20, color: acolors.white }}>Request Withdrawal</Text>
                                {wView && <Text style={{ fontFamily: 'ABRe', fontSize: 20, color: acolors.white, }}>- ${wAmount}</Text>}
                            </TouchableOpacity>

                            {!wView ?
                                <>
                                    <View style={{ flexDirection: 'row', height: 40 }}>
                                        {
                                            ["id", "ref type", "Amount in", "Amount out", "Balance", "Date",].map((v, i) => {
                                                return (
                                                    <View key={i} style={{ width: i == 0 ? "11.66%" : "17.65%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, }}>
                                                        <Text style={{ fontSize: 10, fontFamily: 'PBo', color: "black" }}>{v}</Text>
                                                    </View>
                                                )
                                            })

                                        }
                                    </View>

                                    {
                                        accountStatement?.map((v, i) => {
                                            return (
                                                <View style={{ flexDirection: 'row', }}>
                                                    <View style={{ paddingVertical: 10, width: "11.66%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, }}>
                                                        <Text style={{ fontSize: 10, fontFamily: 'ABRe' }}>{v.t_id}</Text>
                                                    </View>
                                                    <View style={{ paddingVertical: 10, width: "17.65%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, }}>
                                                        <Text style={{ fontSize: 10, fontFamily: 'ABRe' }}>{v.ref_type}</Text>
                                                    </View>
                                                    <View style={{ paddingVertical: 10, width: "17.65%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, }}>
                                                        <Text style={{ fontSize: 10, fontFamily: 'ABRe' }}>{v.amount_in}</Text>
                                                    </View>
                                                    <View style={{ paddingVertical: 10, width: "17.65%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, }}>
                                                        <Text style={{ fontSize: 10, fontFamily: 'ABRe' }}>{v.amount_out}</Text>
                                                    </View>
                                                    <View style={{ paddingVertical: 10, width: "17.65%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, }}>
                                                        <Text style={{ fontSize: 10, fontFamily: 'ABRe' }}>{v.balance}</Text>
                                                    </View>
                                                    <View style={{ paddingVertical: 10, width: "17.65%", alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, }}>
                                                        <Text style={{ fontSize: 10, fontFamily: 'ABRe' }}>{v.date_time}</Text>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </>
                                :
                                <View style={{ width: "85%", alignSelf: 'center', marginTop: 25, }}>
                                    <Text style={{ position: 'absolute', top: 14, alignSelf: 'center', left: 5, fontSize: 14, color: acolors.bgColor }}>$</Text>
                                    <TextInput
                                        placeholder='Enter widthdraw amount'
                                        keyboardType='numeric'
                                        onChangeText={setWAmount}
                                        placeholderTextColor={acolors.bgColor}
                                        style={{ borderWidth: 1, borderColor: acolors.bgColor, borderRadius: 7, paddingHorizontal: 15, fontSize: 14, fontFamily: 'ABRe', height: 49, color: acolors.bgColor }}
                                    />
                                    <Text></Text>
                                </View>
                            }


                        </View>
                }

            </ReactNativeModal>


            {/*  Accounts Modal */}


            <SafeAreaView style={{ marginTop: 10, width: "95%", alignSelf: 'center' }}>

                <Header />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={{ paddingBottom: 150 }} >
                    <TouchableOpacity
                        onPress={() => {
                            navigate('AccountStatement', {
                                current_balance
                            })
                            // setStatementModal(true)
                            // get_account_statement()
                        }}
                        style={{ flexDirection: 'row', justifyContent: 'center', }}>
                        <Text style={{ marginTop: 10, fontSize: 18, color: 'rgba(255,255,255,0.7)', fontFamily: 'PBo' }}>Current Balance:</Text>
                        <Text style={{ marginTop: 10, fontSize: 20, color: 'rgba(255,255,255,0.9)', fontFamily: 'ABRe', marginLeft: 5, }}>${current_balance}</Text>
                    </TouchableOpacity>




                    {/* Week */}
                    <View style={{ width: "100%", flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', }}>
                        {/* Current Week */}
                        <View style={{ width: "49%", backgroundColor: '#222222', borderRadius: 8, padding: 10, backgroundColor: acolors.primary }}>
                            <Text style={{ alignSelf: 'center', fontSize: 18, color: acolors.bgColor, fontFamily: 'ABRe', }}>Current Week</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontFamily: 'ABRe' }}>Revenue:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontWeight: 'bold', marginLeft: 5, }}>{currentWeek.revenue}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontFamily: 'ABRe' }}>Hours Booked:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontWeight: 'bold', marginLeft: 5, }}>{currentWeek.hours_booked}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontFamily: 'ABRe' }}>Completed Appts:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontWeight: 'bold', marginLeft: 5, }}>{currentWeek.total_app}</Text>
                            </View>
                        </View>
                        {/*  Last Week */}
                        <View style={{ width: "49%", backgroundColor: '#222222', borderRadius: 8, padding: 10, }}>
                            <Text style={{ alignSelf: 'center', fontSize: 18, color: acolors.white, fontFamily: 'ABRe', }}>Last Week</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe' }}>Revenue:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 'bold', marginLeft: 5, }}>{lastWeek.revenue}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe' }}>Hours Booked:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 'bold', marginLeft: 5, }}>{lastWeek.hours_booked}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe' }}>Completed Appts:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 'bold', marginLeft: 5, }}>{lastWeek.total_app}</Text>
                            </View>

                        </View>
                    </View>

                    {/* Month */}
                    <View style={{ width: "100%", flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', }}>
                        {/* Current Week */}
                        <View style={{ width: "49%", backgroundColor: '#222222', borderRadius: 8, padding: 10, backgroundColor: '#B6FFFF' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 18, color: acolors.bgColor, fontFamily: 'ABRe', }}>Current Month</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontFamily: 'ABRe' }}>Revenue:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontWeight: 'bold', marginLeft: 5, }}>{currentMonth.revenue}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontFamily: 'ABRe' }}>Hours Booked:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontWeight: 'bold', marginLeft: 5, }}>{currentMonth.hours_booked}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontFamily: 'ABRe' }}>Completed Appts:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontWeight: 'bold', marginLeft: 5, }}>{currentMonth.total_app}</Text>
                            </View>

                        </View>
                        {/*  Last Week */}
                        <View style={{ width: "49%", backgroundColor: '#222222', borderRadius: 8, padding: 10, }}>
                            <Text style={{ alignSelf: 'center', fontSize: 18, color: acolors.white, fontFamily: 'ABRe', }}>Last Month</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe' }}>Revenue:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 'bold', marginLeft: 5, }}>{lastMonth.revenue}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe' }}>Hours Booked:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe', marginLeft: 5 }}>{lastMonth.hours_booked}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe' }}>Completed Appts:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe', marginLeft: 5 }}>{lastMonth.total_app}</Text>
                            </View>
                        </View>
                    </View>
                    {/* Year */}

                    <View style={{ width: "100%", flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', }}>
                        {/* Current Year */}
                        <View style={{ width: "49%", backgroundColor: '#222222', borderRadius: 8, padding: 10, backgroundColor: 'white' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 18, color: acolors.bgColor, fontFamily: 'ABRe', }}>Current Year <Text style={{ fontSize: 10 }}> (Jan 1-Dec 31)</Text></Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontFamily: 'ABRe' }}>Revenue:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontWeight: 'bold', marginLeft: 5, }}>{currentYear.revenue}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontFamily: 'ABRe' }}>Hours Booked:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontWeight: 'bold', marginLeft: 5, }}>{currentYear.hours_booked}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontFamily: 'ABRe' }}>Completed Appts:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: acolors.bgColor, fontWeight: 'bold', marginLeft: 5, }}>{currentYear.total_app}</Text>
                            </View>

                        </View>
                        {/*  Last Year */}
                        <View style={{ width: "49%", backgroundColor: '#222222', borderRadius: 8, padding: 10, }}>
                            <Text style={{ alignSelf: 'center', fontSize: 18, color: acolors.white, fontFamily: 'ABRe', }}>Last Year <Text style={{ fontSize: 10 }}> (Jan 1-Dec 31)</Text></Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe' }}>Revenue:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 'bold', marginLeft: 5, }}>{lastYear.revenue}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe' }}>Hours Booked:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe', marginLeft: 5 }}>{lastYear.hours_booked}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe' }}>Completed Appts:</Text>
                                <Text style={{ marginTop: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe', marginLeft: 5 }}>{lastYear.total_app}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 35, alignItems: 'center' }}>
                        <MakeReview />
                        {reviews && <Text style={{ marginTop: 10, fontSize: 20, color: 'rgba(255,255,255,0.7)', fontFamily: 'ABRe' }}>{Math.round(ratings)}/5</Text>}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                        <Text style={{ marginTop: 10, fontSize: 18, color: 'rgba(255,255,255,0.7)', fontFamily: 'PBo' }}>Reviews:</Text>
                        <Text style={{ marginTop: 10, fontSize: 20, color: 'rgba(255,255,255,0.9)', fontFamily: 'ABRe', marginLeft: 5, }}>{reviews}</Text>
                    </View>



                </ScrollView>

            </SafeAreaView>

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

export default Insights
