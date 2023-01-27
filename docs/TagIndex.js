const loginUser = require('./utilisateurs/login-user');
const registerUser = require('./utilisateurs/register-user');
const get_user = require('./utilisateurs/get-user');

module.exports = {
  paths:{
    '/auth/token':
      {
        ...loginUser
      },
    '/auth/register':
      {
        ...registerUser
      }, 
    '/user':
      {
        ...get_user
      },
  } 
}