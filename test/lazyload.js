import React, {
    Component, } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Platform,
    Text,
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

import list from './NormalData.js';
//const list = [...list data here]; // many rows

class LazyloadScrollViewExample extends Component {
    render() {
        return (
            <LazyloadScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                name="lazyload-list"
                >
                {list.map((item, i) => <View
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
                            <Text><Text style={styles.title}>功能: </Text><Text style={styles.email}>{iitem["功能"]}</Text></Text>
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