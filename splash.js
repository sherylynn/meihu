/**
 * Created by kenny on 16/3/4.
 */
'use strict';

import React, {
    Component,
} from 'react';
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

import FramePage from './framepage';
import _updateConfig from './update.json';
const {appKey} = _updateConfig[Platform.OS];


export default class SplashScreen extends Component {
    componentWillMount() {
        if (isFirstTime) {
            markSuccess();
        } else if (isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
        }
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                    { text: '确定', onPress: () => { info.downloadUrl && Linking.openURL(info.downloadUrl) } },
                ]);
            } else if (info.upToDate) {
                
            } else {
                Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
                    { text: '是', onPress: () => { this.doUpdate(info) } },
                    { text: '否', },
                ]);
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    }
    constructor(props) {
        super(props);
        var {navigator} = props;
        setTimeout(() => {
            navigator.replace({ name: 'FramePage', component: FramePage })
        }, 1000);
    }

    render() {
        return (
            <Image source={require('./images/hello_page_bg.png') } style={styles.backgroundImage}/>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});