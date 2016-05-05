/**
 * Created by kenny on 16/3/7.
 */
'use strict';

import React, {
    Component,
    Platform,
    View,
    ListView,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableHighlight,
    TextInput,
} from 'react-native';

import ViewPager from 'react-native-viewpager';

import NormalData from './me/NormalData';//一般护肤品原料

import DiscoverCell  from './discover/discover-cell';
import DiscoverDetail from './discover/discover-detail';
import DiscoverData from './discover/discover-data';

let BANNER_IMGS = [
    require('../images/job1.jpg'),
    require('../images/job2.jpg'),
    require('../images/job3.jpg'),
    require('../images/job4.jpg')
];
import Resume from './me/resume';
import Util from './util.js'
export default class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSource: new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2})
                .cloneWithRows(this._genRows({})),
            pagerSource: new ViewPager.DataSource({pageHasChanged: (p1, p2)=>p1 !== p2})
                .cloneWithPages(BANNER_IMGS),
            showLogin: {
                flex: 1,
                opacity: 1
            },

        };
    }
    _login() {

    }
    _reg() {

    }
    _getEmail() {

    }
    _getPassword() {

    }
    
    _selectDiscover(discover) {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                title: discover.title,
                component: DiscoverDetail,
                passProps: {discover}
            });
        }
    }

    _renderRow(discoverData) {
        return (
            <DiscoverCell onSelect={() => this._selectDiscover(discoverData)} discoverData={discoverData}/>
        );
    }

    _genRows():Array<string> {
        return DiscoverData;
    }

    _renderPage(data){
        return(<Image source={data} style={styles.page} />)
    }
    _pressButton= title => {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Resume',
                component: Resume,
                params: {
                    title: title,
                },
            });
        }
    }

    render() {
        let UNDERLAY_COLOR = '#E8E8E8';
        let resultList =
            <ListView
                dataSource={this.state.listSource}
                renderRow={this._renderRow}
                style={styles.listView}>
            </ListView>;

        let fuckYou=
        <ScrollView style={styles.container}>
            <ViewPager
                style={{ height: 130 }}
                renderPage={this._renderPage}
                isLoop={true}
                autoPlay={true}
                dataSource={this.state.pagerSource}/>
            {resultList}
        </ScrollView>;
        return (

            <ScrollView style={styles.container}>
                <View style={{ height: 225 }}>
                    <Image source={require('../images/avatar_bg.png') }
                        style={styles.backgroundImage}>
                        <Image source={require('../images/avatar.png') } style={styles.avatar}/>
                        <Text style={styles.name}>关爱每一天</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={this._login}>
                                <Text style={{ color: '#fff' }}>登录</Text>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={this._reg}>
                                <Text style={{ color: '#fff' }}>注册</Text>
                            </TouchableHighlight>
                        </View>
                    </Image>
                </View>
                <TouchableHighlight
                    underlayColor={UNDERLAY_COLOR}
                    onPress={()=>this._pressButton('登录') }>
                    <View>
                        <View style={styles.icon_container}>
                            <Image source={require('../images/icon_user_resume.png') } style={styles.thumb}/>
                            <Text style={styles.icon_text}>简历</Text>
                        </View>
                        <View style={styles.separator}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={UNDERLAY_COLOR}>
                    <View>
                        <View style={styles.icon_container}>
                            <Image source={require('../images/icon_forget_password.png') } style={styles.thumb}/>
                            <View style={{ flex: 2, flexDirection: 'row' }}>
                                <Text style={[{ flex: 1 }, styles.icon_text]}>PLUS</Text>
                                <Text style={[{ color: '#999', textAlign: 'right', marginTop: 8 }]}>已开启</Text>
                            </View>
                        </View>
                        <View style={styles.separator}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={this._pressButton.bind(this, '我的收藏') }>
                    <View>
                        <View style={{ padding: 10, flexDirection: 'row' }}>
                            <Image style={styles.thumb} source={require('../images/icon_user_collect.png') }/>
                            <Text style={styles.icon_text}>收藏</Text>
                        </View>
                        <View style={styles.separator}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={this._pressButton.bind(this, '意见反馈') }>
                    <View>
                        <View style={styles.icon_container}>
                            <Image style={styles.thumb} source={require('../images/icon_user_feedback.png') }/>
                            <Text style={styles.icon_text}>反馈</Text>
                        </View>
                        <View style={styles.separator}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={UNDERLAY_COLOR} onPress={this._pressButton.bind(this, '应用设置') }>
                    <View>
                        <View style={styles.icon_container}>
                            <Image style={styles.thumb} source={require('../images/icon_user_setting.png') }/>
                            <Text style={styles.icon_text}>设置</Text>
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
