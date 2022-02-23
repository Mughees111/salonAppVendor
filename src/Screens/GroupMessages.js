import { ArrowLeft as ArrowBack, ArrowLeft, ArrowRight, GroupIcon, SendIcon } from '../Components/Svgs'
import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet, Text, View, Dimensions, Image, StatusBar,
    Platform, TouchableOpacity, ImageBackground, ActivityIndicator, Alert
} from "react-native";
import { Container, Content, Header, Left, Body, Right, Button, Title, } from "native-base";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { doConsole, retrieveItem, storeItem, validateEmail } from "../utils/functions";
import { apiRequest, doPost } from "../utils/apiCalls";

import { acolors, acolors as AppColors } from '../Components/AppColors';

import DropdownAlert from "react-native-dropdownalert";
import { urls } from "../utils/Api_urls";
// import { StoryContainer } from 'react-native-stories-view';
import { Entypo } from '@expo/vector-icons';

import { Bubble, Composer, Day, GiftedChat, InputToolbar, Send, Time } from 'react-native-gifted-chat'
// import { ArrowBack as BackButton } from '../Components/SvgIcons';


let alertRef;
//ATUO
import Pusher from 'pusher-js/react-native';
Pusher.logToConsole = true;
var pusher = new Pusher('033f6b20d0bff06d62de', {
    cluster: 'ap2'
});
//ATUO

var textType = "image";
var mimeType = "image/png";
var extType = ".png";

const useForceUpdate = () => {
    const [, updateState] = React.useState();
    return useCallback(() => updateState({}), []);
}
const filters = [
    "Posts",
    "Media",
    "People"
]
const GroupMessages = (props) => {

    let carousell;
    //('params are')

    //(props.route.params)
    const g_id = props.route?.params.data.g_id;
    const params = props.route.params.data


    const forceUpdate = useForceUpdate()

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const [moreAvailable, setMoreAvailable] = useState(0)
    const [page, setPage] = useState(0)
    const [canSend, setCanSend] = useState(true)


    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)

    let isFirstTime = true;
    //ATUO
    var channel = pusher.subscribe('chat-channel-vendor');
    //ATUO
    const navigation = useNavigation()
    const [search, setSearchText] = React.useState("")


    const [mainChats, setMainChats] = React.useState([])
    const [chats, setChats] = React.useState([])


    const [user, setUser] = React.useState({})

    useFocusEffect(React.useCallback(() => {

        retrieveItem("login_data").then((data) => {
            setUser(data)
        })


    }, []))
    useEffect(() => {
        if (user) {
            loadChat()

        }
    }, [user])

    //ATUO
    const setupPusher = () => {
        //("binding");
        if (!isFirstTime) return
        isFirstTime = false
        //("binding2");
        channel.bind('chat', function (data) {
            // alert(JSON.stringify(data));
            //("Pusher data")
            //(data?.to_alert + " with " + user?.id)
            if (data?.to_alert == user?.sal_id) {
                var x = [data?.msg];
                setMessages(previousMessages => GiftedChat.append(previousMessages, x))
            }
        });
    }
    //ATUO
    const loadChat = async () => {

        var x = alertRef;
        const dbData = {

            token: user?.token ?? "",
            // convo_id: state_convo_id,
            g_id: g_id
            // g_id : props.route.params
            // user_id 
        };

        console.log('db data = ')
        console.log(dbData);
        if (dbData?.token == "") return
        //(dbData)
        //("@get_msgs");
        // const { isError, data } = await doPost(dbData, "get_msgs");
        apiRequest(dbData, "get_msgs_group")
            .then(data => {
                setLoading(false)

                if (data.action == "success") {

                    setMessages(data.msgs)
                    setCanSend(data?.can_send == 1 ? 1 : 0)
                    setMoreAvailable(data.more_available)
                    //ATUO
                    setupPusher();
                    //ATUO
                    setTimeout(() => {
                        setLoading(false)
                    }, 500)

                }
                else {
                    setLoading(false)
                    //(data.error)
                    //("^^^^^^^^^");
                    x.alertWithType("error", "Error", data.error);
                }
            })
            .catch(err => {
                setLoading(false)
                //('console 4')
                Alert.alert('Internet Error')
            })
        //   //(isError);


    }



    const onSend = async (text) => {

        var x = alertRef;

        if (text.length < 1) {
            x.alertWithType("error", "Error", "Please type your message");

            return;
        }
        setLoading(true)
        const dbData = {
            token: user?.token ?? "",
            msg: text,
            g_id: g_id
        };
        console.log('db data')
        console.log(dbData);
        setSending(true);

        const { isError, data } = await doPost(dbData, "send_msg_group");
        setLoading(false)

        setSending(false)
        setSending(false)
        if (isError) {
            x.alertWithType("error", "Error", "Internet");
        }
        else {
            if (data.action == "success") {
                console.log('data i get from ')
                console.log(data)
                var x = [data?.to_print];
                console.log('x = ')
                console.log(x)

                setMessages(previousMessages => GiftedChat.append(previousMessages, x[0]))
                setTimeout(() => {
                    setSending(false);
                }, 500)
            }
            else {
                setSending(false)
                x.alertWithType("error", "Error", data.error);
            }
        }


    }


    const Header = () => (
        <View style={{ width: "100%", backgroundColor: '#262432', padding: 10 }}>



            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                    style={{ width: 32, alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowLeft />
                </TouchableOpacity>
                {
                    params.g_pic ? <Image
                        style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                        source={{ uri: params.g_pic }}
                    />
                        : <GroupIcon />
                }
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: 'white', fontFamily: 'ABRe', fontSize: 18, marginBottom: 2 }}>{params?.g_name}</Text>
                    <View style={{ flexDirection: 'row', marginLeft: -2 }}>
                        {
                            params?.users?.map((v, i) => {
                                return (
                                    <Text style={{ color: 'white', fontFamily: 'ABRe', fontSize: 12, marginLeft: 2 }}>{v?.username}{i == params?.users?.length - 1 ? null : ","}</Text>
                                )
                            })
                        }
                    </View>
                </View>

            </View>

        </View>
    )


    return (
        <View
            style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            // translucent={false}
            />
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <Header />

            <View style={{ width: "80%", alignSelf: 'center' }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS == 'ios' ? 35 : 25, alignItems: 'center' }}>

                    {/* <View style={{ flexDirection: 'row' }}> */}
                    {/* <Image
                        style={{ width: 44, height: 44, borderRadius: 22, }}
                        source={{ uri:  }}
                    /> */}

                    {/* <Text style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 'bold', textTransform: 'capitalize' }}>{name}</Text> */}
                </View>
            </View>







            <View>
                {loading && <View style={{ marginVertical: 20, alignSelf: "center" }}><ActivityIndicator color={"white"} size={"large"} /></View>}
                {!loading && messages?.length == 0 && <View style={{ marginVertical: 20, alignSelf: "center" }}><Text style={{ textAlign: "center", color: 'white', fontFamily: 'ABRe' }}>No messages yet</Text></View>}

            </View>



            <View style={{ flex: 1, marginBottom: 10, }}>

                <GiftedChat
                    messages={messages}
                    showUserAvatar={true}
                    // renderUsernameOnMessage={true}

                    renderAvatar={(props) => {
                        // const { avatarProps } = props.currentMessage;
                        // console.log('avatar')
                        // console.log(props.currentMessage.user)
                        if (props?.currentMessage?.user?.name) {
                            return (
                                <View style={{width:50,alignItems:'center',justifyContent:'center'}}>
                                    <Image
                                        style={{ width: 35, height: 35, borderRadius: 35 / 2 }}
                                        source={{ uri: props?.currentMessage?.user?.avatar }}
                                    />
                                    <Text 
                                        ellipsizeMode='clip'
                                        numberOfLines={2}
                                        style={{ color: 'white',fontSize:9,textAlign:'center' }}>{props?.currentMessage?.user?.name}</Text>
                                </View>
                                // <UserAvatar size="40" name={avatarProps.name} src={avatarProps.icon} />
                            );
                        }
                        return (null);
                    }}
                    // renderAvatar={()=>(

                    // ))}

                    renderTime={() => null}
                    renderDay={props => {
                        return (
                            <Day
                                {...props}
                                textStyle={{ color: '#E2B378' }}
                            />
                        );
                    }}

                    renderInputToolbar={() => {
                        return <View style={{ width: "100%" }}>

                        </View>



                    }}
                    renderSend={(props) => {
                        return (
                            <Send
                                {...props}
                                containerStyle={{ width: 45, height: 45, borderRadius: 45 / 2, backgroundColor: '#E2B378', justifyContent: "center", alignItems: 'center', }}
                            >
                                {/* <View style={{width: 50.61, height: 50.61, borderRadius: 25.30, backgroundColor: '#A047C8', justifyContent: "center", alignItems: 'center', marginLeft: -10 }}
                                > */}
                                <SendIcon />
                                {/* </View> */}
                            </Send>
                        )
                    }}

                    renderComposer={props => {
                        return (

                            <Composer
                                textInputStyle={{ height: 15.2, margin: 0, alignSelf: 'center', color: acolors.bgColor, fontSize: 13, paddingLeft: 10, fontFamily: 'ABRe' }}
                                multiline={true}
                                {...props}
                                placeholder="Type message"
                                placeholderTextColor={acolors.bgColor}
                            // composerHeight={11}

                            // style={{ }}
                            />



                        )
                    }}
                    renderBubble={props => {
                        return (
                            <Bubble
                                {...props}

                                textStyle={{
                                    right: {
                                        color: '#000000',
                                        fontFamily: 'ABRe'
                                    },
                                    left: {
                                        color: '#FCFCFC',
                                        fontFamily: 'ABRe'

                                    },
                                }}


                                wrapperStyle={{
                                    left: {

                                        // borderRadius: 0,
                                        // borderRadius: 18,
                                        // backgroundColor: "#A047C8",
                                        // paddingLeft: 20,
                                        // paddingRight: 20,
                                        // paddingTop: 5,
                                        // paddingBottom: 5

                                        marginBottom: 5,
                                        paddingVertical: 5,
                                        paddingHorizontal: 15,
                                        backgroundColor: '#262432',
                                        borderRadius: 20,
                                        borderTopStartRadius: 0,


                                    },
                                    right: {

                                        marginTop: 5,

                                        paddingVertical: 5,
                                        paddingHorizontal: 15,
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: 20,
                                        borderTopEndRadius: 0,
                                    },
                                }}
                            />
                        );
                    }}
                    user={{
                        _id: user?.sal_id,
                    }}
                    onSend={(msgss) => {
                        var msg = msgss[0].text;
                        onSend(msg)
                    }}
                    renderInputToolbar={(props) => {
                        // if (!canSend) {
                        // return (<View style={{ width: "90%", alignSelf: "center", alignItems: "center" }}>
                        //     <Text style={{ color: "red", textAlign: "center", fontSize: 11, fontStyle: "italic" }}>You cannot send message to this user, as you are not linked to this user yet</Text>
                        // </View>)
                        // } else {
                        return (
                            <InputToolbar
                                {...props}
                            />
                        );
                        // }
                    }}

                />
            </View>





        </View >
        // </Container>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signview: {
        alignSelf: 'center', alignItems: "center", borderRadius: 3, width: 114, backgroundColor: AppColors.appColor, paddingVertical: 10
    },
    bookview: {
        alignSelf: 'center', alignItems: "center", borderRadius: 3, width: 56, backgroundColor: AppColors.appColor, paddingVertical: 6
    },
    loginview: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,

        alignSelf: 'center', alignItems: "center", borderRadius: 3, width: 114, backgroundColor: AppColors.white, paddingVertical: 10
    },
    signtext: {
        fontSize: 20, color: AppColors.white, fontFamily: 'SR', lineHeight: 24
    },
    logintext: {
        fontSize: 20, color: AppColors.appColor, fontFamily: 'SR', lineHeight: 24
    }
});


export default GroupMessages