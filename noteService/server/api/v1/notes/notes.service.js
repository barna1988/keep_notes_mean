const dao = require('./notes.dao');

const createNote = (data, userId) => {
  return dao.createNote(data, userId);
};

const getNoteForUserID = (userId) => {
  return dao.getNoteForUserID(userId);
};

const updateNotes = (noteid, data) => {
  return dao.updateNotes(noteid, data);
};

const getNoteForNoteID = (noteid) => {
  return dao.getNoteForNoteID(noteid);
};

const shareNote = (noteid, userIds) => {
    return dao.shareNote(noteid, userIds);
};

const deleteNotes = (noteIds) => {
    return dao.deleteNotes(noteIds);
};

const addNoteToFavourites = (noteIds) => {
    return dao.addNoteToFavourites(noteIds);
};

const addNoteToGroup = (groupName, noteIds) => {
    return dao.addNoteToGroup(groupName, noteIds);
};

const isUserAllowedForNote = (userid, noteid) => {
    return dao.isUserAllowedForNote(userid, noteid);
}

module.exports = {
  createNote,
  getNoteForUserID,
  updateNotes,
  getNoteForNoteID,
  shareNote,
  deleteNotes,
  addNoteToFavourites,
  addNoteToGroup,
  isUserAllowedForNote
};