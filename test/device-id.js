
import React, { Component, }from 'react'
import {AppRegistry, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

var DeviceInfo = require('react-native-device-info');
class Example extends Component {
    constructor() {
        super(...arguments);
        this.state = {
        }
    }
    fuck=()=>{
        Alert.alert(
            '设备id是',
            DeviceInfo.getUniqueID()
        )
    }
    render() {

        return <View style={{
            flex: 1,
        }}>
            <Text style={{
                marginTop: 15,
            }}>
                
            </Text>
            <TouchableOpacity onPress={() => this.fuck() }>
                <View>
                    <Text>{'获取设备id'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    }
}

AppRegistry.registerComponent('meihu', () => Example);