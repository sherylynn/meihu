/**
 * Created by kenny on 16/3/5.
 */
'use strict';

import React,{
    Component,
    Platform,
    StyleSheet,
    ListView,
    Image,
    Text,
    TextInput,
    View
} from 'react-native';

import JobCell from './home/job-cell';
import JobDetail from './home/job-detail';
import JobData from './home/job-data';

//从服务器获取化妆品信息
import Util from './util';
import Service from './service.js';

class SearchBar extends Component {
    render() {
        return (
            <View style={styles.searchBar}>
                <Text style={{color:'#FFF', fontSize:20}}>美乎</Text>
                <View style={styles.flowRight}>
                    <Image source={require('../images/icon_search.png')} style={{width:15,height:15,marginRight:8}}/>
                    <TextInput style={{}} placeholder='搜索化妆品中的成分' />
                </View>
            </View>
        );
    }
}

let _listHeader = function (index, total, context) {
    return (
        <View style={styles.headerBody}>
            <Image style={{width:52,height:50}} source={require('../images/icon_find_ok.png')}/>
            <View style={{paddingLeft:20}}>
                <Text style={{fontSize:18}}>可<Text style={{color:'#11A984'}}>直接沟通</Text>的职位推荐</Text>
                <Text style={{marginTop:15,fontSize:13,color:'#999'}}>来和老板直接聊offer吧</Text>
            </View>
        </View>
    )
};

export default class Home extends Component {
    //构造函数可以没有参数
    constructor() {
        super();
        this.state = {
            listSource: new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2})
                .cloneWithRows(this._genRows({}))
        };
        // 必须绑定，否则onPress报错
        this._renderRow = this._renderRow.bind(this);
    }

    _selectJob(job:Object) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'JobDetail',
                component: JobDetail,
                params: {job: job}
            });
        }
    }

    _renderRow(jobData) {
        return (<JobCell onSelect={() => this._selectJob(jobData)} jobData={jobData}/>);
    }

    _genRows():Array<string> {
        return JobData;
    }

    render() {
        let resultList = <ListView
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.listSource}
            renderRow={this._renderRow}
            renderHeader={_listHeader}/>;

        return (
            <View style={styles.container}>
                <SearchBar />
                {resultList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#f06292',
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
    flowRight: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch'
    },
    searchInput: {
        borderRadius: 15,
        backgroundColor: '#ec407a',
        paddingTop: 7,
        paddingBottom: 7,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    container: {
        top: Platform.OS === 'android' ? 0 : 20,
        flex: 1,
        backgroundColor: '#EEE',
        paddingBottom: 10
    }
});