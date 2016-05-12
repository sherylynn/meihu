/**
 * Created by kenny on 16/3/7.
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
    ScrollView,
    TouchableHighlight
} from 'react-native';
import {
    LazyloadScrollView,
    LazyloadListView,
    LazyloadView,
    LazyloadImage
} from 'react-native-lazyload';
import ViewPager from 'react-native-viewpager';
import DiscoverCell  from './discover/discover-cell';
import DiscoverDetail from './discover/discover-detail';
//import DiscoverData from './discover/discover-data';
import DiscoverData from "../test/testData"
import Util from './util.js'
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

let BANNER_IMGS = [
    require('../images/fangshai.jpg'),
    require('../images/fangshai1.jpg'),
    require('../images/fangshai2.jpg'),
    require('../images/ruye.jpg'),
    require('../images/hufu.jpg'),
    require('../images/hufu--1.jpg'),
    require('../images/hufu--2.jpg'),
    require('../images/hufu--3.jpg'),
    require('../images/hufu--4.jpg'),
    require('../images/hufu5.jpg'),
    require('../images/chungao.jpg'),
    require('../images/xilian.gif'),
    require('../images/makeup.jpg'),
    require('../images/clock.jpg'),
    require('../images/low.jpg'),
    require('../images/dou.jpg'),
];

let _renderPagination = function (index, total, context) {
    return (
        <View style={styles.pagination_wrapper}>
            <Text style={styles.count}>
                <Text>{Math.floor(index + 1) }</Text>/{total}
            </Text>
        </View>
    )
};

export default class Discover extends Component {
    constructor() {
        super();
        this.state = {
            pagerSource: new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1 !== p2 })
                .cloneWithPages(BANNER_IMGS)
        };
    }

    _selectDiscover(discover: Object) {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                title: discover.title,
                component: DiscoverDetail,
                passProps: { discover:discover }
            });
        }
    }

    _renderRow(discoverData) {
        return (
            <DiscoverCell onSelect={() => this._selectDiscover(discoverData) } discoverData={discoverData} />
        );
    }

    _renderPage(data) {
        return (<Image source={data} style={styles.page} />)
    }

    render() {
        const dataSource = ds.cloneWithRows(DiscoverData)
        let resultList =
            <LazyloadListView
                name="listExample"
                automaticallyAdjustContentInsets={false}
                dataSource={dataSource}
                renderRow={this._renderRow}
                style={styles.listView}
                />;

        return (
            <ScrollView style={styles.container}>
                <ViewPager
                    style={{ height: 130 }}
                    renderPage={this._renderPage}
                    isLoop={true}
                    autoPlay={true}
                    dataSource={this.state.pagerSource}/>
                {resultList}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        top: Platform.OS === 'android' ? 0 : 20,
        flex: 1,
        backgroundColor: '#EEE'
    },
    pagination_wrapper: {
        position: 'absolute',
        bottom: 20,
        right: 10
    },
    listView: {
        marginTop: 20,
        paddingBottom: 64,
        backgroundColor: '#FFF'
    },
    slide: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    swipeText: {
        color: '#fff',
        fontSize: 18,
        marginTop: 120,
        marginLeft: 10,
        width: null,
        lineHeight: 24,
        fontWeight: 'bold'
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'transparent',
        resizeMode: 'cover'
    },
    user: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    page: {
        width: Util.size.width,
        height: 130
    },
    count: {
        width: 30,
        height: 30,
        borderRadius: 15,
        textAlign: 'center',
        lineHeight: 23,
        backgroundColor: '#FFF',
        opacity: 0.9
    }
});
