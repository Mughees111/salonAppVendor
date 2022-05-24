import React, { useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';

import { GooglePlacesAutocomplete } from "fiction-places-autocomplete";
import { ArrowLeft } from './Svgs';
import { acolors } from './AppColors';
import { useForceUpdate } from '../utils/functions';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


const AutoComplete = ({ onPress }) => {

    const forceUpdate = useForceUpdate();

    var map = React.useRef(null)

    useEffect(() => {
        forceUpdate();
    }, [])

    return (

        <ScrollView>
            <GooglePlacesAutocomplete
                onFail={error => {
                    Alert.alert('error')
                    console.error(error)
                }}

                // ref={map}
                // placeholder={'Search'}
                // placeholderTextColor={acolors.white}
                // minLength={2} // minimum length of text to search
                // autoFocus={false}
                // // returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                // keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                // // listViewDisplayed={false}    // true/false/undefined
                // fetchDetails={true}
                // renderDescription={row => row.description} // custom description render

                ref={map}
                placeholder={'Search'}
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed={false}    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render



                onPress={(data, details) => {
                    forceUpdate();
                    onPress(data, details)
                }}
                query={{
                    key: 'AIzaSyBSw0D88sjoodik8ALNNMhccUL-WQbpwJo',
                    language: 'en', // language of the results
                    components: "country:us|country:pk"
                }}

                styles={{

                    textInputContainer: { borderRadius: 100, backgroundColor: acolors.bgColor, marginHorizontal: -8, },
                    textInput: { backgroundColor: acolors.bgColor, color: 'white', width: viewportWidth, height: 42, borderRadius: 8, borderWidth: 1, borderColor: acolors.white, fontFamily: 'ABRe', fontSize: 14, paddingHorizontal: 10, marginTop: 0, flex: 1, marginTop: 1, },

                    // row: { paddingLeft: viewportWidth * (5 / 100), backgroundColor: '#fff' },
                    // listView: { backgroundColor: "#fff" },
                    // description: { fontWeight: 'bold' },
                    // predefinedPlacesDescription: { color: '#1faadb' },
                    // container: { width: viewportWidth, alignSelf: "center", zIndex: 55555 }

                    textInputContainer: {
                        width: viewportWidth * (75 / 100),
                        // alignSelf: "center",
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
                    row: { paddingLeft: viewportWidth * (5 / 100),height:viewportHeight },
                    listView: { backgroundColor: "#fff" },
                    description: { fontWeight: 'bold' },
                    predefinedPlacesDescription: { color: '#1faadb' },
                    container: { width: viewportWidth, alignSelf: "center", zIndex: 55555 }



                }}
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GooglePlacesSearchQuery={{
                    rankby: 'distance',
                    type: 'cafe'
                }}


                GooglePlacesDetailsQuery={{
                    fields: ['formatted_address', 'geometry'],
                }}
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
        </ScrollView>

    )
}

export default AutoComplete


