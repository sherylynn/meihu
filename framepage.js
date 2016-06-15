/**
 * Created by kenny on 16/3/9.
 */
'use strict';

import React, {
    Component, } from 'react';
import {
    Dimensions,
    Image,
    View,
    Platform,
    StyleSheet,
    Text,
    AsyncStorage,
} from 'react-native';

let HOME_TAB = 'homeTab';
let HOME_NORMAL = require('./images/icon_home_nor.png');
let HOME_PRESS = require('./images/icon_home_pre.png');

let MESSAGE_TAB = 'messageTab';
let MESSAGE_NORMAL = require('./images/icon_message_nor.png');
let MESSAGE_PRESS = require('./images/icon_message_pre.png');

let KANKAN_TAB = 'kankanTab';
let KANKAN_NORMAL = require('./images/icon_find_nor.png');
let KANKAN_PRESS = require('./images/icon_find_pre.png');

let ME_TAB = 'meTab';
let ME_NORMAL = require('./images/icon_user_nor.png');
let ME_PRESS = require('./images/icon_user_pre.png');

import TabNavigator from 'react-native-tab-navigator';
import RouteHome from './routehome';
import Message from './views/message';
import Kankan from  './routekankan';
import RouteMe from './routeme';

//获取服务器上化妆品信息

import Util from './views/util';
import Service from './views/service';
//暂时调整为本地获取

let tabBarHidden = false;

export default class FramePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: HOME_TAB,
            tabBarShow: true
        };
    }

    _renderBadge(badgeCount) {
        if (!badgeCount) {
            return null;
        }
        return (
            <Image style={styles.badgeBg} source={require('./images/message_num_bg.png') }>
                <Text style={styles.badgeText}>{badgeCount}</Text>
            </Image>
        );
    }

    _renderTabItem(img, selectedImg, tag, title, badgeCount, childView) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                renderIcon={() => <Image style={styles.tabIcon} source={img}/>}
                title={title}
                selectedTitleStyle={styles.selectedTitleStyle}
                renderBadge={() => this._renderBadge(badgeCount) }
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}
                onPress={() => this.setState({ selectedTab: tag }) }>
                {childView}
            </TabNavigator.Item>
        );
    }

    _createChildView(tag) {
        let renderView;
        switch (tag) {
            case HOME_TAB:
                renderView = <RouteHome />;
                break;
            case MESSAGE_TAB:
                renderView = <Message />;
                break;
            case KANKAN_TAB:
                renderView = <Kankan />;
                break;
            case ME_TAB:
                renderView = <RouteMe />;
                break;
            default:
                break;
        }
        return (<View style={styles.container}>{renderView}</View>)
    }

    componentWillMount() {
    }

    render() {
        let {tabBarShow} = this.state;
        console.log(tabBarShow);
        return (
            <View style={styles.container}>
                <TabNavigator
                    hidesTabTouch={false}
                    sceneStyle={{ paddingBottom: 0 }}
                    tabBarStyle={tabBarShow ? styles.tabNav : styles.tabNavHide}>
                    {this._renderTabItem(HOME_NORMAL, HOME_PRESS, HOME_TAB, '美乎搜搜', 0, this._createChildView(HOME_TAB)) }
                    {this._renderTabItem(KANKAN_NORMAL, KANKAN_PRESS, KANKAN_TAB, '美乎看看', 0, this._createChildView(KANKAN_TAB)) }
                    {this._renderTabItem(ME_NORMAL, ME_PRESS, ME_TAB, '我的', 0, this._createChildView(ME_TAB)) }
                </TabNavigator>
            </View>
        )
    }

    componentDidMount() {
        //var path = Service.host + Service.getMessage;
        /*
        var path = Service.host + Service.getMakeup;
        Util.post(path, {
            key: Util.key
        }, function (data) {
            console.log(data);
        });
        */
        /*
        var that = this;

        AsyncStorage.getItem('token', function (err, token) {
            if (!err && token) {
                var path = Service.host + Service.loginByToken;
                Util.post(path, {
                    token: token
                }).then(console.log(data))
            } else {
            }
        });

        var path = Service.host + Service.getMessage;
        var that = this;
        Util.post(path, {
            key: Util.key
        }).then(console.log(data))
        */
    }

    componentWillReceiveProps() {
    }

    shouldComponentUpdate() {
        return true;
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        //tabBarHidden = true;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabNav: {
        height: 60,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: '#E8E8E8'
    },
    tabNavHide: {
        position: 'absolute',
        top: Dimensions.get('window').height,
        height: 0
    },
    selectedTitleStyle: {
        color: '#f65cb7'
    },
    badgeBg: {
        width: 14,
        height: 14,
        marginTop: 6
    },
    badgeText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 10,
        backgroundColor: Platform.OS === 'android' ? null : 'transparent'
    },
    tabIcon: {
        height: 30,
        width: 30,
        resizeMode: 'cover'
    }
});
