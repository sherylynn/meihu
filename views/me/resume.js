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
    Alert,
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
            /*
            username: 'lynn',
            email: '352281674@qq.com',
            password: '1234',
            re_password: '1234',
            */
            username: '',
            email: '',
            password: '',
            re_password: '',
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
    async _login() {
        //Alert.alert('登录', '这是登录的按钮');
        let db_local = new PouchDB('me', { adapter: 'asyncstorage' })
        var email = this.state.email;
        var password = this.state.password;
        var path = Service.host + Service.login;

        var data = await Util.post_promise(path, {
            email: email,
            password: password,
            deviceId: DeviceInfo.getUniqueID(),
        })
        if (data.status) {
            var user = data.data;
            //加入数据到本地
            try {
                var response = db_local.put({
                    _id: 'user',
                    'username': user.username,
                    'token': user.token,
                    'userid': user.userid,
                    'email': user.email,
                })
                this._flash(user);
            } catch (err) {
                if (!err) {
                    this.setState({
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
            }

        } else {
            Alert.alert('登录', data.data);
            this.setState({
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

    }
    async _reg() {
        //Alert.alert('注册', '这是注册的按钮');
        let db_local = new PouchDB('me', { adapter: 'asyncstorage' })
        let username = this.state.username;
        let email = this.state.email;
        let password = this.state.password;
        let re_password = this.state.re_password;
        let path = Service.host + Service.createUser;

        var data = await Util.post_promise(path, {
            username: username,
            email: email,
            password: password,
            re_password: re_password,
            deviceId: DeviceInfo.getUniqueID(),
        });
        if (data.status) {
            var user = data.data;
            try {
                //var doc = await db_local.get('user');
                var response = await db_local.put({
                    _id: 'user',
                    'username': user.username,
                    'token': user.token,
                    'email': user.email,
                });
                this._flash(user);
            } catch (err) {
                if (!err) {
                    this.setState({
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
                } else {
                    console.log(err)
                }
            }


            //加入数据到本地
            /*
            db_local.put({
                _id: 'user',
                'username': user.username,
                'token': user.token,
                'email': user.email,
            }).then(
                function () {
                    console.log('注册成功')
                    ()=>this._pressButton();
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
                    }else{
                        console.log(err)
                    }
                });
            */
        } else {
            Alert.alert('注册', data.data);
            this.setState({
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
    }
    _getEmail() {

    }
    _getPassword() {

    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', () => this._pressButton());
        }
        db_local.get('token').then(function (doc) {

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
    
    _flash(user) {
        const {navigator} = this.props;
        if(this.props.Login) {
                this.props.Login(false,user);
            }
        const routers = navigator.getCurrentRoutes();
        console.log(routers);
        if (routers.length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    };
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
                        <Text>邮　箱</Text><TextInput style={styles.input} placeholder="请输入邮箱" value={this.state.email} onChangeText={(email) => this.setState({ email }) } />
                    </View>
                    {this.props.title == '注册' ?
                        <View style={styles.inputRow}>
                            <Text>用户名</Text><TextInput style={styles.input} placeholder="请输入用户名" value={this.state.username} onChangeText={(username) => this.setState({ username }) } />
                        </View> : null
                    }
                    <View style={styles.inputRow}>
                        <Text>密　码</Text><TextInput style={styles.input} placeholder="请输入密码" password={true} value={this.state.password} onChangeText={(password) => this.setState({ password }) }/>
                    </View>
                    {this.props.title == '注册' ?
                        <View style={styles.inputRow}>
                            <Text>密　码</Text><TextInput style={styles.input} placeholder="请再次输入密码" password={true} value={this.state.re_password} onChangeText={(re_password) => this.setState({ re_password }) }/>
                        </View> : null
                    }
                    <View>
                        <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={this.props.title == '注册' ? () => this._reg() : () => this._login() }>
                            <Text style={{ color: '#fff' }}>{this.props.title}</Text>
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
