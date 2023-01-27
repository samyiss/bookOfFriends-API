const basicInfo = require('./basicInfo');
const servers = require('./servers');
const tags = require('./tags');
const components = require('./components');
const utilisateurs = require('./TagIndex');

module.exports = {
    ...basicInfo,
    ...servers,
    ...tags,
    ...components,
    ...utilisateurs
};


