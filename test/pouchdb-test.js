
import React, { Component, }from 'react'
import {AppRegistry, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import PouchDB from 'pouchdb'
import 'pouchdb-asyncstorage-down'
//import './pouchdb.authentication.min.js'//死活注册不了这个事件 这个方法是浏览器的,强上不现实
//PouchDB.plugin(require('./pouchdb.authentication.min.js'));//这种方法引入也是不行的
//import Auth from 'pouchdb-auth'//依赖太多了,根本不可能实现
//PouchDB.plugin(Auth)
//const db = new PouchDB('mydb', { adapter: 'asyncstorage' })
const db = new PouchDB('http://localhost:3000/db/shit');
//db.sync(remotedb);
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
    fuck = () => {
        fuckdb.signup('batman', 'brucewayne', function (err, response) {
            if (err) {
                if (err.name === 'conflict') {
                    // "batman" already exists, choose another username
                } else if (err.name === 'forbidden') {
                    // invalid username
                } else {
                    // HTTP error, cosmic rays, etc.
                }
            } else {
                Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                    { text: '确定', onPress: () => {} },
                ]);
            }
        });
    }
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
            <TouchableOpacity onPress={() => this.fuck() }>
                <View>
                    <Text>{'注册'}</Text>
                </View>
            </TouchableOpacity>
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