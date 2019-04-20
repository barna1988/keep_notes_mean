const svc = require('./notes.service');

const createNote = (data, userId) => {
    return svc.createNote(data, userId);
};

const getNoteForUserID = (userId) => {
    return svc.getNoteForUserID(userId);
};

const updateNotes = (noteid, data) => {
    return svc.updateNotes(noteid, data);
};

const getNoteForNoteID = (noteid) => {
    return svc.getNoteForNoteID(noteid);
};

const shareNote = (noteid, userIds) => {
    return svc.shareNote(noteid, userIds);
};

const deleteNotes = (noteIds) => {
    return svc.deleteNotes(noteIds);
};

const addNoteToFavourites = (noteIds) => {
    return svc.addNoteToFavourites(noteIds);
};

const addNoteToGroup = (groupName, noteIds) => {
    return svc.addNoteToGroup(groupName, noteIds);
};

const isUserAllowedForNote = (userid, noteid) => {
    return svc.isUserAllowedForNote(userid, noteid);
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
