const should = require('chai').should();
const request = require('supertest');

const config = require('./config.test');

const app = require('../app');
const modules = require('../module');

const uuidv1 = require('uuid/v1');

let user1TokenJWT;
let user2TokenJWT;

// Mongodb connection
before((done) => {
  console.log('mongoose connection');
  modules.initializeMongooseConnection().then(() => done());
});

// Clear DB b4 running test cases
before((done) => {
  modules.noteModel.remove({}, (error) => {
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

//Get JWT Token from auth service for user 2
before((done) => {
  let user = config.listOfUsers.user_2_valid;

  modules.signJWTToken(user, config.auth.secret, config.auth.expires_hour, (error, token) => {
    if (error) {
      return done(error);
    } else {
      user2TokenJWT = token;
      console.log('token2 generated');
      done();
    }
  });
});

describe('Testing Note Creation', () => {

  //positive
  it('Should create a note for user', (done) => {

    let note = config.listOfNotes.note_1_valid;
    console.log('starting')
    request(app)
      .post(`/api/v1/notes/?userId=${note.userId}`)
      .set('Authorization', `Bearer ${user1TokenJWT}`)
      .send(note)
      .expect(201)
      .end((error, response) => {

        if (error) {
          return done(error);
        } else {

          let noteAdded = response.body.note;

          noteAdded.should.not.equal(undefined);
          noteAdded.should.not.equal(null);

          noteAdded.title.should.equal(note.title, 'Title of the note does not match');

          done();
        }

      });

  });

  //positive
  it('Should create another note for another user', (done) => {

    let note = config.listOfNotes.note_2_valid;

    request(app)
      .post(`/api/v1/notes/?userId=${note.userId}`)
      .set('Authorization', `Bearer ${user2TokenJWT}`)
      .send(note)
      .expect(201)
      .end((error, response) => {

        if (error) {
          return done(error);
        } else {

          let noteAdded = response.body.note;

          noteAdded.should.not.equal(undefined);
          noteAdded.should.not.equal(null);

          noteAdded.title.should.equal(note.title, 'Title of the note does not match');

          done();
        }

      });

  });

});

describe('Testing Note Retrieval', () => {

  //positive
  it('get all notes for user 1', (done) => {
    let note = config.listOfNotes.note_1_valid;

    request(app)
      .get(`/api/v1/notes/?userId=${note.userId}`)
      .set('Authorization', `Bearer ${user1TokenJWT}`)
      .expect(200)
      .end((error, response) => {

        if (error) {
          return done(error);
        } else {

          let notes = response.body.notes;
          notes.should.be.an('array');
          notes.length.should.be.above(0);

          notes[0].title.should.equal(note.title, 'Title of note does not match for user 1');

          done();
        }

      });
  });

  //positive
  it('get all notes for user 2', (done) => {
    let note = config.listOfNotes.note_2_valid;

    request(app)
      .get(`/api/v1/notes/?userId=${note.userId}`)
      .set('Authorization', `Bearer ${user2TokenJWT}`)
      .expect(200)
      .end((error, response) => {

        if (error) {
          return done(error);
        } else {

          let notes = response.body.notes;
          notes.should.be.an('array');
          notes.length.should.be.above(0);

          notes[0].title.should.equal(note.title, 'Title of note does not match for user 1');

          done();
        }

      });
  });

  //positive
  it('get all notes for noteid', (done) => {

    let note1 = config.listOfNotes.note_1_valid;

    let note = new modules.noteModel({
      id: uuidv1(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });

    note.save((error, savednote) => {
      if (error) {
        return done(error);
      } else {
        let savednoteid = savednote.id;

        request(app)
          .get(`/api/v1/notes/${savednoteid}`)
          .set('Authorization', `Bearer ${user1TokenJWT}`)
          .expect(200)
          .end((err, response) => {

            if (err) {
              return done(err);
            } else {
              let notefound = response.body.note;

              notefound.should.not.equal(undefined);
              notefound.should.not.equal(null);

              notefound.title.should.equal(note1.title, 'Title of the found note does not match');

              done();
            }
          });

      }
    });

  });

});

describe('Testing Note update', () => {
  it('Should update note for user1', (done) => {

    let note1 = config.listOfNotes.note_1_valid;
    let note1_updated = config.listOfNotes.note_1_updated;

    let note = new modules.noteModel({
      id: uuidv1(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });

    note.save((error, savednote) => {
      if (error) {
        return done(error);
      } else {
        let savednoteid = savednote.id;

        request(app)
          .put(`/api/v1/notes/${savednoteid}`)
          .set('Authorization', `Bearer ${user1TokenJWT}`)
          .send(note1_updated)
          .expect(200)
          .end((err, response) => {

            if (err) {
              return done(err);
            } else {
              let updatednote = response.body.note;

              updatednote.should.not.equal(undefined);
              updatednote.should.not.equal(null);

              updatednote.text.should.equal(note1_updated.text, 'Text of the updated note does not match');

              done();
            }
          });

      }
    });

  });

});

describe('Testing sharing and grouping notes', () => {

  it('should share note to one or multiple users', (done) => {

    let note1 = config.listOfNotes.note_1_valid;

    let note = new modules.noteModel({
      id: uuidv1(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });

    note.save((error, savednote) => {
      if (error) {
        return done(error);
      } else {
        let savednoteids = [savednote.id];
        let sharedTo = [{
          userID: savednote.userId,
          access: 'view'
        }];

        let reqdata = {
          noteId: savednoteids,
          sharedTo: sharedTo
        }

        request(app)
          .put(`/api/v1/notes/share`)
          .set('Authorization', `Bearer ${user1TokenJWT}`)
          .send(reqdata)
          .expect(200)
          .end((err, response) => {

            if (err) {
              return done(err);
            } else {
              let updatednote = response.body.data;

              //data.n > 0
              updatednote.should.not.equal(undefined);
              updatednote.should.not.equal(null);

              updatednote.n.should.be.above(0);

              done();
            }
          });

      }
    });


  });



  it('should group note to one or multiple users', (done) => {

    let note2 = config.listOfNotes.note_2_valid;

    let note = new modules.noteModel({
      id: uuidv1(),
      title: note2.title,
      text: note2.text,
      userId: note2.userId
    });

    note.save((error, savednote) => {
      if (error) {
        return done(error);
      } else {
        let savednoteids = [savednote.id];

        let reqdata = {
          noteId: savednoteids,
          groupName: 'group1'
        }

        request(app)
          .put(`/api/v1/notes/addGroup`)
          .set('Authorization', `Bearer ${user2TokenJWT}`)
          .send(reqdata)
          .expect(200)
          .end((err, response) => {
            console.log('error in group notes :', err)
            if (err) {
              return done(err);
            } else {
              let updatednote = response.body.data;

              //data.n > 0
              updatednote.should.not.equal(undefined);
              updatednote.should.not.equal(null);

              updatednote.n.should.be.above(0);

              done();
            }
          });
      }
    });
  });
});

describe('Testing Note delete', () => {
  it('Should delete one or multiple notes', (done) => {

    let note1 = config.listOfNotes.note_1_valid;

    let note = new modules.noteModel({
      id: uuidv1(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });

    note.save((error, savednote) => {
      if (error) {
        return done(error);
      } else {
        let savednoteid = {
          noteId: [savednote.id]
        };

        request(app)
          .post(`/api/v1/notes/delete`)
          .set('Authorization', `Bearer ${user1TokenJWT}`)
          .send(savednoteid)
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

describe('Testing Note add/remove favourites', () => {
  it('Should add to favourite one or multiple notes', (done) => {

    let note1 = config.listOfNotes.note_1_valid;

    let note = new modules.noteModel({
      id: uuidv1(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });

    note.save((error, savednote) => {
      if (error) {
        return done(error);
      } else {
        let savednoteid = {
          noteId: [savednote.id]
        };

        request(app)
          .put(`/api/v1/notes/addFavorites`)
          .set('Authorization', `Bearer ${user1TokenJWT}`)
          .send(savednoteid)
          .expect(200)
          .end((error, response) => {
            if (error) {
              return done(error);
            } else {

              response.body.message.should.equal('Notes added to favourites.', 'Response message do not match')
              done();
            }

          });

      }
    });

  });

  it('Should remove from favourite one or multiple notes', (done) => {

    let note1 = config.listOfNotes.note_1_valid;

    let note = new modules.noteModel({
      id: uuidv1(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });

    note.save((error, savednote) => {
      if (error) {
        return done(error);
      } else {
        let savednoteid = {
          noteId: [savednote.id]
        };

        request(app)
          .put(`/api/v1/notes/removeFavorites`)
          .set('Authorization', `Bearer ${user1TokenJWT}`)
          .send(savednoteid)
          .expect(200)
          .end((error, response) => {
            if (error) {
              return done(error);
            } else {

              response.body.message.should.equal('Notes removed from favourites.', 'Response message do not match')
              done();
            }

          });

      }
    });

  });

});