
import React, { AppRegistry, Component, View, Text ,ScrollView } from 'react-native';

import TextField from 'react-native-md-textinput';

class App extends React.Component {
  render() {
    return (
      <ScrollView>
        <TextField label={'姓名'} highlightColor={'#00BCD4'} />
        <TextField label={'邮箱'} highlightColor={'#00BCD4'} />
      </ScrollView>
    );
  }
}
class fuck extends Component{
  render(){
    return(
      <View>
      <Text>fuck</Text></View>
    )
  }
}

AppRegistry.registerComponent('meihu', () => fuck);