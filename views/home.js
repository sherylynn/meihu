/**
 * Created by kenny on 16/3/5.
 */
'use strict';

import React, {
    Component, } from 'react';
import {
    Platform,
    StyleSheet,
    ListView,
    Image,
    Text,
    TextInput,
    View,
    TouchableHighlight
} from 'react-native';
import {
    LazyloadScrollView,
    LazyloadListView,
    LazyloadView,
    LazyloadImage
} from 'react-native-lazyload';

import JobCell from './home/job-cell';
import JobDetail from './home/job-detail';
import JobData from './me/NormalData';
import Top15 from './me/2015TOP5'
const Data = {
    "成分": JobData,
    "产品": Top15,
    "功能": JobData
}
//从服务器获取化妆品信息
import Util from './util';
import Service from './service.js';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const activeButtonStyle = {
    backgroundColor: '#ddd'
};
class Button extends Component {
    constructor() {
        super();
        this.state = {
            active: false,
        };
    }
    _onHighlight = () => {
        this.setState({ active: true });
    }

    _onUnhighlight = () => {
        this.setState({ active: false });
    }

    render() {
        var colorStyle = {
            color: this.state.active ? '#fff' : '#000',
        };
        return (
            <TouchableHighlight
                onHideUnderlay={this._onUnhighlight}
                onPress={this.props.onPress}
                onShowUnderlay={this._onHighlight}
                style={[styles.button, this.props.style]}
                underlayColor="#a9d9d4">
                <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
            </TouchableHighlight>
        );
    }
}
export default class Home extends Component {
    //构造函数可以没有参数
    constructor() {
        super();
        this.state = {
            keyword: "",
            keywordType: "成分",
            number: 0
            //dataSource: ds.cloneWithRows(JobData),
        };
    }

    _selectJob(job: Object) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'JobDetail',
                component: JobDetail,
                params: { job: job }
            });
        }
    }

    _renderRow = (jobData) => {
        return (<JobCell onSelect={() => this._selectJob(jobData) } jobData={jobData} />);
    }
    _setKeywordType = (keywordType) => {
        this.setState({
            keywordType: keywordType,
        })
    }

    _listHeader = (index) => {
        return (
            <View style={styles.headerBody}>
                <Image style={{ width: 52, height: 50 }} source={require('../images/icon_find_ok.png') }/>
                <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 18 }}>可以搜索到<Text style={{ color: '#11A984' }}>{this.state.number}</Text>个相关信息</Text>
                    <Text style={{ marginTop: 15, fontSize: 13, color: '#999' }}>来丰富一下关于美丽的知识吧~</Text>
                </View>
            </View>
        )
    };

    render() {
        const filterText = this.state.keyword || '';
        const filterRegex = new RegExp(String(filterText), 'i');
        let filter, filterResult;
        switch (this.state.keywordType) {
            case "成分":
                filter = (example) => filterRegex.test(example["中文名称"]);
                this.state.number = JobData.filter(filter).length;
                filterResult = JobData.filter(filter);
                break;
            case "产品":
                filter = (example) => filterRegex.test(example["产品名称"]);
                this.state.number = Top15.filter(filter).length;
                filterResult = Top15.filter(filter);
                break;
            case "功能":
                filter = (example) => filterRegex.test(example["功能"]);
                this.state.number = JobData.filter(filter).length;
                filterResult = JobData.filter(filter);
                break;
            default:
                break;
        }
        const dataSource = ds.cloneWithRows(filterResult)



        let resultList = <LazyloadListView
            ref={ ref => { global._scrollView = ref } }
            name="listExample"
            automaticallyAdjustContentInsets={false}
            dataSource={dataSource}
            initialListSize={11}
            renderRow={this._renderRow}
            renderHeader={this._listHeader}/>;
        //onFocus={() => { global._scrollView && global._scrollView.scrollTo({ y: 0 }); } } lazyload中没有这个方法
        return (
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <Text style={{ color: '#FFF', fontSize: 20 }}>美乎</Text>
                    <View style={styles.searchInput}>
                        <Image source={require('../images/icon_search.png') } style={{ width: 25, height: 25, marginLeft: 10 }}/>
                        <TextInput
                            style={styles.input}
                            onChangeText={(keyword) => this.setState({ keyword }) }
                            placeholder="输入化妆品信息"
                            placeholderTextColor='#FFF'
                            value={this.state.keyword}
                            underlineColorAndroid='rgba(0,0,0,0)' />
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowTitle}>按以下类型搜索</Text>
                    <Button onPress={() => this.setState({ keywordType: "成分" }) } style={this.state.keywordType === '成分' ? activeButtonStyle : {}}>
                        成分
                    </Button>
                    <Button onPress={this._setKeywordType.bind(this, '产品') } style={this.state.keywordType === '产品' ? activeButtonStyle : {}}>
                        产品
                    </Button>
                    <Button onPress={this._setKeywordType.bind(this, '功能') } style={this.state.keywordType === '功能' ? activeButtonStyle : {}}>
                        功能
                    </Button>
                </View>
                {resultList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#FF679A',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBody: {
        padding: 20,
        backgroundColor: '#FFF',
        marginBottom: 15,
        flexDirection: 'row'
    },
    searchInput: {
        borderRadius: 25,
        backgroundColor: '#FF84BF',
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    input: {
        padding: 0,
        paddingLeft: 10,
        fontSize: 15,
        flex: 1,
        height: 35,
        color: '#FFF'
    },
    container: {
        top: Platform.OS === 'android' ? 0 : 20,
        flex: 1,
        backgroundColor: '#EEE',
        paddingBottom: 10
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    rowTitle: {
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
});
