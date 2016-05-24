var Service = {
  host:'http://mh.kenx.cn:3000',
  login: '/user/login',
  loginByToken: '/user/login/token',
  getUser: '/user/get',
  createUser: '/user/create',
  getMessage: '/message/get',
  addMessage: '/message/add',
  getMakeup: '/makeup/get',
  addMakeup: '/makeup/add',
  updatePassword: '/user/password/update',
  deleteUser: '/user/delete',
  db:'/db/users'
};

module.exports = Service;
