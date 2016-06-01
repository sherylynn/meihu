var fs = require('fs');
var util = require('./../util');
var USER_PATH = './database/user.json';
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
//尝试不在开始声明以便删除数据库
//var db_user = new PouchDB('shit');
var User = {

  init: function (app) {
    console.log('已经加载');
    app.get('/user/destroy', this.destroyUser)
    app.post('/user/get', this.getUser);
    app.post('/user/create', this.addUser);
    app.post('/user/login', this.login);
    app.post('/user/login/token', this.loginByToken);
    app.post('/user/password/update', this.updatePassword);
    app.post('/user/delete', this.deleteUser);
  },

  destroyUser: function (req, res) {
    var db_user = new PouchDB('shit');
    db_user.destroy().then(function (response) {
      return res.send({
        status: 0,
        data: '数据库已经重建'
      });
    }).catch(function (err) {
      console.log(err);
    });
  },
  //获取用户信息
  getUser: function (req, res) {
    var key = req.param('key');
    if (key !== util.getKey()) {
      return res.send({
        status: 0,
        data: '使用了没有鉴权的key'
      });
    }
    fs.readFile(USER_PATH, function (err, data) {
      if (!err) {
        try {
          var obj = JSON.parse(data);
          var newObj = [];
          for (var i in obj) {
            if (obj[i].partment === partment) {
              delete obj[i]['password'];
              newObj.push(obj[i]);
            }
          }
          return res.send({
            status: 1,
            data: newObj
          });
        } catch (e) {
          return res.send({
            status: 0,
            err: e
          });
        }
      }

      return res.send({
        status: 0,
        err: err
      });
    });
  },

  //添加用户
  addUser: function (req, res) {
    var db_user = new PouchDB('shit');
    var username = req.param('username');
    var password = util.md5(req.param('password'));
    var re_password = util.md5(req.param('re_password'));
    var deviceId = req.param('deviceId');
    var email = req.param('email');
    var token = util.guid() + deviceId;
    if (!username || !password || !re_password || !email) {
      return res.send({
        status: 0,
        data: '信息填写不全'
      });
    } else if (password != re_password) {
      return res.send({
        status: 0,
        data: '两次密码不一致'
      });
    } else {
      db_user.allDocs({
        include_docs: true,
      }).then(function (r) {
        //console.log(r['rows'])
        var checkUsername = function (doc) {
          return doc['doc']['username'] == username
        }
        var checkEmail = function (doc) {
          return doc['doc']['email'] == email
        }
        if (r['rows'].filter(checkUsername).length) {
          return res.send({
            status: 0,
            data: '用户名已经被注册'
          });
        } else if (r['rows'].filter(checkEmail).length) {
          return res.send({
            status: 0,
            data: '邮箱已注册'
          });
        } else {
          return db_user.put({
            _id: email,
            username: username,
            email: email,
            password: password,
            time: new Date(),
            token: token
          }).then(function (r) {
            //console.log(r)
            console.log("注册成功")
            return res.send({
              status: 1,
              data: {
                username: username,
                email: email,
                token: token
              }
            });
          }).catch(function (err) {
            console.log(err)
            return res.send({
              status: 0,
              err: e
            });
          })
        }

      })
    }
    /*
        db_user.createIndex({
          index: {
            fields: ['username','email']
          }
        }).then(function(r){
          console.log(r);
          return db_user.find({
            selector:{
              $and:[
                {username:username},
                {email:email}
              ]
            }
          })
        }).then(function (r) {
          return res.send({
              status: 0,
              data: '邮箱或用户名已经被使用'
            });
        }).catch(function (err) {
          if(err){
            console.log(err);
            return db_user.post({
              username: username,
              email: email,
              password: password,
              time: new Date(),
              token: ''
            })
          }
        })
    */
    /*
        db_user.createIndex({
          index: {
            fields: ['username']
          }
        }).then(function (result) {
          // yo, a result
          console.log(result)
          return db_user.find({
            selector: {
              username: username
            }
          }).then(function (result) {
            console.log(result['docs'][0]['username']);
            return res.send({
              status: 0,
              data: '用户名已经被注册'
            });
          }).catch(function (err) {
            console.log(err)
            return db_user.find({
              selector: {
                email: email
              }
            })
          }).then(function (result) {
            console.log(result)
            //console.log(result['docs'][0]['email']);
            return res.send({
              status: 0,
              data: '已经注册过的邮箱'
            });
          }).catch(function (err) {
            console.log(err)
            return db_user.post({
              username: username,
              email: email,
              password: password,
              time: new Date(),
              token: ''
            })
          }).then(function (result) {
            console.log('ok')
            return res.send({
              status: 1,
              data: {
                username: username
              }
            });
          }).catch(function (err) {
            console.log(err)
            return res.send({
              status: 0,
              err: e
            });
          })
        }).catch(function (err) {
          console.log(err)
        })
        
    */
  },

  //用户登录
  login: async function (req, res) {
    var db_user = new PouchDB('shit');
    var email = req.param('email');
    var password = util.md5(req.param('password'));
    var deviceId = req.param('deviceId');
    var token = util.guid() + deviceId;
    try {
      var doc = await db_user.get(email);
      if (doc['password'] == password) {
        var response = await db_user.put({
          _id: email,
          _rev: doc._rev,
          'token': token
        });
        return res.send({
          status: 1,
          data: {
            email: email,
            username: doc['username'],
            token: token
          }
        });
      } else {
        console.log(password);
        console.log(doc['password']);
        return res.send({
          status: 0,
          data: '密码错误'
        });
      }

    } catch (err) {
      console.log(err);
      return res.send({
        status: 0,
        data: '请检查是否是注册过的邮箱'
      });
    }
    /*
    var r_index = await db_user.createIndex({
      index: {
        fields: ['email', 'password']
      }
    });
    console.log(r_index);
    try {
      var r_email = await db_user.find({
        selector: {
          email: email
        }
      })
      if (r_email['docs'][0]['password'] == password) {
        try {
          var r_all = await db_user.put({
            _id: r_email['docs'][0]['_id'],
            _rew: r_email['docs'][0]['_rev'],
            'token': token
          })
          return res.send({
            status: 1,
            data: r_email['docs'][0].s
          });
        } catch (error) {
          console.log(error);
          return res.send({
            status: 0,
            data: '出故障了'
          });
        }
      } else {
        return res.send({
          status: 0,
          data: '密码错误'
        });
      }
    } catch (error) {
      console.log(error)
      return res.send({
        status: 0,
        data: '请检查是否是注册过的邮箱'
      });
    }
    */
    /*
    db_user.createIndex({
      index: {
        fields: ['email', 'password']
      }
    }).then(function (r) {
      console.log(r);
      return db_user.find({
        selector: {
          $and: [
            { email: email },
            { password: password }
          ]
        }
      })
    }).then(function (r) {
      return db_user.put({
        _id: r['docs'][0]['_id'],
        _rew: r['docs'][0]['_rev'],
        'token': token
      })
    }).then(function () {
      return res.send({
        status: 1,
        data: r['docs'][0].s
      });
    }).catch(function (err) {
      if (err) {
        console.log(err);
        return res.send({
          status: 0,
          data: '邮箱或者密码错误'
        });
      }
    })
    */
  },

  //通过token登录
  loginByToken: async function (req, res) {
    var db_user = new PouchDB('shit');
    var token = req.param('token');
    var r_index = await db_user.createIndex({
      index: {
        fields: ['token']
      }
    });
    console.log(r_index);
    try {
      var r_email = await db_user.find({
        selector: {
          token: token
        }
      })
      return res.send({
        status: 1,
        data: r_email['docs'][0].s
      });
    } catch (error) {
      console.log(error)
      return res.send({
        status: 0,
        data: 'token失效'
      });
    }
    /*
    db_user.createIndex({
      index: {
        fields: ['token']
      }
    }).then(function (r) {
      console.log(r);
      return db_user.find({
        selector:
        { token: token }
      })
    }).then(function () {
      return res.send({
        status: 1,
        data: r['docs'][0].s
      });
    }).catch(function (err) {
      if (err) {
        console.log(err);
        return res.send({
          status: 0,
          info: 'token失效'
        });
      }
    })
    */

  },

  //用户修改密码
  updatePassword: function (req, res) {
    var token = req.param('token');
    var oldPassword = util.md5(req.param('oldPassword'));
    var password = util.md5(req.param('password'));

    var content = JSON.parse(fs.readFileSync(USER_PATH));
    for (var i in content) {
      if (token === content[i].token && oldPassword === content[i].password) {
        content[i].password = password;
        //写入到文件中
        fs.writeFileSync(USER_PATH, JSON.stringify(content));
        return res.send({
          status: 1,
          data: '更新成功'
        });
      }
    }

    return res.send({
      status: 0,
      data: '更新失败，没有找到该用户或者初始密码错误'
    });
  },

  //删除用户
  deleteUser: function (req, res) {
    var token = req.param('token');
    var email = req.param('email');

    var content = JSON.parse(fs.readFileSync(USER_PATH));
    for (var i in content) {
      if (token === content[i].token) {
        //遍历查找需要删除的用户
        for (var j in content) {
          if (content[j].email === email) {
            content.splice(j, 1);
            //写入到文件中
            fs.writeFileSync(USER_PATH, JSON.stringify(content));
            return res.send({
              status: 1,
              info: content,
              data: '删除成功'
            });
          }
        }

      }
    }
    return res.send({
      status: 0,
      err: '删除失败，没有找到该用户或者用户鉴权错误'
    });
  }
};


module.exports = User;