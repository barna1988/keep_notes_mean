const listOfUsers = {
  user_1_valid: {
    username: 'user1',
    password: 'pass1'
  },
  user_1_invalid_password: {
    username: 'user1',
    password: '123'
  },
  user_2_valid: {
    username: 'user2',
    password: 'pass2'
  }
};

const listOfNotes = {
  note_1_valid: {
    title: 'note1',
    text: 'this is note1',
    userId: 'user-id-1'
  },
  note_2_valid: {
    title: 'note2',
    text: 'this is note2',
    userId: 'user-id-2'
  },
  note_1_updated: {
    title: 'note1',
    text: 'this is note1 - updated',
    userId: 'user-id-1'
  }
};

const auth = {
  payload: { name: 'input-payload' },
  secret: 'some-secret-value',
  expires_hour: '1h',
  expires_milliSecond: '1ms'
};

module.exports = {
  listOfNotes,
  listOfUsers,
  auth
}