const UserModel = require('./users.entity');
const uuidv1 = require('uuid/v1');
const auth = require('../auth');
const appConfig = require('../../../config');

const log = require('../../../logging');

const register = (user) => {

    log.info('register user: ' + JSON.stringify(user));
    return new Promise((resolve, reject) => {

        try {

            let userModel = new UserModel({
                userId: uuidv1(),
                username: user.username,
                password: user.password
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
                        message: 'Passwords is incorrect',
                        status: 403
                    });
                } else {

                    let payload = {
                        userName: doc.username,
                        userId: doc.userId
                    }

                    log.info('login with payload', payload);

                    auth.signToken(payload, appConfig.authConfig.secret, appConfig.authConfig.expiry, (err, token) => {
                        log.info('err', err);
                        if (err) {
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
    register
}