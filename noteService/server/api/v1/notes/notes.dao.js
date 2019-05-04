const noteModel = require('./notes.entity');
const uuidv1 = require('uuid/v1');

const log = require('../../../logging');

// handels to insert newly created note into the database
const createNote = (userId, note) => {

    return new Promise((resolve, reject) => {

        let newNote = new noteModel({
            id: uuidv1(),
            title: note.title,
            text: note.text,
            state: note.state,
            userId: userId
        });

        newNote.save((err, note) => {
            if (err) {
                log.error(err);
                reject({
                    message: 'Internal Server Error',
                    status: 500
                });
            } else {
                resolve({
                    note: note,
                    message: 'Note is added successfully',
                    status: 201
                });
            }
        });
    });
};

const getAllNoteForUserID = (userID) => {
    // console.log('getting note for userID : ', userID);

    return new Promise((resolve, reject) => {

        let noteToFind = {
            userId: userID
        };
        // console.log('note', noteToFind);

        noteModel.find(noteToFind, (error, notes) => {
            if (error) {
                reject({
                    message: 'Error while getting notes',
                    status: 500
                });
            } else if (!notes || notes.length === 0) {
                resolve({
                    message: `No Notes found for userID ${userID}`,
                    status: 200
                });
            } else {
                resolve({
                    message: `Notes recieved for user ${userID}`,
                    status: 200,
                    notes: notes
                });
            }
        });
    });
};

const updateNotes = (noteid, note) => {

    return new Promise((resolve, reject) => {

        let editedNote = {
            $set: {
                title: note.title,
                text: note.text,
                state: note.state,
                modifiedOn: Date.now()
            }
        };

        let noteToFind = {
            id: noteid
        };

        //console.log('editedNote', editedNote);
        noteModel.findOneAndUpdate(noteToFind, editedNote, { new: true }, (err, note) => {

            // console.log('err', err);
            // console.log('note', note);

            if (err) {
                reject({
                    message: 'Error while adding notes',
                    status: 500
                });
            } else if (!note) {
                reject({
                    message: `No document found for NoteID ${noteid}`,
                    status: 500
                });
            } else {
                //console.log('updated doc : ', doc);
                resolve({
                    message: 'Notes updated',
                    status: 200,
                    note: note
                });
            }
        })
    });

};

const getNoteForNoteID = (noteid) => {
    // console.log('Fetching Notes for noteid : ', noteid);

    return new Promise((resolve, reject) => {
        const query = {
            id: noteid
        };

        noteModel.findOne(query, (error, note) => {
            if (error) {
                reject({
                    message: `Error is getting Notes for noteID ${noteid}`,
                    status: 500
                });
            } else if (!note) {
                resolve({
                    message: `No Notes found for for noteID ${noteid}`,
                    status: 200
                });
            } else {
                resolve({
                    message: 'Notes found',
                    status: 200,
                    note: note
                });
            }
        });
    });
}

const shareNote = (noteid, userIds) => {
    return new Promise((resolve, reject) => {

        const criteria = {
            id: noteid
        };

        const dataToUpdate = {
            $push: {
                sharedTo: userIds
            },
            $set : {
                modifiedOn: Date.now()
            }
        };

        noteModel.findOneAndUpdate(criteria, dataToUpdate, { new: true }, (error, data) => {
            if (error) {
                reject({
                    message: "error : " + error.message,
                    status: 500
                });
            } else if (data) {

                resolve({
                    message: "Notes shared ",
                    updateResult: data,
                    status: 201
                });
            } else {
                reject({
                    message: "No data found for noteid : " + noteid,
                    status: 404
                });
            }
        });
    });
};

const deleteNotes = (noteId) => {
    return new Promise((resolve, reject) => {
        try {

            log.info(`note id to delete ${noteId}`);
            noteModel.remove({ id: noteId }, (err) => {
                if (err) {
                    throw err;
                } else {
                    log.debug('notes deleted');
                    resolve({ message: 'notes deleted', status: 200 });
                }

            });
        } catch (err) {
            log.error(err);
            reject({ message: 'Failed to delete notes due to unexpected error', status: 500 });
        }
    });
};

const addNoteToFavourites = (noteId, isFavourite) => {
    return new Promise((resolve, reject) => {
        try {
            log.info(`adding/removing notes to favourites for noteid - ${noteId} as ${isFavourite}`);

            let criteria = {
                id: noteId
            };

            let updatedData = {
                $set : {
                    isFavourite: isFavourite,
                    modifiedOn: Date.now()
                }
            };

            noteModel.findOneAndUpdate(criteria, updatedData, { new: true }, (err, document) => {
                if (err) {
                    log.info('error in fav update - ', err);
                    throw err;
                } else if(document){
                    log.debug('notes updated and added to favourites');
                    resolve({
                        message: 'notes added to favourites: ',
                        updateResult: document,
                        status: 200
                    });
                } else {
                    reject({
                        message: 'No data found to update',
                        status: 404
                    });
                }
            });
        } catch (err) {
            log.error(err);
            reject({
                message: 'Failed to add notes to favourites due to unexpected error',
                status: 500
            });
        }
    });
};

const addNoteToGroup = (groupName, noteId) => {
    return new Promise((resolve, reject) => {
        try {
            log.info('adding notes to group: ' + groupName);

            let criteria = {
                id: noteId
            };

            let updatedData = {
                $push : {
                    groupName: groupName,
                },
                $set : {
                    modifiedOn: Date.now()
                }
            }

            noteModel.findOneAndUpdate(criteria, updatedData, { new: true }, (err, document) => {
                if (err) {
                    throw err;
                } else if (document) {
                    log.debug('notes updated and added to group: ');
                    resolve({
                        message: 'notes added to group: ' + groupName,
                        updateResult: document,
                        status: 200
                    });
                } else {
                    reject({
                        message: 'No data found to update',
                        status: 404
                    });
                }
            });

        } catch (err) {
            log.error(err);
            reject({
                message: 'Failed to add notes to group due to unexpected error',
                status: 500
            });
        }
    });
};

const isUserAllowedForNote = (userid, noteid) => {
    return new Promise((resolve, reject) => {
        try {
            log.info(`checking note (${noteid}) permissions for user: ${userid}`);

            noteModel.findOne({ id: noteid }, (err, note) => {
                if (err) {
                    throw err;
                }
                if (!note) {
                    throw new Error('Note could not be found for id: ' + noteid);
                }

                let sharedTo;
                if (note.sharedTo) {
                    sharedTo = note.sharedTo.find(element => element === userid);
                }
                if (note.userId === userid || sharedTo) {
                    resolve({
                        message: 'Access allowed',
                        status: 200
                    });
                }
                else {
                    reject({
                        message: 'Access denied',
                        status: 400
                    });
                }
            });
        } catch (err) {
            log.error(err);
            reject({
                message: 'Failed while checking permissions due to unexpected error',
                status: 500
            });
        }
    });
};

module.exports = {
    createNote,
    getAllNoteForUserID,
    updateNotes,
    getNoteForNoteID,
    shareNote,
    deleteNotes,
    addNoteToFavourites,
    addNoteToGroup,
    isUserAllowedForNote
}