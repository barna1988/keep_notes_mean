const should = require('chai').should();
const request = require('supertest');

const config = require('./test.config');

const app = require('../app');
const modules = require('../module');

// Mongodb connection
before((done) => {
    modules.initializeMongooseConnection().then(() => done());
});

// Clear DB b4 running test cases
before((done) => {
    modules.userModel.remove({}, (error) => {
        if (error) {
            return done(error);
        } else {
            done();
        }
    })
});

describe('Testing User Registration', () => {

    //positive
    it(('Should register user'), (done) => {
        let user = config.listOfUsersForRegistration.user_1_valid;

        request(app)
            .post('/api/v1/users/register')
            .send(user)
            .expect(201)    // status code should be 201
            .end((error, response) => {
                if (error) {
                    return done(error);
                } else {
                    // should return the registered user with username and userId
                    const username = response.body.userInfo.userName;
                    const userid = response.body.userInfo.userId;
                    username.should.equal(user.username, 'response should return proper username');
                    userid.should.not.equal(undefined);
                    userid.should.not.equal(null);

                    done();
                }
            });
    });

    //negative
    it(('Should handle Registration without username, password or email'), (done) => {
        let user = config.listOfUsersForRegistration.user_2_invalid_no_username;

        request(app)
            .post('/api/v1/users/register')
            .send(user)
            .expect(403)    // status code should be 201
            .end((error, response) => {
                if (error) {
                    return done(error);
                } else {
                    // should return the registered user with username and userId
                    const message = response.body.message;
                    message.should.equal('Failed to register due to incorrect data', 'response message should be proper');

                    done();
                }
            });
    });
});

describe('Testing user Login', () => {

    //positive
    it('Should handle login', (done) => {
        let user = config.listOfUsersForLogin.user_1_valid;

        request(app)
            .post('/api/v1/users/login')
            .send(user)
            .expect(200)    // status code should be 200
            .end((error, response) => {
                if (error) {
                    return done(error);
                } else {
                    // should return the registered token & user with username,userid
                    const token = response.body.token;
                    token.should.not.equal(undefined);
                    token.should.not.equal(null);


                    const username = response.body.user.userName;
                    const userid = response.body.user.userId;
                    username.should.equal(user.username, 'response should return proper username');
                    userid.should.not.equal(undefined);
                    userid.should.not.equal(null);

                    done();
                }
            });
    });

    //negative
    it(('Should handle Login with invalid password'), (done) => {
        let user = config.listOfUsersForLogin.user_1_invalid_password;

        request(app)
            .post('/api/v1/users/login')
            .send(user)
            .expect(403)    // status code should be 201
            .end((error, response) => {
                if (error) {
                    return done(error);
                } else {
                    // should return the registered user with username and userId
                    const message = response.body.message;
                    message.should.equal('Password is incorrect', 'response message should be proper');

                    done();
                }
            });
    });

    //negative
    it(('Should handle Login with invalid username'), (done) => {
        let user = config.listOfUsersForLogin.user_1_invalid_username;

        request(app)
            .post('/api/v1/users/login')
            .send(user)
            .expect(403)    // status code should be 201
            .end((error, response) => {
                if (error) {
                    return done(error);
                } else {
                    // should return the registered user with username and userId
                    const message = response.body.message;
                    message.should.equal('You are not registered user', 'response message should be proper');

                    done();
                }
            });
    });

    //negative
    it(('Should handle Login with new user'), (done) => {
        let user = config.listOfUsersForLogin.user_2_new;

        request(app)
            .post('/api/v1/users/login')
            .send(user)
            .expect(403)    // status code should be 201
            .end((error, response) => {
                if (error) {
                    return done(error);
                } else {
                    // should return the registered user with username and userId
                    const message = response.body.message;
                    message.should.equal('You are not registered user', 'response message should be proper');

                    done();
                }
            });
    });
});

describe('Testing get registered users', () => {

    //positive
    it('Should return registered users', (done) => {

        request(app)
            .get('/api/v1/users/getUsers/')
            .expect(200)
            .end((error, response) => {
                if (error) {
                    return done(error);
                } else {
                    // should return the registered users
                    const userInfo = response.body.userInfo;
                    userInfo.should.not.equal(undefined);
                    userInfo.should.not.equal(null);

                    userInfo.length.should.not.equal(0, 'No registered users present');
                    done();
                }
            })
    });
})