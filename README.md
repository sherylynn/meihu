# 美乎
### 安装
```
npm install
```
### 运行 编译ios时先把server排除在外
```
react-native run-android

or

react-native run-ios
```

### TODO：
封闭分离数据库
可以使用poucdb-server或express-pouchdb，
利用pouchdb-auth这个插件还可以和pouchdb-authXX结合开发web 代码在示例里，
二期再将原来验证和加密部分改进到自带的auth，现在利用couchdb的不跨域访问（pouchdb-server也不跨域）
来分离用户数据库和项目数据，现在问题是express-pouchdb非根目录下不能使用_utils pouchdb-server 需要手动运行
但是couchdb不支持pouchdb-find 为难
不能使用pouchdb-auth修改API,因为pouchdb虽然支持nodejs环境但是不支持getUser等api所以没有metadata可以获取，存储的时候也不能存入metadata
promise 提供api 分辨率布局

### 依赖项：
```
"dependencies": {
    "react-native": "^0.21.0",
    "react-native-tab-navigator": "^0.2.17",
    "react-native-viewpager": "^0.2.1"
}
```

参考项目:https://github.com/Kennytian/LagouApp