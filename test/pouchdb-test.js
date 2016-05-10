
import React, { Component, }from 'react'
import {AppRegistry, View, Text, TextInput, TouchableOpacity, } from 'react-native';

import PouchDB from 'pouchdb'
import 'pouchdb-asyncstorage-down'

const db = new PouchDB('mydb', { adapter: 'asyncstorage' })

class Example extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            nub: 0,
            doc: { title: '测试', value: 1 },
        }
    }
    shit = () => {
        this.setState({ nub: 11 })
    }
    save = (doc) => {
        db.put(
            doc
        )
    };
    get = () => {
        db.allDocs({
            include_docs: true,
            attachments: true
        }).then(
            (result) => this.setState({ nub: result["total_rows"] })
            )
    };
    render() {

        return <View style={{
            flex: 1,
        }}>
            <Text style={{
                marginTop: 15,
            }}>
                shit
            </Text>
            <TouchableOpacity onPress={() => this.get() }>
                <View>
                    <Text>{this.state.nub}</Text>
                </View>
            </TouchableOpacity>
            <TextInput
                style={{ marginTop: 15, height: 35, fontSize: 15, }}
                onChangeText={(keyword) => { this.save({ _id: new Date().toISOString(), title: keyword, }) } }
                placeholder="fuck" />
        </View>
    }
}

AppRegistry.registerComponent('meihu', () => Example);