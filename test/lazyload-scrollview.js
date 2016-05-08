import React, {
    Component, } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Platform,
    Text,
    TextInput,
    View,
    Alert,
    TouchableOpacity,
    Linking,
} from 'react-native';
import {
    LazyloadScrollView,
    LazyloadView,
    LazyloadImage
} from 'react-native-lazyload';
//import list from './testData.js'
import list from './NormalData.js'
//import list from '../views/me/NormalData.js';
//const list = [...list data here]; // many rows

class LazyloadScrollViewExample extends Component {
    constructor(props: {
        filter:?string,
    }) {
    super();
    this.state = {
        keyword: ""
    };
}
render() {
    //const filter=(item)=>
    return (
        <LazyloadScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            name="lazyload-list"
            >
            <Text>{list.length}</Text>
            <Text>输入的词是{this.props.filter}</Text>
            <Text>输入的词是:{this.state.keyword}</Text>
            <TextInput
                placeholder="测试筛选"
                onChangeText={(keyword) => this.setState({ keyword }) }
                value={this.state.keyword}
                style={styles.input}/>
            {(
                list.filter(item => item["功能"] == this.state.keyword)
            ).map((item, i) => <View
                key={i}
                style={styles.view}
                >
                <LazyloadView
                    host="lazyload-list"
                    style={styles.item}
                    >
                    <View style={styles.id}>
                        <Text style={styles.idText}>{item["英文名称"]}</Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.name}>{item["中文名称"]}</Text>
                        <Text><Text style={styles.title}>功能: </Text><Text style={styles.email}>{item["功能"]}</Text></Text>
                        <Text style={styles.ip}><Text style={styles.title}>主要用途: </Text>{item["主要用途"]}</Text>
                    </View>
                </LazyloadView>
            </View>) }
        </LazyloadScrollView>
    );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    content: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    view: {
        height: 70,
        width: 320,
        paddingVertical: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#666'
    },
    input: {
        padding: 0,
        paddingLeft: 10,
        fontSize: 15,
        flex: 1,
        height: 35,
        color: 'black'
    },
    item: {
        width: 320,
        flex: 1,
        flexDirection: 'row'
    },
    id: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    idText: {
        fontSize: 10
    },
    detail: {
        justifyContent: 'space-around',
        flex: 1
    },
    name: {
        textAlign: 'center',
        lineHeight: 15,
        color: '#666',
        marginBottom: 5
    },
    email: {
        fontSize: 10,
        color: 'blue',
        textDecorationColor: 'blue',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid'
    },
    ip: {
        fontSize: 12,
        color: 'grey'
    },
    gender: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    genderText: {
        fontSize: 10
    },
    title: {
        color: '#333',
        fontSize: 12
    },
    male: {
        color: 'skyblue'
    },
    female: {
        color: 'pink'
    }
});

AppRegistry.registerComponent('meihu', () => LazyloadScrollViewExample);