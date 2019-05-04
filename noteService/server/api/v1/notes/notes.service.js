const dao = require('./notes.dao');

const createNote = (data, userId) => {
  return dao.createNote(data, userId);
};

const getNoteForUserID = (userId) => {
  return dao.getAllNoteForUserID(userId);
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

const deleteNotes = (noteId) => {
    return dao.deleteNotes(noteId);
};

const addNoteToFavourites = (noteId, isFav) => {
    return dao.addNoteToFavourites(noteId, isFav);
};

const addNoteToGroup = (groupName, noteId) => {
    return dao.addNoteToGroup(groupName, noteId);
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