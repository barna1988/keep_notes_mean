const dao = require('./users.dao');

const login = (user) => {
    return dao.login(user);
};

const register = (user) => {
    return dao.register(user);
};

const getAllUsers = () => {
    return dao.getAllUsers();
}

module.exports = {
    login,
    register,
    getAllUsers
}