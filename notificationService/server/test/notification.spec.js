const should = require('chai').should();
const request = require('supertest');

const config = require('./test.config');

const app = require('../app');
const modules = require('../modules');

const uuidv1 = require('uuid/v1');

let user1TokenJWT;
let user2TokenJWT;

// Mongodb connection
before((done) => {
    modules.initialiseMongooseConnection().then(() => done());
});

// Clear DB b4 running test cases
before((done) => {
    modules.notificationModel.remove({}, (error) => {
        if (error) {
            return done(error);
        } else {
            done();
        }
    })
});

//Get JWT Token from auth service for user 1
before((done) => {
    let user = config.listOfUsers.user_1_valid;

    modules.signJWTToken(user, config.auth.secret, config.auth.expires_hour, (error, token) => {
        if (error) {
            return done(error);
        } else {
            user1TokenJWT = token;
            done();
        }
    });

});

describe('Testing Reminder add', () => {

    //positive
    it('Should add a reminder for a user', (done) => {
        const reminder = config.listOfReminders.reminder_1;

        request(app)
            .post(`/api/v1/notifications/reminders?userId=${reminder.userId}`)
            .set('Authorization', `Bearer ${user1TokenJWT}`)
            .send(reminder)
            .expect(201)
            .end((error, response) => {
                if (error) {
                    return done(error);
                } else {
                    let rem = response.body.notification;

                    rem.should.not.equal(null, 'Added reminder cannot be null');
                    rem.should.not.equal(undefined, 'Added reminder cannot be undefined');

                    rem.note.should.not.equal(null, 'Added reminder note cannot be null');
                    rem.note.should.not.equal(undefined, 'Added reminder note cannot be undefined');

                    done();
                }
            });
    });

    //positive
    it('Should add a notification for a user', (done) => {
        const reminder = config.listOfNotifications.notification_1;

        request(app)
            .post(`/api/v1/notifications?userId=${reminder.userId}`)
            .set('Authorization', `Bearer ${user1TokenJWT}`)
            .send(reminder)
            .expect(201)
            .end((error, response) => {
                if (error) {
                    return done(error);
                } else {

                    let notification = response.body.notifications;

                    notification.should.not.equal(null, 'Added notification cannot be null');
                    notification.should.not.equal(undefined, 'Added notification cannot be undefined');

                    notification[0].note.should.not.equal(null, 'Added notification note cannot be null');
                    notification[0].note.should.not.equal(undefined, 'Added notification note cannot be undefined');

                    notification[0].self.should.equal(false, 'Notification should be added for 2nd user');

                    done();
                }
            });
    });
});


describe('Testing to get notifications/reminders', () => {

    it('Should get notification/reminder for a self user', (done) => {
        let reminder = config.listOfReminders.reminder_1;

        let notification = new modules.notificationModel({
            notificationID: uuidv1(),
            userId: reminder.userId,
            userName: reminder.userName,
            remindAt: reminder.remindAt,
            note: reminder.note
        });

        notification.save((error, resp) => {
            if (error) {
                return done(error);
            } else {
                let addedNotification = resp;

                request(app)
                    .get(`/api/v1/notifications/reminders?userId=${addedNotification.userId}`)
                    .set('Authorization', `Bearer ${user1TokenJWT}`)
                    .expect(200)
                    .end((error, response) => {
                        if (error) {
                            return done(error);
                        } else {

                            let notificationsFound = response.body;

                            notificationsFound.should.not.equal(null, 'Response cannot be null');
                            notificationsFound.should.not.equal(undefined, 'Response cannot be undefined');

                            notificationsFound.should.be.an('array', 'Response should contain array');

                            done();
                        }
                    });

            }
        });


    });

    it('Should get a specific notification/remnder by id', (done) => {


        let reminder = config.listOfReminders.reminder_1;

        let notification = new modules.notificationModel({
            notificationID: uuidv1(),
            userId: reminder.userId,
            userName: reminder.userName,
            remindAt: reminder.remindAt,
            note: reminder.note
        });

        notification.save((error, resp) => {
            if (error) {
                return done(error);
            } else {
                let addedNotification = resp;

                request(app)
                    .get(`/api/v1/notifications/reminders/${addedNotification.notificationID}`)
                    .set('Authorization', `Bearer ${user1TokenJWT}`)
                    .expect(200)
                    .end((error, response) => {
                        if (error) {
                            return done(error);
                        } else {

                            let notificationsFound = response.body.notifications;

                            notificationsFound.should.not.equal(null, 'Response cannot be null');
                            notificationsFound.should.not.equal(undefined, 'Response cannot be undefined');

                            notificationsFound[0].note.should.not.equal(null, 'Notification note cannot be null');
                            notificationsFound[0].note.should.not.equal(undefined, 'Notification note cannot be undefined');

                            done();
                        }
                    });

            }
        });

    });

});

describe('Testing to Snooze reminder', () => {

    it('Should handle a request to snooze reminder', (done) => {
        let reminder = config.listOfReminders.reminder_1;
        let snoozedReminder = config.listOfReminders.snoozed_reminder_1;

        let notification = new modules.notificationModel({
            notificationID: uuidv1(),
            userId: reminder.userId,
            userName: reminder.userName,
            remindAt: reminder.remindAt,
            note: reminder.note
        });

        notification.save((error, resp) => {
            if (error) {
                return done(error);
            } else {
                let addedNotification = resp;
                let notificationID = addedNotification.notificationID;

                snoozedReminder.notificationID = notificationID;

                request(app)
                    .put(`/api/v1/notifications/reminders/${notificationID}`)
                    .set('Authorization', `Bearer ${user1TokenJWT}`)
                    .send(snoozedReminder)
                    .expect(200)
                    .end((error, response) => {
                        if (error) {
                            return done(error);
                        } else {

                            let notificationsFound = response.body.notification;

                            notificationsFound.should.not.equal(null, 'Response cannot be null');
                            notificationsFound.should.not.equal(undefined, 'Response cannot be undefined');

                            notificationsFound.note.should.not.equal(null, 'Reminder Note in Response cannot be null');
                            notificationsFound.note.should.not.equal(undefined, 'Reminder Note cannot be undefined');

                            notificationsFound.remindAt.should.equal(snoozedReminder.remindAt, 'Snoozed time should match');


                            done();
                        }
                    });

            }
        });


    });

});

describe('Testing to Dismiss reminder', () => {

    it('Should get a specific notification/remnder by id', (done) => {

        let reminder = config.listOfReminders.reminder_1;

        let notification = new modules.notificationModel({
            notificationID: uuidv1(),
            userId: reminder.userId,
            userName: reminder.userName,
            remindAt: reminder.remindAt,
            note: reminder.note
        });

        notification.save((error, resp) => {
            if (error) {
                return done(error);
            } else {
                let addedNotification = resp;
                let notificationID = addedNotification.notificationID;

                request(app)
                    .delete(`/api/v1/notifications/reminders/${notificationID}`)
                    .set('Authorization', `Bearer ${user1TokenJWT}`)
                    .expect(200)
                    .end((error, response) => {
                        if (error) {
                            return done(error);
                        } else {

                            done();
                        }
                    });

            }
        });


    });

});