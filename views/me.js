/**
 * Created by kenny on 16/3/7.
 */
'use strict';

import React, {
    Component, } from 'react';
import {
    Platform,
    View,
    ListView,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    Linking,
    Clipboard
} from 'react-native';

import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';

import _updateConfig from '../update.json';
const {appKey} = _updateConfig[Platform.OS];

import ViewPager from 'react-native-viewpager';

let BANNER_IMGS = [
    require('../images/job1.jpg'),
    require('../images/job2.jpg'),
    require('../images/job3.jpg'),
    require('../images/job4.jpg')
];

import Resume from './me/resume';
import Util from './util.js'
var Service = require('./service.js');
import PouchDB from 'pouchdb-react-native';
const db_remote = new PouchDB(Service['host'] + '/db/users');
const db_local = new PouchDB('me', { adapter: 'asyncstorage' })
/*

                <TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={this._pressButton.bind(this, '我的收藏') }>
                    <View>
                        <View style={{ padding: 10, flexDirection: 'row' }}>
                            <Image style={styles.thumb} source={require('../images/icon_user_collect.png') }/>
                            <Text style={styles.icon_text}>收藏</Text>
                        </View>
                        <View style={styles.separator}/>
                    </View>
                </TouchableHighlight>
*/
export default class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: {
                flex: 1,
                opacity: 1
            },
            user: {
                username: '关爱每一天'
            },
            Login: true,
        };
    }
    async componentDidMount() {
        try {
            var doc = await db_local.get('user');
            var path = Service.host + Service.loginByToken;
            var data = await Util.post_promise(path, { token: doc.token });
            if (data.status) {
                console.log(data.data)
                this.setState({
                    Login: false,
                    user: data.data,
                });
            } else {
                this._logout();
                this.setState({
                    Login: true
                })
            }
        } catch (err) {
            console.log(err);
            this._logout();
            this.setState({
                Login: true
            })
        }
    }
    doUpdate = info => {
        downloadUpdate(info).then(hash => {
            Alert.alert('提示', '下载完毕,是否重启应用?', [
                { text: '是', onPress: () => { switchVersion(hash); } },
                { text: '否', },
                { text: '下次启动时', onPress: () => { switchVersionLater(hash); } },
            ]);
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };
    checkUpdate = () => {
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                    { text: '确定', onPress: () => { info.downloadUrl && Linking.openURL(info.downloadUrl) } },
                ]);
            } else if (info.upToDate) {
                Alert.alert('提示', '您的应用版本已是最新.');
            } else {
                Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
                    { text: '是', onPress: () => { this.doUpdate(info) } },
                    { text: '否', },
                ]);
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };
    _login() {

    }
    _reg() {

    }
    async _logout() {
        let db_local = new PouchDB('me', { adapter: 'asyncstorage' })
        try {
            await db_local.destroy();
            //Alert.alert('提示', '已经注销')
            this.setState({
                Login: true,
            })
        } catch (err) {
            console.log(err);
        }
    }
    _getEmail() {

    }
    _sendEmail() {
        let url = "mailto:352281674@qq.com"
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                Clipboard.setString('352281674@qq.com');
                Alert.alert('请安装邮箱软件或发送邮件,邮箱已复制到剪贴板')
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
    _getPassword() {

    }

    _renderPage(data) {
        return (<Image source={data} style={styles.page} />)
    }
    _pressButton = title => {
        let _this = this;
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Resume',
                component: Resume,
                params: {
                    title: title,
                    user: _this.state.user,
                    login_state: _this.state.Login,
                    Login: function (fuck, user) {
                        _this.setState({
                            Login: fuck,
                            user: user
                        })
                    }
                },
            });
        }
    }

    render() {
        let UNDERLAY_COLOR = '#E8E8E8';
        return (

            <ScrollView style={styles.container}>
                <View style={{ height: 225 }}>
                    <Image source={require('../images/avatar_bg.png') }
                        style={styles.backgroundImage}>
                        <Image source={require('../images/avatar.png') } style={styles.avatar}/>
                        <Text style={styles.name}>{this.state.Login ? '关爱每一天' : this.state.user.username}</Text>
                        {this.state.Login ?

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={() => this._pressButton('登录') }>
                                    <Text style={{ color: '#fff' }}>登录</Text>
                                </TouchableHighlight>
                                <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={() => this._pressButton('注册') }>
                                    <Text style={{ color: '#fff' }}>注册</Text>
                                </TouchableHighlight>
                            </View>
                            :
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={() => this._logout() }>
                                    <Text style={{ color: '#fff' }}>注销</Text>
                                </TouchableHighlight>
                            </View>
                        }
                    </Image>
                </View>
                <TouchableHighlight
                    underlayColor={UNDERLAY_COLOR}
                    onPress={() => this._pressButton('资料') }>
                    <View>
                        <View style={styles.icon_container}>
                            <Image source={require('../images/icon_user_resume.png') } style={styles.thumb}/>
                            <View style={{ flex: 2, flexDirection: 'row' }}>
                                <Text style={[{ flex: 1 }, styles.icon_text]}>资料</Text>
                                <Text style={[{ color: '#999', textAlign: 'right', marginTop: 8 }]}>查看个人信息</Text>
                            </View>
                        </View>
                        <View style={styles.separator}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={() => this._sendEmail() }>
                    <View>
                        <View style={styles.icon_container}>
                            <Image source={require('../images/icon_forget_password.png') } style={styles.thumb}/>
                            <View style={{ flex: 2, flexDirection: 'row' }}>
                                <Text style={[{ flex: 1 }, styles.icon_text]}>反馈</Text>
                                <Text style={[{ color: '#999', textAlign: 'right', marginTop: 8 }]}>登录邮箱发送邮件</Text>
                            </View>
                        </View>
                        <View style={styles.separator}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={this.checkUpdate}>
                    <View>
                        <View style={styles.icon_container}>
                            <Image style={styles.thumb} source={require('../images/icon_user_setting.png') }/>
                            <Text style={styles.icon_text}>检查更新</Text>
                        </View>
                        <View style={styles.separator}/>
                    </View>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //top: Platform.OS === 'android' ? 0 : 20,
        top: 0,
        flex: 1,
        backgroundColor: '#EEE'
    },
    icon_container: {
        padding: 10,
        flexDirection: 'row'
    },
    icon_text: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 6
    },
    thumb: {
        width: 30,
        height: 30
    },
    avatar: {
        marginTop: 40,
        width: 96,
        height: 96,
        borderRadius: 48
    },
    name: {
        color: '#FFF',
        fontSize: 16,
        marginTop: 10
    },
    btn: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        width: 90,
        height: 35,
        backgroundColor: '#3BC1FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    input: {
        marginLeft: 10,
        width: 220,
        borderWidth: Util.pixel,
        height: 35,
        paddingLeft: 8,
        borderRadius: 5,
        borderColor: '#ccc'
    },

    separator: {
        height: 1,
        backgroundColor: '#E8E8E8'
    },
    backgroundImage: {
        alignItems: 'center',
        flex: 1,
        //resizeMode: Platform.OS === 'android' ? null : 'cover',
        width: null,
        height: null,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
});
