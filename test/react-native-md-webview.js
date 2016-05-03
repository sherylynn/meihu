import React, { AppRegistry, Component, View, Text } from 'react-native';
import MDWebView from 'react-native-md-webview';

class Example extends Component {
    render() {
        var markdown = '#hi';
        return <MDWebView css={css} style={{ flex: 1 }}>
        {markdown}
      </MDWebView>
    }
}
const css = `
  img {
    width: 100%,
  }
`;

AppRegistry.registerComponent('meihu', () => Example);