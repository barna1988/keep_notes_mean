const listOfUsers = {
    user_1_valid: {
        username: 'user1',
        password: 'pass1'
    }
};

const auth = {
    payload: { name: 'input-payload' },
    secret: 'some-secret-value',
    expires_hour: '1h',
    expires_milliSecond: '1ms'
};

const listOfReminders = {
    reminder_1: {
        userName: 'user1',
        note: {
            title: 'title1',
            text: 'text1'
        },
        remindAt: new Date().toISOString(),
        userId: 'some-unique-user-id-1'

    },
    snoozed_reminder_1: {
        userName: 'user1',
        note: {
            title: 'title1',
            text: 'text1'
        },
        remindAt: new Date(2020, 1, 1).toISOString(),
        userId: 'some-unique-user-id-1'
    },
}

const listOfNotifications = {
    notification_1: {
        userName: 'user2',
        notes: [
            {
                title: 'title1',
                text: 'text1'
            }
        ],
        remindAt: new Date().toISOString(),
        userId: 'some-unique-user-id-1'
    }
}

module.exports = {
    listOfUsers,
    auth,
    listOfReminders,
    listOfNotifications
}