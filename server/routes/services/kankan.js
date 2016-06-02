var fs = require('fs');
var util = require('./../util');
var showdown = require('showdown');
var kankan = {
  init: function(app) {
    app.get('/kankan/get/:md', this.getkankan);
    app.get('/kankan/getList', this.getkankanList);
    app.post('/kankan/add', this.addkankan);
  },

  //获取公告消息
  getkankan: function(req, res) {
    let filterText = '.md'
    let filterRegex = new RegExp(String(filterText), 'i');
    if (filterRegex.test(req.params.md)) {
      res.render('./kankan/' + req.params.md, {
        layout: false
      });
    }
    console.log(req.params.md);
  },
  getkankanList: function(req, res) {

  },
  //增加公告消息
  addkankan: function(req, res) {
    var token = req.param('token');
    var message = req.param('message');
    if (!token || !message) {
      return res.send({
        status: 0,
        err: 'token或者message不能为空'
      });
    }
    //根据token查询
    fs.readFile(USER_PATH, function(err, data) {
      if (err) {
        return res.send({
          status: 0,
          err: err
        });
      }

      try {
        var obj = JSON.parse(data);
        for (var i in obj) {
          if (obj[i].token === token) {
            //增加信息
            var msgObj = JSON.parse(fs.readFileSync(MESSAGE_PATH));
            msgObj.push({
              messageid: util.guid(),
              userid: obj[i].userid,
              username: obj[i].username,
              time: new Date().getFullYear() + '-' + (parseInt(new Date().getMonth()) + 1) + '-' + new Date().getDate(),
              message: message
            });

            fs.writeFileSync(MESSAGE_PATH, JSON.stringify(msgObj));
            return res.send({
              status: 1
            });
          }
        }

        return res.send({
          status: 0,
          err: 'token认证失败'
        });

      } catch (e) {
        return res.send({
          status: 0,
          err: e
        });
      }
    });

  }

};

module.exports = kankan;