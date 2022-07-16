
import React from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList
} from "react-native";


import { Container, Right, Body, Title, Content, DatePicker, Header, Left, Button, ListItem, Radio } from 'native-base';
// import DownA from "./Svgs/DownA";
import { ArrowDown as PickerArrowDown } from "./Svgs";
import { acolors } from './AppColors';
import { StatusBar } from "expo-status-bar";


interface dataType {
  title: "",
  value: ""
}

interface Props {
  data: any,
  selected: any,
  onValueChange: (i, v) => void
}

const PrivacyPicker = (props: Props) => {


  const [data, setData] = React.useState(props.data);
  const [filteredData, setFilteredData] = React.useState(props.data);
  const [modal, setModal] = React.useState(false);
  var temp = props.selected
  if (!temp.title) temp.title = 'Select'

  const [current, setCurrnet] = React.useState(temp);


  const do_filter = (str) => {
    str = str.toLowerCase();
    var all = data;
    console.log(all)
    var filtered_data = all.filter((v) => {
      var value = v.title.toLowerCase();
      console.log(value)
      return value.includes(str) ? true : false
    })
    setFilteredData(filtered_data);
  }



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
              setModal(false)
            }}
          >
            <Text style={{ color: '#fff' }}>Close</Text>
          </Button>
        </Left>
        <Body>
          <Title style={{ color: "white", fontSize: 20, }}>Choose</Title>
        </Body>
        {/* <Right /> */}

      </Header>
    )
  }
  const fresh_start = () => {

    setFilteredData(props.data);
    setModal(true)

  }



  return (
    <View style={{ width: '100%', paddingLeft: 10, paddingRight: 10, }} >
      <StatusBar
        style="light"
        backgroundColor="#111111"
        translucent={false}
      />
      <TouchableOpacity
        onPress={() => {
          fresh_start()
        }}
        style={[{ width: "100%" }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
          <FlatList
            keyExtractor={(item, index) => String(index)}
            data = {selected}
          />
          {/* <Text style={{ color: acolors.white, fontSize: 14, fontFamily: "ABRe" }}>{current.title}</Text> */}
          <PickerArrowDown />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modal}
        onRequestClose={() => {
          setModal(false)
        }}
      >
        <Container >
          {headerPicker()}
          {search()}
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => (
              <ListItem
                selected={item.title === current.title}
                button

                onPress={() => {
                  setModal(false)
                  props.onValueChange(index, item);
                  setCurrnet(item)

                }}
              >
                <Left>
                  <Text style={{ color: '#363636', fontSize: 20, fontFamily: "ABRe" }}>
                    {item.title}
                  </Text>
                </Left>
                <Right>
                  {(item.title === current.title) ? (
                    <Radio selected />
                  ) : (
                    <Radio selected={false} />
                  )}
                </Right>
              </ListItem>
            )}
          />
        </Container>
      </Modal>
    </View>);

};
export default PrivacyPicker;
