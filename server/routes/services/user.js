'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

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
    app.get('/user/destroy', this.destroyUser);
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
  addUser: (() => {
    var ref = _asyncToGenerator(function* (req, res) {
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
        var r_index = yield db_user.createIndex({
          index: {
            fields: ['username']
          }
        });
        console.log(r_index);
        try {
          var r_username = yield db_user.find({
            selector: {
              username: username
            }
          });
          if (r_username['docs'].length > 0) {
            console.log(r_username);
            return res.send({
              status: 0,
              data: '用户名重复'
            });
          } else {
            try {
              var doc = yield db_user.put({
                _id: email,
                username: username,
                email: email,
                password: password,
                time: new Date(),
                token: token
              });
              return res.send({
                status: 1,
                data: {
                  username: username,
                  email: email,
                  token: token
                }
              });
            } catch (err) {
              console.log(err);

              return res.send({
                status: 0,
                data: '这个邮箱已经被注册使用'
              });
            }
          }
        } catch (error) {
          console.log(error);
          return res.send({
            status: 0,
            data: '后台维护'
          });
        }

        /*
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
          if (r['rows'].filter(checkEmail).length) {
            return res.send({
              status: 0,
              data: '邮箱已注册'
            });
          }else if (r['rows'].filter(checkUsername).length) {
            return res.send({
              status: 0,
              data: '用户名已经被注册'
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
        */
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
    });

    return function addUser(_x, _x2) {
      return ref.apply(this, arguments);
    };
  })(),

  //用户登录
  login: (() => {
    var ref = _asyncToGenerator(function* (req, res) {
      var db_user = new PouchDB('shit');
      var email = req.param('email');
      var password = util.md5(req.param('password'));
      var deviceId = req.param('deviceId');
      var token = util.guid() + deviceId;
      try {
        var doc = yield db_user.get(email);
        if (doc['password'] == password) {
          var response = yield db_user.put({
            _id: email,
            _rev: doc._rev,
            email: email,
            password: password,
            username: doc['username'],
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
          console.log(doc);
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
    });

    return function login(_x3, _x4) {
      return ref.apply(this, arguments);
    };
  })(),

  //通过token登录
  loginByToken: (() => {
    var ref = _asyncToGenerator(function* (req, res) {
      var db_user = new PouchDB('shit');
      var token = req.param('token');
      var r_index = yield db_user.createIndex({
        index: {
          fields: ['token']
        }
      });
      console.log(r_index);
      try {
        var r_token = yield db_user.find({
          selector: {
            token: token
          }
        });
        if (r_token['docs'].length > 0) {
          console.log(r_token);
          return res.send({
            status: 1,
            data: r_token['docs'][0]
          });
        } else {
          return res.send({
            status: 0,
            data: 'token失效'
          });
        }
      } catch (error) {
        console.log(error);
        return res.send({
          status: 0,
          data: '后台维护'
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
    });

    return function loginByToken(_x5, _x6) {
      return ref.apply(this, arguments);
    };
  })(),

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