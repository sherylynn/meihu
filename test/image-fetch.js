
import React, { Component, }from 'react'
import {AppRegistry, View,Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Util from './../views/util.js';
import Service from './../views/service.js';


class Example extends Component {
    constructor() {
        super(...arguments);
        this.state = {
        }
    }
    async componentWillMount() {
        try {
            let path = Service.host + Service.getkankanList;
            let data = await Util.get_json(path);
            if (data.status) {
                console.log(data.data)             
            } else {
                Alert.alert('出错啦','什么鬼')
            }
        } catch (err) {
            console.log(err);
            Alert.alert('出错啦','服务器出小差啦')
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