/**
 * Created by kenny on 16/3/8.
 */
'use strict';
import React,{
    Component,
} from 'react';
import {
    Platform,
    StyleSheet,
    Navigator,
    TouchableOpacity,
    Image,
    Text,
    WebView,
    BackAndroid,
    View
} from 'react-native';

export default class DiscoverDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { discover: null };
    }
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', () => this._pressButton());
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', () => this._pressButton());
        }
    }
    _pressButton() {
        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        if (routers.length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    };
    render() {
        let {discover} = this.props;
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{ padding: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this._pressButton() }>
                        <Image source={require('../../images/icon_back.png') } style={{ width: 30, height: 30 }}/>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 17, flex: 1, textAlign: 'center', marginRight: 30 }}>{discover.title}</Text>
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        marginBottom: 80
    },
    largeImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        backgroundColor: Platform.OS === 'android' ? null : 'transparent',
        resizeMode: 'contain',
        marginTop: 25,
        marginBottom: 35
    }
});