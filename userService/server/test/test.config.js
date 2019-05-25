const listOfUsersForLogin = {
    user_1_valid: {
        username: 'user1',
        password: 'pass1'
    },
    user_1_invalid_password: {
        username: 'user1',
        password: '1346546'
    },
    user_1_invalid_username: {
        username: 'user11111',
        password: 'pass1'
    },
    user_2_new: {
        username: 'user2',
        password: 'pass2',
        email: 'test2@mail.com'
    },
};

const listOfUsersForRegistration = {
    user_1_valid: {
        username: 'user1',
        password: 'pass1',
        email: 'test4@mail.com'
    },
    user_2_invalid_no_username: {
        password: 'pass2',
        email: 'test2@mail.com'
    }
};

const auth = {
    payload: { name: 'input-payload' },
    secret: 'some-secret-value',
    expires_hour: '1h',
    expires_milliSecond: '1ms'
}

module.exports = {
    listOfUsersForLogin,
    listOfUsersForRegistration,
    auth
}