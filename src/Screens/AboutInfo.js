import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowDown, ArrowLeft, ArrowRight, FbIcon, GoogleIcon } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';
import { retrieveItem, storeItem, useForceUpdate } from "../utils/functions";
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { apiRequest } from '../utils/apiCalls';
import ReactNativeModal from 'react-native-modal';
import { Title, Body, Button, Header, Left, Radio, Right } from 'native-base';


var alertRef;
const AboutInfo = () => {

    const forceUpdate = useForceUpdate();
    const [sal_name, setSalName] = useState('');
    const [sal_contact_person, setSalContactPerson] = useState('');
    const [sal_phone, setSalPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [sal_type, setSaltype] = useState('');
    const [sal_description, setSal_description] = useState('')
    const [lincense_id, setLincense_id] = useState('');
    const [isMobile, setIsMobile] = useState('0');

    const [catData, setCatData] = useState([]);
    const [selectedCat, setSelectedCat] = useState([]);
    const [selectCatModal, setSelectCatModal] = useState(false);
    const [countriesCode, setCountriesCode] = useState([]);
    const [phoneCode, setPhoneCode] = useState('+1');


    function get_countries_code() {
        setLoading(true)
        apiRequest({}, 'get_countries_code')
            .then(data => {
                if (data.action == 'success') {
                    setCountriesCode(data.data)
                }
                setLoading(false)

            })
            .catch(err => {
                setLoading(false)
            })
    }

    function next() {

        if (sal_name.length < 2) {
            alertRef.alertWithType("error", "Error", "Please provide a valid salon name");
            return;
        }
        if (sal_contact_person.length < 2) {
            alertRef.alertWithType("error", "Error", "Please provide a valid name");
            return;
        }
        if (sal_phone.length < 10) {
            alertRef.alertWithType("error", "Error", "Please provide a valid 10 digit phone");
            return;
        }
        if (sal_type == '') {
            alertRef.alertWithType("error", "Error", "Please provide a valid salon type");
            return;
        }
        // if (!selectedCat?.length) {
        //     alertRef.alertWithType("error", "Error", "Please select atleast one salon category");
        //     return;
        // }

        if (phoneCode == '') {
            alertRef.alertWithType("error", "Error", "Please provide a country code");
            return;
        }



        retrieveItem('login_data')
            .then(data => {

                var data1 = data;
                data1.step = 2;
                data1.sal_name = sal_name;
                data1.sal_contact_person = sal_contact_person;
                const phone = phoneCode;
                data1.sal_phone = phone + sal_phone;
                data1.sal_type = sal_type;
                data1.sal_description = sal_description;
                data1.lincense_id = lincense_id;
                data1.is_mobile = isMobile;
                var catIds = [];
                for (let key of selectedCat) {
                    catIds.push(key?.id);
                }
                data1.categories = catIds;
                storeItem('login_data', data1)
                    .then(data => {
                        navigate('PasswordSetup')
                    });
            });



    }

    function getCategories() {
        setLoading(true);
        apiRequest({ token: '' }, 'get_categories_v')
            .then(data => {
                console.log(data.data)
                setLoading(false);
                if (data.action == 'success') {

                    setCatData(data.data)
                }
                else alertRef.alertWithType('error', 'Error', data.error);


            })
            .catch(err => {
                setLoading(false);
            })

    }

    function addCategoryToArray(v) {

        let arr = selectedCat;
        if (arr.includes(v)) {
            let foundIndex = arr.indexOf(v);
            arr.splice(foundIndex, 1);
        }
        else {
            arr.push(v);
        }
        setSelectedCat(arr);
        forceUpdate();

    }





    useEffect(() => {
        getCategories();
        get_countries_code();

    }, [])


    const headerPicker = () => {
        return (
            <Header style={{ backgroundColor: acolors.bgColor }}>
                <Left>
                    <Button
                        style={{
                            shadowOffset: null,
                            shadowColor: null,
                            shadowRadius: null,
                            shadowOpacity: null,
                            marginLeft: 3,
                        }}
                        transparent
                        onPress={() => {
                            setSelectCatModal(false)
                        }}
                    >
                        <Text style={{ color: '#fff' }}>Close</Text>
                    </Button>
                </Left>
                {/* <Body>
                    <Text style={{ color: "white", fontSize: 20, }}>Choose</Text>
                </Body> */}
                <Right>
                    <Button
                        style={{
                            shadowOffset: null,
                            shadowColor: null,
                            shadowRadius: null,
                            shadowOpacity: null,
                            marginLeft: 3,
                        }}
                        transparent
                        onPress={() => {
                            setSelectCatModal(false)
                        }}
                    >
                        <Text style={{ color: '#fff' }}>Done</Text>
                    </Button>
                </Right>

            </Header>
        )
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor={acolors.statusBar}
                translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="About You" />
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>Tell us more about yourself and your saloon</Text>
                    <CustomTextInput
                        placeholder="Saloon Name"
                        style={{ marginTop: 20 }}
                        onChangeText={setSalName}
                    />
                    <CustomTextInput
                        placeholder="Your Name"
                        style={{ marginTop: 20 }}
                        onChangeText={setSalContactPerson}
                    />
                    <CustomTextInput
                        placeholder="Description (Optional) "
                        style={{ marginTop: 20 }}
                        onChangeText={setSal_description}
                    />

                    <View style={{ width: "100%", height: 42, marginTop: 15, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                        <PrivacyPicker
                            selected={{ title: "Salon type" }}
                            data={[{ title: "Men" }, { title: "Women" }, { title: "MEN and WOMEN" },]}
                            onValueChange={(index, title) => {
                                setSaltype(title.title)
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => setSelectCatModal(true)}
                        style={{ width: "100%", height: 42, marginTop: 15, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                        {!selectedCat.length ? <Text style={{ color: acolors.white, fontSize: 14, fontFamily: "ABRe" }}>Salon Category</Text>
                            :
                            <View style={{ flexDirection: 'row', marginLeft: -2 }}>
                                {selectedCat.map((v, i) => {
                                    return (

                                        <Text style={{ color: acolors.white, fontSize: 14, fontFamily: "ABRe", marginLeft: 2 }}>{v.title}, </Text>

                                    )
                                })
                                }
                            </View>
                        }
                        <ArrowDown />
                    </TouchableOpacity>
                    <View style={{ width: "100%", height: 42, marginTop: 15, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                        <PrivacyPicker
                            selected={{ title: "Are you mobile?" }}
                            data={[{title:"Yes"},{title : "No"}]}
                            onValueChange={(index, title) => {
                                setIsMobile(title.title == 'Yes' ? 1 : 0);
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: "17%", height: 42, marginTop: 15, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                            {/* <Text>92</Text> */}
                            <PrivacyPicker
                                selected={{ title: "+1" }}
                                data={countriesCode}
                                onValueChange={(index, title) => {
                                    setPhoneCode(title.title);
                                }}
                            />
                        </View>
                        <CustomTextInput
                            placeholder="Phone Number"
                            keyboardType={'numeric'}
                            style={{ marginLeft: "3%", width: "79%", marginTop: 15, }}
                            onChangeText={setSalPhone}
                        />
                    </View>

                    <CustomTextInput
                        placeholder="Lincense id"
                        style={{ marginTop: 20 }}
                        onChangeText={setLincense_id}
                    />

                    <MainButton
                        text="Continue"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => {
                            next()
                            // navigate('PasswordSetup') 
                        }}
                    />
                </ScrollView>

            </SafeAreaView>
            <ReactNativeModal
                isVisible={selectCatModal}
                style={{ margin: 0, marginTop: 20 }}

            >
                {headerPicker()}
                <View style={{ width: "100%", height: "100%", backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 20 }}>
                    {
                        catData?.map((v, i) => {
                            return (
                                <TouchableOpacity
                                    key={v?.id}
                                    onPress={() => addCategoryToArray(v)}
                                    style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", marginTop: 15, paddingBottom: 10, borderBottomWidth: 0.5, borderColor: 'grey' }}
                                >

                                    <Text style={{ color: '#363636', fontSize: 20, fontFamily: "ABRe" }}>
                                        {v?.title}
                                    </Text>

                                    {
                                        selectedCat.includes(v) ? (
                                            <Radio selected={true} />
                                        ) : (
                                            <Radio selected={false} />
                                        )
                                    }


                                </TouchableOpacity>
                            )
                        })
                    }




                </View>

            </ReactNativeModal>

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

export default AboutInfo
