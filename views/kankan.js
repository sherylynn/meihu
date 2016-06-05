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
    Alert,
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
import DiscoverData from "../test/testData";
import Util from './util.js';
import Service from './service.js';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

let BANNER_IMGS = [
  Service.host+'/kankan/'+'h001.jpg',
  Service.host+'/kankan/'+'h002.jpg',
  Service.host+'/kankan/'+'h003.jpg',
  Service.host+'/kankan/'+'h004.jpg',
  Service.host+'/kankan/'+'h005.jpg',
  Service.host+'/kankan/'+'h006.jpg',
];
/*
var BANNER_IMGS = [
  'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
  'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
  'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
  'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
];
*/
let _renderPagination = function (index, total, context) {
    return (
        <View style={styles.pagination_wrapper}>
            <Text style={styles.count}>
                <Text>{Math.floor(index + 1) }</Text>/{total}
            </Text>
        </View>
    )
};

export default class Kankan extends Component {
    constructor() {
        super();
        this.state = {
            pagerSource: new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1 !== p2 })
                .cloneWithPages(BANNER_IMGS)
        };
    }
    /*
    async componentWillMount() {
        try {
            let path = Service.host + Service.getkankanList;
            let data = await Util.post_promise(path, {});
            if (data.status) {
                console.log(data.data)
                //console.log(data.data.img)
                
                function img_source(srcList){
                    return Service.host +srcList.img;
                }
                Alert.alert(data.data.map(img_source));
                
                
                this.setState({
                    pagerSource: new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1 !== p2 })
                .cloneWithPages(data.data.map(img_source))
                });
                
            } else {
                Alert.alert('出错啦','什么鬼')
            }
        } catch (err) {
            console.log(err);
            Alert.alert('出错啦','服务器出小差啦')
        }
    }
    */
    _selectDiscover(discover: Object) {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                title: discover.title,
                component: DiscoverDetail,
                passProps: { discover: discover }
            });
        }
    }

    _renderRow(discoverData) {
        return (
            <DiscoverCell onSelect={() => this._selectDiscover(discoverData) } discoverData={discoverData} />
        );
    }
    _renderPage(
        data: Object,
        pageID: number | string, ) {
        return (
            <Image
                source={{ uri: data }}
                style={styles.page} />
        );
    }
    /*
    _renderPage(data) {
        return (<Image source={data} style={styles.page} />)
    }
    */

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
