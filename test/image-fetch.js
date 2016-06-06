
import React, {
    Component,
} from 'react'
import {
    AppRegistry,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';import Util from './../views/util.js';
import Service from './../views/service.js';


class Example extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            src: 'http://192.168.0.249:3000/kankan/h001.jpg'
        }
    }
    async componentWillMount() {
        try {
            let path = Service.host + Service.getkankanList;
            let data = await Util.get_json(path);
            if (data.status) {
                console.log(data.data)
                function img_source(srcList) {
                    return Service.host + srcList.img;
                }
                console.log(data.data.map(img_source));
                this.setState({
                    src: data.data.map(img_source)[9]
                })
            } else {
                Alert.alert('出错啦', '什么鬼')
            }
        } catch (err) {
            console.log(err);
            Alert.alert('出错啦', '服务器出小差啦')
        }
    }
    render() {

        return <View style={{
            flex: 1,
        }}>
            <Text style={{
                marginTop: 15,
            }}>

            </Text>

            <Image style={styles.thumb}
                source={{ uri: this.state.src }}
                />
        </View>
    }
}
const styles=StyleSheet.create({
    thumb: {
        width: 30,
        height: 30
    },
})
AppRegistry.registerComponent('meihu', () => Example);