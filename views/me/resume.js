/**
 * Created by kenny on 16/3/7.
 */
'use strict';

import React, {
    Component,
} from 'react';
import {
    Platform,
    BackAndroid,
    StyleSheet,
    View,
    ScrollView,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
var DeviceInfo = require('react-native-device-info');
import ViewPager from 'react-native-viewpager';
import Util from '../util.js'
var Service = require('../service.js');
import PouchDB from 'pouchdb-react-native'
//import PouchDB from 'pouchdb'
//import 'pouchdb-asyncstorage-down'
const db_remote = new PouchDB(Service['host'] + '/db/users');
const db_local = new PouchDB('me', { adapter: 'asyncstorage' })
export default class Resume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            password: '',
            email: '',
            showIndex: {
                height: 0,
                opacity: 0
            },
            showLogin: {
                flex: 1,
                opacity: 1
            },
            isLoadingShow: false
        };

    }
    _login() {
        var email = this.state.email;
        var password = this.state.password;
        var path = Service.host + Service.login;
        var that = this;

        //隐藏登录页 & 加载loading
        that.setState({
            showLogin: {
                height: 0,
                width: 0,
                flex: 0,
            },
            isLoadingShow: true
        });
        Util.post(path, {
            email: email,
            password: password,
            deviceId: DeviceInfo.getUniqueID(),
        }, function (data) {
            if (data.status) {
                var user = data.data;
                //加入数据到本地
                db_local.put({
                    _id:'user',
                    'username':user.username,
                    'token': user.token,
                    'userid': user.userid,
                    'email': user.email,
                }).then(
                    function () {
                        
                    }
                ).catch(function (err) {
                    if (!err) {
                        that.setState({
                            showLogin: {
                                height: 0,
                                width: 0,
                                flex: 0,
                            },
                            showIndex: {
                                flex: 1,
                                opacity: 1
                            },
                            isLoadingShow: false
                        });
                    }
                });

            } else {
                AlertIOS.alert('登录', '用户名或者密码错误');
                that.setState({
                    showLogin: {
                        flex: 1,
                        opacity: 1
                    },
                    showIndex: {
                        height: 0,
                        width: 0,
                        flex: 0,
                    },
                    isLoadingShow: false
                });
            }
        });
    }
    _reg() {

    }
    _getEmail() {

    }
    _getPassword() {

    }
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', () => this._pressButton());
        }
        db.get('token').then(function (doc) {

        }).then(function (response) {
            // handle response
        }).catch(function (err) {
            console.log(err);
        });
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', () => this._pressButton());
        }
    }

    _pressButton() {
        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        console.log(routers);
        if (routers.length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    };

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.caption_wrapper}>
                    <TouchableOpacity onPress={() => this._pressButton() }>
                        <Image source={require('../../images/icon_back.png') } style={styles.back_img}/>
                    </TouchableOpacity>
                    <Text style={styles.caption_text}>{this.props.title}</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.inputRow}>
                        <Text>邮箱</Text><TextInput style={styles.input} placeholder="请输入邮箱" onChangeText={(email) => this.setState({ email }) } />
                    </View>
                    <View style={styles.inputRow}>
                        <Text>密码</Text><TextInput style={styles.input} placeholder="请输入密码" password={true} onChangeText={(password) => this.setState({ password }) }/>
                    </View>
                    <View>
                        <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={this._login}>
                            <Text style={{ color: '#fff' }}>登录</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
/*

            <View style={{ flex: 1 }}>
                <View style={styles.caption_wrapper}>
                    <TouchableOpacity onPress={() => this._pressButton() }>
                        <Image source={require('../../images/icon_back.png') } style={styles.back_img}/>
                    </TouchableOpacity>

                        <View style={styles.container}>
                            <View>
                                <Image source={require('../../images/avatar.png') } style={styles.avatar}/>
                            </View>
                            <View style={styles.inputRow}>
                                <Text>邮箱</Text><TextInput style={styles.input} placeholder="请输入邮箱" onChangeText={this._getEmail}/>
                            </View>
                            <View style={styles.inputRow}>
                                <Text>密码</Text><TextInput style={styles.input} placeholder="请输入密码" password={true} onChangeText={this._getPassword}/>
                            </View>
                            <View>
                                <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={this._login}>
                                    <Text style={{ color: '#fff' }}>登录</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                </View>
            </View>
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    avatar: {
        marginTop: 40,
        width: 96,
        height: 96,
        borderRadius: 48
    },
    caption_wrapper: {
        padding: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    caption_text: {
        fontSize: 17,
        flex: 1,
        textAlign: 'center',
        marginRight: 30
    },
    back_img: {
        width: 30,
        height: 30
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    input: {
        marginLeft: 10,
        width: 220,
        borderWidth: Util.pixel,
        height: 40,
        paddingLeft: 8,
        borderRadius: 5,
        borderColor: '#ccc'
    },
    btn: {
        marginTop: 10,
        width: 80,
        height: 35,
        backgroundColor: '#3BC1FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    }
});
