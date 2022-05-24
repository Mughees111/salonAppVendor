import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Alert } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight, FbIcon, GoogleIcon, PlusCircle } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';
import { retrieveItem, storeItem, useForceUpdate } from "../utils/functions";
import DropdownAlert from 'react-native-dropdownalert';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import * as Permissions from 'expo-permissions';
import ReactNativeModal from 'react-native-modal';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from "fiction-places-autocomplete";


import * as Location from 'expo-location';
import Loader from '../utils/Loader';
import { apiRequest } from '../utils/apiCalls';
import AutoComplete from '../Components/AutoComplete';



var alertRef;

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const Address = () => {


    var map = React.useRef(null)
    const forceUpdate = useForceUpdate();
    const [sal_address, setSallAddress] = useState('')
    const [sal_city, setSalCity] = useState('');
    const [sal_zip, setSalZip] = useState('');
    const [sal_state, setSalState] = useState('');
    const [sal_country, setSalCountry] = useState('');
    const [loading, setLoading] = useState(false)
    const [selectOnMap, setSelectOnMap] = useState(false)
    const [sal_lat, setSalLat] = useState('')
    const [sal_lng, setSalLng] = useState('')

    const [country_id, setCId] = useState('')
    const [state_id, setStateId] = useState('');

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const GOOGLE_MAPS = 'AIzaSyBSw0D88sjoodik8ALNNMhccUL-WQbpwJo';


    const [userSelectedLocation, setUserSelectedLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
        locationTitle: ''
    });

    async function handleUserLocation(locationObj) {

        if (!locationObj) {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }
            setLoading(true)
            var locationn
            try {
                locationn = await Location.getCurrentPositionAsync({});
            }
            catch {
                setLoading(false)
                Alert.alert('error')
                return;
            }



            var r = locationn?.coords
        }
        else var r = locationObj
        setLoading(true)
        setSalLat(r.latitude);
        setSalLng(r.longitude);
        setLoading(false)

        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + r?.latitude + "," + r?.longitude + "&key=" + GOOGLE_MAPS;
        console.log(url);

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([]),
        }).then((response) => response.json())
            .then((responseJson) => {
                setLoading(false)
                console.log("I get:");

                if (responseJson.status == "OK") {
                    const address_components = responseJson.results[0].address_components;
                    let country = address_components[address_components.length - 1].long_name;
                    let state = address_components[address_components.length - 2].long_name;
                    let city = address_components[address_components.length - 3].long_name;
                    var address = responseJson.results[0].formatted_address;

                    console.log('country = ' + country);
                    console.log('state = ' + state);
                    // console.log('city = ' + city);
                    // console.log('address = ' + address);

                    setSallAddress(address);
                    setSalCountry(country);
                    setSalState(state);
                    setSalCity(city);


                    setUserSelectedLocation({
                        ...userSelectedLocation,
                        latitude: locationn.coords.latitude,
                        longitude: locationn.coords.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                        locationTitle: address
                    })
                    forceUpdate();
                }

            })
            .catch((error) => {
                setLoading(false)
                setTimeout(() => {
                    // alertRef.alertWithType('error', 'error', "Network Request Failed, Please check your internet connect and try again");
                    //   alert(error);
                }, 500);

            });



        forceUpdate();
        // setSelectPickepLocation(true)
    }


    function next() {

        if (sal_address.length < 3) {
            alertRef.alertWithType("error", "Error", "Please provide a valid address");
            return;
        }
        if (sal_country.length < 2) {
            alertRef.alertWithType("error", "Error", "Please provide a country");
            return;
        }
        if (sal_state.length < 2) {
            alertRef.alertWithType("error", "Error", "Please provide a valid state");
            return;
        }
        if (sal_city.length < 3) {
            alertRef.alertWithType("error", "Error", "Please provide a valid city");
            return;
        }
        if (sal_zip.length < 2) {
            alertRef.alertWithType("error", "Error", "Please provide a postal code");
            return;
        }

        retrieveItem('login_data')
            .then(data => {
                var data1 = data;
                data1.step = 4;
                data1.sal_address = sal_address;
                data1.sal_country = sal_country;
                data1.sal_city = sal_city;
                data1.sal_zip = sal_zip;
                data1.sal_state = sal_state;
                data1.sal_lat = sal_lat;
                data1.sal_lng = sal_lng;

                storeItem('login_data', data1)
                    .then(data => {
                        navigate('SalonTiming')
                    })
            })



    }


    function get_countries() {
        setLoading(true)
        apiRequest('', 'get_countries')
            .then(data => {
                setLoading(false)
                if (data?.action == 'success') {
                    console.log(data)
                    setCountries(data.data)
                }
            })
            .catch(err => {
                setLoading(false)
            })
    }

    function get_states(id) {
        setLoading(true)
        apiRequest({ country_id: id }, 'get_states')
            .then(data => {
                setLoading(false)
                if (data?.action == 'success') {
                    setStates(data.data)
                }
            })
            .catch(err => {
                setLoading(false)
            })
    }

    function get_cities(id) {
        setLoading(true)
        apiRequest({ state_id: id }, 'get_cities')
            .then(data => {
                setLoading(false)
                if (data?.action == 'success') {
                    setCities(data.data)
                }
            })
            .catch(err => {
                setLoading(false)
            })
    }

    function makeShortTitle(address_components) {
        var title = ""
        var found = false
        address_components?.forEach((e) => {
            if (e["types"]?.includes("locality")) {
                found = true
                title = e["long_name"]
            }

            if (e["types"]?.includes("country")) {
                title = title + ', ' + e["long_name"]
                setSalCountry(e["long_name"])
            }
        })

        if (found) {
            console.log(`short title: ${title}`)
            // setShortAddress(title);
            // forceUpdate();
            return title
        }
        else setShortAddress('');
        return r?.results[0]?.formatted_address ?? "Unknown"
    }


    function compIsType(t, s) {
        for (let z = 0; z < t.length; ++z)
            if (t[z] == s)
                return true;
        return false;
    }


    function handlePlaceChanged(place) {
        // const place = this.autocomplete.getPlace();
        //console.log(" from google auto complete place===>",place);
        let lat, lng, addrSel, placeName, placeId = '';
        let country, state, city = null;

        if (place.geometry !== undefined) {
            console.log('i have geoma')
            const plcGeom = place?.geometry;
            console.log(plcGeom)
            if (plcGeom?.location !== undefined) {
                lat = plcGeom?.location ? plcGeom.location.lat : '';
                lng = plcGeom?.location ? plcGeom.location.lng : '';
            }
        }

        addrSel = place?.formatted_address !== undefined ? place?.formatted_address : "";
        placeName = place?.name !== undefined ? place.name : "";
        placeId = place?.place_id !== undefined ? place.place_id : "";

        if (place?.address_components !== undefined) {
            let addrComp = place?.address_components;
            for (let i = 0; i < addrComp?.length; ++i) {
                var typ = addrComp[i]?.types;
                if (compIsType(typ, 'administrative_area_level_1'))
                    state = addrComp[i].long_name; //store the state
                else if (compIsType(typ, 'locality'))
                    city = addrComp[i].long_name; //store the city
                else if (compIsType(typ, 'country'))
                    country = addrComp[i].long_name; //store the country        

                //we can break early if we find all three data
                if (state != null && city != null && country != null) break;
            }


        }


        setSallAddress(addrSel)
        setSalCity(city)
        setSalState(state)
        setSalCountry(country)
        setSalLat(lat)
        setSalLng(lng)
        forceUpdate();

        // let stateResp = {
        //   'lat':lat,
        //   'lng': lng,
        //   'formattedAddress':addrSel, 
        //   'placeName': placeName,
        //   'placeId': placeId,
        //   'city':city,
        //   'state':state,
        //   'country':country,
        // //   'textboxtext':nameData
        // };
        // console.log(stateResp)
        //console.log(place);
        //console.log("==lat==>", lat," ==lng===>",lng, "==addrSel==>",addrSel);
        //this.props.onPlaceLoaded(place);
    }





    useEffect(() => {
        get_countries();
        handleUserLocation()
    }, [])


    const CountriesPrivacyPicker = useCallback(() => {
        return (
            <PrivacyPicker
                selected={{ title: sal_country ? sal_country : "Country" }}
                data={countries}
                onValueChange={(i, v) => {
                    setSalCountry(v.title)
                    get_states(v.id)
                }}
            />
        )
    }, [sal_country]);





    if (selectOnMap == true) {
        return (
            <ReactNativeModal
                isVisible={selectOnMap}
                style={{ margin: 0, }}
            >
                <View style={{ width: "100%", height: "100%", backgroundColor: 'white' }}>
                    <View style={[{ flex: 1, }]}>

                        {
                            selectOnMap ?

                                <View>
                                    <View style={{
                                        position: "relative", marginTop: 30, borderTopLeftRadius: 10, overflow: "hidden", borderTopRightRadius: 10,
                                    }}>
                                        <MapView
                                            ref={ref => map = ref}
                                            initialRegion={userSelectedLocation}
                                            showsUserLocation={true}
                                            showsMyLocationButton={true}
                                            onRegionChangeComplete={region => {
                                                setUserSelectedLocation(region)
                                            }}
                                            region={userSelectedLocation}
                                            provider={PROVIDER_GOOGLE}
                                            style={{ width: '100%', height: '100%' }}
                                        >
                                            <Marker
                                                coordinate={userSelectedLocation}
                                                pinColor={acolors.bgColor}
                                            />
                                        </MapView>
                                    </View>

                                    <View
                                        style={{ width: viewportWidth, position: 'absolute', top: 30 }}
                                    >
                                        <GooglePlacesAutocomplete
                                            // ref={map}
                                            placeholder={'Search'}
                                            minLength={2} // minimum length of text to search
                                            autoFocus={false}
                                            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                            keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                                            listViewDisplayed={false}    // true/false/undefined
                                            fetchDetails={true}
                                            renderDescription={row => row.description} // custom description render
                                            onPress={(data, details) => { // 'details' is provided when fetchDetails = true
                                                setUserSelectedLocation({
                                                    ...userSelectedLocation,
                                                    latitude: details.geometry.location.lat,
                                                    longitude: details.geometry.location.lng,
                                                    locationTitle: data.description
                                                })
                                                forceUpdate();
                                            }}
                                            query={{
                                                // available options: https://developers.google.com/places/web-service/autocomplete
                                                key: GOOGLE_MAPS,
                                                language: 'en', // language of the results
                                                // types: '(cities)' // default: 'geocode'
                                                components: "country:us|country:pk"
                                            }}

                                            styles={{
                                                textInputContainer: {
                                                    width: viewportWidth * (75 / 100),
                                                    marginLeft: 20,
                                                    backgroundColor: "#fff",
                                                    borderWidth: 1,
                                                    borderTopWidth: 1,
                                                    zIndex: 22,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: "#0E2163",
                                                    borderTopColor: "#0E2163",
                                                    borderLeftColor: "#0E2163",
                                                    borderRightColor: "#0E2163",
                                                    marginTop: 10,
                                                    borderRadius: 4,
                                                },
                                                row: { paddingLeft: viewportWidth * (5 / 100) },
                                                listView: { backgroundColor: "#fff" },
                                                description: { fontWeight: 'bold' },
                                                predefinedPlacesDescription: { color: '#1faadb' },
                                                container: { width: viewportWidth, alignSelf: "center", zIndex: 55555 }
                                            }}
                                            // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                                            // currentLocationLabel="Current location"
                                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                            GooglePlacesSearchQuery={{
                                                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                                rankby: 'distance',
                                                type: 'cafe'
                                            }}


                                            GooglePlacesDetailsQuery={{
                                                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                                                fields: ['formatted_address', 'geometry'],
                                            }}

                                            // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                            // predefinedPlaces={[cancel]}

                                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                                            renderLeftButton={() => (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setSelectOnMap(false)
                                                    }}
                                                    style={{ justifyContent: "center", marginLeft: 15 }}>
                                                    <ArrowLeft color="black" />
                                                </TouchableOpacity>
                                            )}
                                            renderRightButton={() => null}
                                        />
                                    </View>
                                </View>
                                : null
                        }

                    </View>



                    {/* <MapView
            // style={styles.map}
            // showsCompass={true}
            style={{ flex: 1 }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            initialRegion={initialRegion}
            onRegionChange={onChangeValue}
            onRegionChangeComplete={onChangeValue}
            ref={ref => map = ref}
          >
            <Marker
              title="Me" coordinate={initialRegion}
            />
          </MapView> */}
                    {/* <SafeAreaView style={{ position: 'absolute', width: "90%", alignSelf: 'center', top: 0, flexDirection: 'row', justifyContent: 'space-between', }}>
            <TouchableOpacity
              onPress={() => {
                setPickup(0)
                setSelectPickepLocation(false)
    
              }}
            >
              <ArrowBack color="black" />
            </TouchableOpacity>
            <Text style={{ color: 'black', fontFamily: 'PBo', fontSize: 20 }}>Select Location</Text>
          </SafeAreaView> */}
                    <TouchableOpacity
                        onPress={() => {
                            forceUpdate();
                            console.log(userSelectedLocation)
                            handleUserLocation(userSelectedLocation);
                            setSelectOnMap(false)

                        }}
                        style={{ height: 54, width: "40%", alignSelf: 'center', position: 'absolute', bottom: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: acolors.bgColor, marginTop: 20, borderRadius: 9 }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 18, color: '#FFFFFF' }}>Done</Text>
                    </TouchableOpacity>
                </View>

            </ReactNativeModal>


        )
    }

    // else 



    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
                translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Your Address" />
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>Where can clients find you?</Text>
                        <TouchableOpacity
                            onPress={() => setSelectOnMap(true)}
                            style={{ alignItems: 'center' }}>
                            <MaterialCommunityIcons name='google-maps' color={'white'} size={24} />
                            <Text style={{ fontFamily: 'ABRe', fontSize: 8, color: acolors.white }}>Select on map</Text>
                            {/* <Text style={{ fontFamily: 'ABRe', fontSize: 8, color: acolors.white }}>Search</Text> */}
                        </TouchableOpacity>

                    </View>
                    {/* <View style={{width:viewportWidth,height:viewportHeight}}>
                    <AutoComplete
                        onPress={(data, details)=>{
                            handlePlaceChanged(details)
                            // setSallAddress(data?.description)
                            // let r = details.geometry.location
                            // setSalLat(r.latitude);
                            // setSalLng(r.longitude);
                            // console.log('details')
                            // console.log(details)
                            // console.log('data')
                            // console.log(data)
                            // makeShortTitle(details.address_components)
                        }}
                        styles={{ width: "100%",height: 42,borderRadius: 8,borderWidth: 1,borderColor: acolors.white,color: acolors.white,fontFamily: 'ABRe',fontSize: 14,paddingHorizontal: 10,marginTop: 10}}
                    />
                    </View> */}

                    <CustomTextInput
                        placeholder="Address"
                        value={sal_address}
                        style={{ marginTop: 20 }}
                        onChangeText={setSallAddress}
                    />

                    {
                        countries?.length ?
                            <View style={{ width: "100%", height: 42, borderRadius: 8, borderWidth: 1, borderColor: acolors.white, color: acolors.white, fontFamily: 'ABRe', paddingRight: 10, alignItems: 'center', paddingTop: 10, marginTop: 15 }}>
                                <CountriesPrivacyPicker />
                            </View>
                            :
                            <CustomTextInput
                                value={sal_country}
                                placeholder="Country"
                                style={{ marginTop: 20 }}
                                onChangeText={setSalCountry}

                            />
                    }

                    {
                        states?.length ?
                            <View style={{ width: "100%", height: 42, borderRadius: 8, borderWidth: 1, borderColor: acolors.white, color: acolors.white, fontFamily: 'ABRe', paddingRight: 10, alignItems: 'center', paddingTop: 10, marginTop: 15 }}>
                                <PrivacyPicker
                                    selected={{ title: "States" }}
                                    data={states}
                                    onValueChange={(i, v) => {
                                        setSalState(v.title)
                                        get_cities(v.id)
                                    }}
                                />
                            </View>
                            :
                            <CustomTextInput
                                value={sal_state}
                                placeholder="State"
                                style={{ marginTop: 20 }}
                                onChangeText={setSalState}
                            />
                    }
                    {
                        cities?.length ?
                            <View style={{ width: "100%", height: 42, borderRadius: 8, borderWidth: 1, borderColor: acolors.white, color: acolors.white, fontFamily: 'ABRe', paddingRight: 10, alignItems: 'center', paddingTop: 10, marginTop: 15 }}>
                                <PrivacyPicker
                                    selected={{ title: "City" }}
                                    data={cities}
                                    onValueChange={(i, v) => {
                                        setSalCity(v.title)
                                        get_cities(v.id)
                                    }}
                                />
                            </View>
                            :
                            <CustomTextInput
                                value={sal_city}
                                placeholder="City"
                                style={{ marginTop: 20 }}
                                onChangeText={setSalCity}

                            />
                    }
                    <CustomTextInput
                        placeholder="Postal Code"
                        style={{ marginTop: 20 }}
                        onChangeText={setSalZip}

                    />
                    <CustomTextInput
                        placeholder="Appartment, room or suite number (optional)"
                        style={{ marginTop: 20 }}
                    />
                    <MainButton
                        text="Continue"
                        btnStyle={{ marginTop: 20 }}
                        onPress={() => {
                            next();
                            // navigate('MapLocation')
                        }}
                    />
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

export default Address


