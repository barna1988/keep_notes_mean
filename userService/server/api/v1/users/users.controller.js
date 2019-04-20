const svc = require('./users.service');

const login = (user) => {
    return svc.login(user);
};

const register = (user) => {
    return svc.register(user);
};

module.exports = {
    login,
    register
}
