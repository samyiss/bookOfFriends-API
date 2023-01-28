const loginUser = require('./utilisateurs/login-user');
const registerUser = require('./utilisateurs/register-user');
const get_user = require('./utilisateurs/get-user');
const updatePassword = require('./Utilisateurs/update-mdp');
const resetPassword = require('./utilisateurs/reset-mdp');
const delete_user = require('./utilisateurs/delete-user');
const updateUser = require('./utilisateurs/update-user');
const updateEmail = require('./utilisateurs/update-email');

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
        ...get_user,
        ...delete_user,
        ...updateUser
      },
    '/user/update-password':
      {
        ...updatePassword
      },
    '/user/password-oublie':
      {
        ...resetPassword
      },
    '/user/update-email':
      {
        ...updateEmail
      }
  } 
}