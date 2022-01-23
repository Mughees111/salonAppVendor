
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { acolors } from './AppColors';
import { ArrowDown } from './Svgs';



export class Calender extends React.Component {


    state = {
        activeDate: new Date(),
        activeRow: [],
        activeRowIndex: '',
        showOneRow: true,
    }


    months = ["January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October",
        "November", "December"];

    weekDays = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];
    nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    generateMatrix() {
        var matrix = [];
        // Create header
        matrix[0] = this.weekDays;

        // More code here

        var year = this.state.activeDate.getFullYear();
        var month = this.state.activeDate.getMonth();

        var firstDay = new Date(year, month, 1).getDay();

        var maxDays = this.nDays[month];
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


    _onPress = (item) => {
        if (!item.match && item != -1) {
            var date = this.state.activeDate
            date.setDate(item);
            this?.props?.onDayPress(date)
            this.setState(() => {
                this.state.activeDate.setDate(item);
                return this.state;

            })

        }
    };

    changeMonth = (n) => {
        this.setState(() => {
            this.state.activeDate.setMonth(
                this.state.activeDate.getMonth() + n
            )
            return this.state;
        });
    }


    render() {

        var matrix = this.generateMatrix();

        var currentDate = this.state.activeDate.getDate()
        var currentRow = [];
        matrix.forEach(function (currentValue, index, arr) {
            var find = currentValue.includes(currentDate);
            if (find) {
                currentRow = currentValue;
                return
            }
        })
        this.state.activeRow = currentRow;


        var rows = [];
        rows = matrix.map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                if (rowIndex == 0) {
                    return null
                }
                return (
                    <TouchableOpacity
                        key={colIndex}
                        style={{
                            // flex: 1,
                            height: 25,
                            backgroundColor: this.state.activeDate.getDate() == item ? 'red' : acolors.bgColor,
                            borderRadius: 18,
                            width: 25,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 18.65,

                                // Highlight header
                                // backgroundColor: 
                                // rowIndex == 0 ? '#ddd' : '#fff',
                                // Highlight Sundays
                                color: '#CCCCCC',
                                fontFamily: 'ABRe'
                                // colIndex == 0 ? '#a00' : '#000',
                                // Highlight current date
                                // fontWeight: item == this.state.activeDate.getDate()
                                //     ? 'bold' : ''
                            }}
                            onPress={() => {
                                this._onPress(item)
                                // this.setState({ showOneRow: true })
                                this.setState({
                                    activeRow: row,
                                    showOneRow: true
                                })
                            }}>
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


        var renderOneRow = this.state?.activeRow.map((item, i) => {
            return (
                <TouchableOpacity
                    key={i}
                    style={{
                        // flex: 1,
                        height: 25,
                        backgroundColor: this.state.activeDate.getDate() == item ? 'red' : acolors.bgColor,
                        borderRadius: 18,
                        width: this.state.activeDate.getDate() == item ? 25 : 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{ textAlign: 'center', color: 'white', fontFamily: 'ABRe', fontSize: 12.67 }}
                        onPress={() => {
                            this._onPress(item)
                            console.log('pressed')
                        }}>
                        {item != -1 ? item : ''}
                    </Text>
                </TouchableOpacity>
            );
        });



        return (
            <View >
                <View style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: -20 }}>
                    {/* <RN.Button title="Previous"
                        onPress={() => this.changeMonth(-1)} /> */}
                    <TouchableOpacity
                        onPress={() => {
                            // console.log(this.state.activeRow)
                            this.setState({
                                showOneRow: !this.state.showOneRow
                            })
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                            fontFamily: 'ABRe',
                            fontSize: 18,
                            textAlign: 'center',
                            color: 'white'
                        }}>
                            {this.state.activeDate.getDate()}&nbsp;
                            {this.months[this.state.activeDate.getMonth()]} &nbsp;
                            {this.state.activeDate.getFullYear()}

                        </Text>
                        <ArrowDown style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                    {/* <RN.Button title="Next"
                        onPress={() => this.changeMonth(+1)} /> */}
                </View>

                {
                    this.state.showOneRow ?
                        <View style={{ marginTop: 0 }}>
                            <View style={{
                                flexDirection: 'row',
                                paddingTop: 15,

                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                {
                                    this.weekDays.map((v, i) => {
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
                                {renderOneRow}
                            </View>

                        </View>
                        :
                        <ReactNativeModal
                            onBackdropPress={() => {
                                this.setState({
                                    showOneRow: true
                                })
                            }}
                            animationIn={"slideInDown"}
                            animationInTiming={500}
                            animationOutTiming={500}
                            animationOut={"slideOutUp"}
                            backdropOpacity={0}
                            style={{ position: 'absolute', width: "100%", backgroundColor: acolors.bgColor, top: 50, margin: 0, paddingHorizontal: 10 }}
                            isVisible={this.state.showOneRow ? false : true} >

                            <View style={{ marginTop: 10, }}>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingTop: 15,

                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    {
                                        this.weekDays.map((v, i) => {
                                            return (
                                                <Text
                                                    key={i}
                                                    style={{ width: 25, textAlign: 'center', color: 'white', fontFamily: 'ABRe', fontSize: 12.67 }}>{v}</Text>
                                            )
                                        })
                                    }
                                </View>

                                {rows}
                            </View>
                        </ReactNativeModal>
                }



            </View>
        );
    }
}

// import React, { useEffect, useState } from 'react';
// import moment from "moment";
// import { View, Text } from 'react-native'




// const Calender = () => {
//     var weekdayshort = moment.weekdaysShort();
//     const [dateObject, setDateObject] = useState(moment())


//     const Weekdayshortname = () => {
//         return (
//             <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
//                 {
//                     weekdayshort.map(day => {
//                         return (

//                             <Text style={{ color: 'white' }} key={day}>
//                                 {day}
//                             </Text>

//                         );
//                     })}
//             </View>
//         )
//     }


//     const firstDayOfMonth = () => {
//         let dateObject = dateObject;
//         let firstDay = moment(dateObject)
//             .startOf("month")
//             .format("d");
//         return firstDay;
//     };

//     // function test() {

//     let blanks = [];
//     for (let i = 0; i < firstDayOfMonth(); i++) {
//         blanks.push(
//             <Text style={{ color: 'red' }}>{"a"}</Text>
//         );
//     }
//     let daysInMonth = [];
//     for (let d = 1; d <= daysInMonth; d++) {
//         daysInMonth.push(
//             <Text key={d} style={{ color: 'red' }} >
//                 {d}
//             </Text>
//         );
//     }

//     var totalSlots = [...blanks, ...daysInMonth];
//     let rows = [];
//     let cells = [];
//     console.log('total slots')
//     console.log(blanks);
//     totalSlots.forEach((row, i) => {
//         if (i % 7 !== 0) {
//             cells.push(row); // if index not equal 7 that means not go to next week  
//         } else {
//             rows.push(cells); // when reach next week we contain all td in last week to rows  
//             cells = []; // empty container  
//             cells.push(row); // in current loop we still push current row to new container  
//         }
//         if (i === totalSlots.length - 1) { // when end loop we add remain date  
//             rows.push(cells);
//         }
//     });
//     // }

//     // const DaysInMonth = () => (
//     //     <View style={{ flexDirection: 'row' }}>
//     //         {
//     //             rows.map((d, i) => {

//     //                 return <Text style={{ color: 'red' }} >{d}</Text>
//     //             })
//     //         }
//     //     </View>
//     // )



//     useEffect(() => {
//         // test();
//     }, []);




//     return (
//         <View>

//             <Weekdayshortname />
//             <View style={{ flexDirection: 'row',justifyContent:'space-around' }}>
//                 {blanks}
//                 <Text style={{ color: 'red' }}> {firstDayOfMonth()}</Text>
//             </View>
//             {/* <DaysInMonth /> */}

//         </View>
//     )
// }

// export default Calender;


