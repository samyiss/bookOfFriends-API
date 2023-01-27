const loginUser = require('./utilisateurs/login-user');
const registerUser = require('./utilisateurs/register-user');

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
  } 
}