const UserModel = require('./users.entity');
const uuidv1 = require('uuid/v1');
const authServices = require('../auth');
const appConfig = require('../../../config');

const log = require('../../../logging');

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            UserModel.find({}, (error, document) => {
                if (error) {
                    log.error(error);
                    reject({ message: 'Failed to register due to unexpected error', status: 500 });
                } else {
                    let userIDs = [];

                    if (Array.isArray(document)) {
                        userIDs = document.map(user => user.username);
                    } else {
                        userIDs.push(document.username);
                    }

                    if(userIDs.length === 0) {
                        reject({ message: 'No registered users found', status: 403 });
                    } else {
                        resolve({ message: 'UserIDs registered found', status: 200, userInfo: userIDs });
                    }
                    
                }
            });
        } catch (error) {
            log.error(err);
            reject({
                message: 'Failed to register due to unexpected error',
                status: 500
            });
        }
    });
}

const register = (user) => {

    log.info('register user: ' + JSON.stringify(user));
    return new Promise((resolve, reject) => {

        try {
            if (!user.username || !user.password || !user.email) {
                reject({ message: 'Failed to register due to incorrect data', status: 403 });
            } else {

                let userModel = new UserModel({
                    userId: uuidv1(),
                    username: user.username,
                    password: user.password,
                    email: user.email
                });

                let query = {
                    username: user.username
                };

                UserModel.findOne(query, (error, document) => {
                    if (error) {
                        log.error(error);
                        reject({ message: 'Failed to register due to unexpected error', status: 500 });
                    }
                    if (document) {
                        reject({ message: 'username is already exist', status: 403 });
                    }
                });

                // Saving user in database
                userModel.save(function (error, document) {
                    if (error) {
                        log.error(error);
                        reject({ message: 'Failed to register due to unexpected error', status: 500 });
                    } else {
                        const userInfo = {
                            userName: document.username,
                            userId: document.userId
                        };
                        log.info('registration done');
                        resolve({ message: 'Successfully registered', status: 201, userInfo: userInfo });
                    }
                });
            }

        } catch (error) {
            log.error(err);
            reject({
                message: 'Failed to register due to unexpected error',
                status: 500
            });
        }

    });
}

const login = (user) => {
    log.info('login user: ' + JSON.stringify(user));
    return new Promise((resolve, reject) => {

        try {
            let query = {
                username: user.username
            };

            UserModel.findOne(query, (error, doc) => {

                if (error) {
                    reject({
                        message: 'Login Failed.',
                        status: 500
                    });
                } else if (!doc) {
                    reject({
                        message: 'You are not registered user',
                        status: 403
                    });
                } else if (doc.password !== user.password) {
                    reject({
                        message: 'Password is incorrect',
                        status: 403
                    });
                } else {

                    let payload = {
                        userName: doc.username,
                        userId: doc.userId
                    }

                    log.info('login with payload', payload);

                    authServices.signToken(payload, appConfig.authConfig.secret, appConfig.authConfig.expiry, (err, token) => {

                        if (err) {
                            log.info('err', err);
                            reject({
                                message: 'Passwords is incorrect',
                                status: 403
                            });
                        } else {
                            resolve({
                                token: token,
                                user: payload,
                                status: 200
                            });
                        }
                    });
                }
            });
        } catch (error) {
            log.error(err);
            reject({
                message: 'Failed to register due to unexpected error',
                status: 500
            });
        }
    });
}

module.exports = {
    login,
    register,
    getAllUsers
}