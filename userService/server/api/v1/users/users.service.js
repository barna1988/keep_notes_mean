const dao = require('./users.dao');

const login = (user) => {
    return dao.login(user);
};

const register = (user) => {
    return dao.register(user);
};

module.exports = {
    login,
    register
}
