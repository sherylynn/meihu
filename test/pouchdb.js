
import React, { Component, }from 'react'
import {AppRegistry, View, Text } from 'react-native';

import PouchDB from 'pouchdb'
import 'pouchdb-asyncstorage-down'

const db = new PouchDB('mydb', { adapter: 'asyncstorage' })

class Example extends Component {
    render() {

        return <View>
            <Text>
                shit
            </Text>
        </View>
    }
}

AppRegistry.registerComponent('meihu', () => Example);