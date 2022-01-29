
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { useForceUpdate } from '../utils/functions';
import { acolors } from './AppColors';
import { ArrowDown } from './Svgs';




const Calender = (props) => {

    const forceUpdate = useForceUpdate();
    const [activeDate, setActiveDate] = useState(new Date())
    const [activeRow, setActiveRow] = useState([])
    const [activeRowIndex, setActiveRowIndex] = useState('')
    const [showOneRow, setShowOneRow] = useState(true)
    const [rows, setRows] = useState([])
    const [renderOneRow, setRenderOneRow] = useState();

    // state = {
    //     activeDate: new Date(),
    //     activeRow: [],
    //     activeRowIndex: '',
    //     showOneRow: true,
    // }


    var months = ["January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October",
        "November", "December"];

    var weekDays = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];
    var nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function generateMatrix() {
        var matrix = [];
        // Create header
        matrix[0] = weekDays;

        // More code here

        var year = activeDate.getFullYear();
        var month = activeDate.getMonth();

        var firstDay = new Date(year, month, 1).getDay();

        var maxDays = nDays[month];
        if (month == 1) { // February
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }

        var counter = 1;
        for (var row = 1; row < 7; row++) {
            matrix[row] = [];
            for (var col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than
                    // the number of days in the month
                    matrix[row][col] = counter++;
                }
            }
        }

        return matrix;

    }


    function _onPress(item) {
        if (!item.match && item != -1) {
            var date = activeDate
            date.setDate(item);
            setActiveDate(date)
            forceUpdate();
            props?.onDayPress(date)

            // this.setState(() => {
            //     this.state.activeDate.setDate(item);
            //     return this.state;

            // })

        }
    };

    function changeMonth(n) {
        activeDate.setMonth(activeDate.getMonth() + n)
        // this.setState(() => {
        //     this.state.activeDate.setMonth(
        //         this.state.activeDate.getMonth() + n
        //     )
        // return this.state;
        // });
    }

    const RenderOneRow1 = useCallback(() => {
        return activeRow.map((item, i) => {
            return (
                <TouchableOpacity
                    key={i}
                    onPress={() => {
                        _onPress(item)
                        forceUpdate();
                    }}
                    style={{
                        // flex: 1,
                        height: 25,
                        backgroundColor: activeDate.getDate() == item ? 'red' : acolors.bgColor,
                        borderRadius: 18,
                        width: activeDate.getDate() == item ? 25 : 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{ textAlign: 'center', color: 'white', fontFamily: 'ABRe', fontSize: 12.67 }}
                    >
                        {item != -1 ? item : ''}
                    </Text>
                </TouchableOpacity>
            );
        })
    }, [activeDate, activeRow])


    var rows1 = [];
    rows1 = useCallback(() => {
        return generateMatrix().map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                if (rowIndex == 0) {
                    return null
                }
                return (
                    <TouchableOpacity
                        key={colIndex}
                        style={{ height: 25, backgroundColor: activeDate.getDate() == item ? 'red' : acolors.bgColor, borderRadius: 18, width: 25, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => {
                            _onPress(item)
                            // this.setState({ showOneRow: true })
                            setActiveRow(row)
                            setShowOneRow(true)
                            forceUpdate();
                            // this.setState({
                            //     activeRow: row,
                            //     showOneRow: true
                            // })
                        }}
                    >
                        <Text
                            style={{ textAlign: 'center', fontSize: 18.65, color: '#CCCCCC', fontFamily: 'ABRe' }}
                        >
                            {item != -1 ? item : ''}
                        </Text>
                    </TouchableOpacity>
                );
            });
            return (

                <View
                    style={{
                        // flex: 1,
                        marginTop: -10,
                        flexDirection: 'row',
                        paddingVertical: 10,
                        justifyContent: 'space-between',
                        alignItems: 'center',

                    }}>
                    {rowItems}
                </View>
            );
        });
    }, [activeDate, activeRow])


    // render() {
    useFocusEffect(React.useCallback(() => {
        // useEffect(() => {
        // var matrix = ;
        setActiveDate(new Date());
        forceUpdate();
        var currentDate = activeDate.getDate()

        generateMatrix().forEach(function (currentValue, index, arr) {
            var find = currentValue.includes(currentDate);
            if (find) {
                setActiveRow(arr[index]);
                forceUpdate();
                return
            }
        })

    }, []))


    return (
        <View >
            <View style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: -20 }}>
                {/* <RN.Button title="Previous"
                        onPress={() => this.changeMonth(-1)} /> */}
                <TouchableOpacity
                    onPress={() => {
                        // console.log(this.state.activeRow)
                        setShowOneRow(!showOneRow)
                        // this.setState({
                        //     showOneRow: !this.state.showOneRow
                        // })
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{
                        fontFamily: 'ABRe',
                        fontSize: 18,
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        {activeDate.getDate()}&nbsp;
                        {months[activeDate.getMonth()]} &nbsp;
                        {activeDate.getFullYear()}

                    </Text>
                    <ArrowDown style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                {/* <RN.Button title="Next"
                        onPress={() => this.changeMonth(+1)} /> */}
            </View>

            {
                showOneRow ?
                    <View style={{ marginTop: 0 }}>
                        <View style={{
                            flexDirection: 'row',
                            paddingTop: 15,

                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            {
                                weekDays.map((v, i) => {
                                    return (
                                        <Text
                                            key={i}
                                            style={{ width: 25, textAlign: 'center', color: 'white', fontFamily: 'ABRe', fontSize: 12.67 }}>{v}</Text>
                                    )
                                })
                            }
                        </View>

                        <View
                            style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            <RenderOneRow1 />
                            {/* {renderOneRow1()} */}
                        </View>

                    </View>
                    :
                    <ReactNativeModal
                        onBackdropPress={() => {
                            setShowOneRow(true)
                            // this.setState({
                            //     showOneRow: true
                            // })
                        }}
                        animationIn={"slideInDown"}
                        animationInTiming={500}
                        animationOutTiming={500}
                        animationOut={"slideOutUp"}
                        backdropOpacity={0}
                        style={{ position: 'absolute', width: "100%", backgroundColor: acolors.bgColor, top: 50, margin: 0, paddingHorizontal: 10 }}
                        isVisible={showOneRow ? false : true} >

                        <View style={{ marginTop: 10, }}>
                            <View style={{
                                flexDirection: 'row',
                                paddingTop: 15,

                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                {
                                    weekDays.map((v, i) => {
                                        return (
                                            <Text
                                                key={i}
                                                style={{ width: 25, textAlign: 'center', color: 'white', fontFamily: 'ABRe', fontSize: 12.67 }}>{v}</Text>
                                        )
                                    })
                                }
                            </View>

                            {rows1()}
                        </View>
                    </ReactNativeModal>
            }



        </View>
    );
}




export default Calender


// export class Calender extends React.Component {


//     state = {
//         activeDate: new Date(),
//         activeRow: [],
//         activeRowIndex: '',
//         showOneRow: true,
//     }


//     months = ["January", "February", "March", "April",
//         "May", "June", "July", "August", "September", "October",
//         "November", "December"];

//     weekDays = [
//         "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
//     ];
//     nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//     generateMatrix() {
//         var matrix = [];
//         // Create header
//         matrix[0] = this.weekDays;

//         // More code here

//         var year = this.state.activeDate.getFullYear();
//         var month = this.state.activeDate.getMonth();

//         var firstDay = new Date(year, month, 1).getDay();

//         var maxDays = this.nDays[month];
//         if (month == 1) { // February
//             if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
//                 maxDays += 1;
//             }
//         }

//         var counter = 1;
//         for (var row = 1; row < 7; row++) {
//             matrix[row] = [];
//             for (var col = 0; col < 7; col++) {
//                 matrix[row][col] = -1;
//                 if (row == 1 && col >= firstDay) {
//                     // Fill in rows only after the first day of the month
//                     matrix[row][col] = counter++;
//                 } else if (row > 1 && counter <= maxDays) {
//                     // Fill in rows only if the counter's not greater than
//                     // the number of days in the month
//                     matrix[row][col] = counter++;
//                 }
//             }
//         }

//         return matrix;

//     }


//     _onPress = (item) => {
//         if (!item.match && item != -1) {
//             var date = this.state.activeDate
//             date.setDate(item);
//             this?.props?.onDayPress(date)
//             this.setState(() => {
//                 this.state.activeDate.setDate(item);
//                 return this.state;

//             })

//         }
//     };

//     changeMonth = (n) => {
//         this.setState(() => {
//             this.state.activeDate.setMonth(
//                 this.state.activeDate.getMonth() + n
//             )
//             return this.state;
//         });
//     }


//     render() {

//         var matrix = this.generateMatrix();

//         var currentDate = this.state.activeDate.getDate()
//         var currentRow = [];
//         matrix.forEach(function (currentValue, index, arr) {
//             var find = currentValue.includes(currentDate);
//             if (find) {
//                 currentRow = currentValue;
//                 return
//             }
//         })
//         this.state.activeRow = currentRow;


//         var rows = [];
//         rows = matrix.map((row, rowIndex) => {
//             var rowItems = row.map((item, colIndex) => {
//                 if (rowIndex == 0) {
//                     return null
//                 }
//                 return (
//                     <TouchableOpacity
//                         key={colIndex}
//                         style={{
//                             // flex: 1,
//                             height: 25,
//                             backgroundColor: this.state.activeDate.getDate() == item ? 'red' : acolors.bgColor,
//                             borderRadius: 18,
//                             width: 25,
//                             alignItems: 'center',
//                             justifyContent: 'center'
//                         }}
//                     >
//                         <Text
//                             style={{
//                                 textAlign: 'center',
//                                 fontSize: 18.65,

//                                 // Highlight header
//                                 // backgroundColor: 
//                                 // rowIndex == 0 ? '#ddd' : '#fff',
//                                 // Highlight Sundays
//                                 color: '#CCCCCC',
//                                 fontFamily: 'ABRe'
//                                 // colIndex == 0 ? '#a00' : '#000',
//                                 // Highlight current date
//                                 // fontWeight: item == this.state.activeDate.getDate()
//                                 //     ? 'bold' : ''
//                             }}
//                             onPress={() => {
//                                 this._onPress(item)
//                                 // this.setState({ showOneRow: true })
//                                 this.setState({
//                                     activeRow: row,
//                                     showOneRow: true
//                                 })
//                             }}>
//                             {item != -1 ? item : ''}
//                         </Text>
//                     </TouchableOpacity>
//                 );
//             });
//             return (

//                 <View
//                     style={{
//                         // flex: 1,
//                         marginTop: -10,
//                         flexDirection: 'row',
//                         paddingVertical: 10,
//                         justifyContent: 'space-between',
//                         alignItems: 'center',

//                     }}>
//                     {rowItems}
//                 </View>
//             );
//         });


//         var renderOneRow = this.state?.activeRow.map((item, i) => {
//             return (
//                 <TouchableOpacity
//                     key={i}
//                     style={{
//                         // flex: 1,
//                         height: 25,
//                         backgroundColor: this.state.activeDate.getDate() == item ? 'red' : acolors.bgColor,
//                         borderRadius: 18,
//                         width: this.state.activeDate.getDate() == item ? 25 : 20,
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                     }}
//                 >
//                     <Text
//                         style={{ textAlign: 'center', color: 'white', fontFamily: 'ABRe', fontSize: 12.67 }}
//                         onPress={() => {
//                             this._onPress(item)
//                             console.log('pressed')
//                         }}>
//                         {item != -1 ? item : ''}
//                     </Text>
//                 </TouchableOpacity>
//             );
//         });



//         return (
//             <View >
//                 <View style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: -20 }}>
//                     {/* <RN.Button title="Previous"
//                         onPress={() => this.changeMonth(-1)} /> */}
//                     <TouchableOpacity
//                         onPress={() => {
//                             // console.log(this.state.activeRow)
//                             this.setState({
//                                 showOneRow: !this.state.showOneRow
//                             })
//                         }}
//                         style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         <Text style={{
//                             fontFamily: 'ABRe',
//                             fontSize: 18,
//                             textAlign: 'center',
//                             color: 'white'
//                         }}>
//                             {this.state.activeDate.getDate()}&nbsp;
//                             {this.months[this.state.activeDate.getMonth()]} &nbsp;
//                             {this.state.activeDate.getFullYear()}

//                         </Text>
//                         <ArrowDown style={{ marginLeft: 10 }} />
//                     </TouchableOpacity>
//                     {/* <RN.Button title="Next"
//                         onPress={() => this.changeMonth(+1)} /> */}
//                 </View>

//                 {
//                     this.state.showOneRow ?
//                         <View style={{ marginTop: 0 }}>
//                             <View style={{
//                                 flexDirection: 'row',
//                                 paddingTop: 15,

//                                 justifyContent: 'space-between',
//                                 alignItems: 'center',
//                             }}>
//                                 {
//                                     this.weekDays.map((v, i) => {
//                                         return (
//                                             <Text
//                                                 key={i}
//                                                 style={{ width: 25, textAlign: 'center', color: 'white', fontFamily: 'ABRe', fontSize: 12.67 }}>{v}</Text>
//                                         )
//                                     })
//                                 }
//                             </View>

//                             <View
//                                 style={{
//                                     marginTop: 10,
//                                     flexDirection: 'row',
//                                     justifyContent: 'space-between',
//                                 }}>
//                                 {renderOneRow}
//                             </View>

//                         </View>
//                         :
//                         <ReactNativeModal
//                             onBackdropPress={() => {
//                                 this.setState({
//                                     showOneRow: true
//                                 })
//                             }}
//                             animationIn={"slideInDown"}
//                             animationInTiming={500}
//                             animationOutTiming={500}
//                             animationOut={"slideOutUp"}
//                             backdropOpacity={0}
//                             style={{ position: 'absolute', width: "100%", backgroundColor: acolors.bgColor, top: 50, margin: 0, paddingHorizontal: 10 }}
//                             isVisible={this.state.showOneRow ? false : true} >

//                             <View style={{ marginTop: 10, }}>
//                                 <View style={{
//                                     flexDirection: 'row',
//                                     paddingTop: 15,

//                                     justifyContent: 'space-between',
//                                     alignItems: 'center',
//                                 }}>
//                                     {
//                                         this.weekDays.map((v, i) => {
//                                             return (
//                                                 <Text
//                                                     key={i}
//                                                     style={{ width: 25, textAlign: 'center', color: 'white', fontFamily: 'ABRe', fontSize: 12.67 }}>{v}</Text>
//                                             )
//                                         })
//                                     }
//                                 </View>

//                                 {rows}
//                             </View>
//                         </ReactNativeModal>
//                 }



//             </View>
//         );
//     }
// }

