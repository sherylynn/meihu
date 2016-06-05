var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  PixelRatio
} = React;

var Util = {

  //单位像素
  pixel: 1 / PixelRatio.get(),
  //屏幕尺寸
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  //post请求
  post: function(url, data, callback) {
    //console.log(data);
    //console.log(JSON.stringify(data));
    var fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
      .then((response) => response.text())
      .then((responseText) => {
        callback(JSON.parse(responseText));
      });
  },
  post_promise: function(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then((response) => response.text())
        .then((responseText) => {
          resolve(JSON.parse(responseText));
        })
        .catch((error) => {
          reject(error);
        });
    })
  },
  get_json: function(reqUrl) {
    return new Promise((resolve, reject) => {
      fetch(reqUrl)
        .then((response) => response.json())
        .then((responseData) => {
          //console.log(responseData);
          resolve(responseData);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    })
  },
  //Key
  key: 'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE'

};

module.exports = Util;