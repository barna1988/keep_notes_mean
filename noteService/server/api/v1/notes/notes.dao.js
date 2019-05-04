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

const shareNote = (noteids, userIds, access) => {
    return new Promise((resolve, reject) => {
        const dateNow = Date.now();

        const dataToUpdate = {
            $push: {
                sharedTo: userIds
            },
            $set: {
                modifiedOn: dateNow
            }
        };

        const notesToFind = {
            id: { $in: noteids }
        };

        let notesFound = [];

        //Find all the notes
        noteModel.find(notesToFind, (error, document) => {
            if (error || !document || document.length === 0) {
                log.info('error in finding notes :', error);
                reject({
                    message: "No notes found",
                    status: 404
                });
            } else {
                log.info('notes found:', document);
                notesFound = document;

                let updateCriteria = {
                    id: { $in: noteids }
                };

                //Update all the notes
                noteModel.update(updateCriteria, dataToUpdate, { multi: true, new: true }, (error, data) => {
                    log.info('data :', data)
                    if (error) {
                        reject({
                            message: "Cannot update note : " + error.message,
                            status: 500
                        });
                    } else if (data && data.n > 0) {

                        notesFound.forEach(note => {

                            userIds.forEach(user => note.sharedTo.push(user));
                            note.modifiedOn = dateNow;
                        });

                        resolve({
                            message: "Notes shared ",
                            updateResult: notesFound,
                            status: 200
                        });
                    } else {
                        reject({
                            message: "Cannot update note. ",
                            status: 500
                        });
                    }
                });

            }
        });


    });
};

const deleteNotes = (noteId) => {
    return new Promise((resolve, reject) => {
        try {

            log.info(`note id to delete ${noteId}`);
            noteModel.remove({ id: { $in: noteId } }, (err) => {
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

const addNoteToFavourites = (noteids, isFavourite) => {
    return new Promise((resolve, reject) => {
        try {
            const dateNow = Date.now();

            const dataToUpdate = {
                $set: {
                    modifiedOn: dateNow,
                    isFavourite: isFavourite
                }
            };

            const notesToFind = {
                id: { $in: noteids }
            };

            let notesFound = [];

            //Find all the notes
            noteModel.find(notesToFind, (error, document) => {
                if (error || !document || document.length === 0) {
                    log.info('error in finding notes :', error);
                    reject({
                        message: "No notes found",
                        status: 404
                    });
                } else {
                    log.info('notes found:', document);
                    notesFound = document;

                    let updateCriteria = {
                        id: { $in: noteids }
                    };

                    //Update all the notes
                    noteModel.update(updateCriteria, dataToUpdate, { multi: true, new: true }, (error, data) => {
                        log.info('data :', data)
                        if (error) {
                            reject({
                                message: "Cannot update note : " + error.message,
                                status: 500
                            });
                        } else if (data && data.n > 0) {

                            notesFound.forEach(note => note.isFavourite = isFavourite);

                            if (isFavourite) {
                                resolve({
                                    message: "Notes added to favourites ",
                                    updateResult: notesFound,
                                    status: 200
                                });
                            } else {
                                resolve({
                                    message: "Notes removed from favourites ",
                                    updateResult: notesFound,
                                    status: 200
                                });
                            }
                        } else {
                            reject({
                                message: "Cannot update note favourite. ",
                                status: 500
                            });
                        }
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

const addNoteToGroup = (groupName, noteids) => {
    return new Promise((resolve, reject) => {
        try {
            log.info('adding notes to group: ' + groupName);

            const dateNow = Date.now();

            const dataToUpdate = {
                $push: {
                    groupName: groupName
                },
                $set: {
                    modifiedOn: dateNow
                }
            };

            const notesToFind = {
                id: { $in: noteids }
            };

            let notesFound = [];

            //Find all the notes
            noteModel.find(notesToFind, (error, document) => {
                if (error || !document || document.length === 0) {
                    log.info('error in finding notes :', error);
                    reject({
                        message: "No notes found",
                        status: 404
                    });
                } else {
                    log.info('notes found:', document);
                    notesFound = document;

                    let updateCriteria = {
                        id: { $in: noteids }
                    };

                    //Update all the notes
                    noteModel.update(updateCriteria, dataToUpdate, { multi: true, new: true }, (error, data) => {
                        log.info('data :', data)
                        if (error) {
                            reject({
                                message: "Cannot update note groupname : " + error.message,
                                status: 500
                            });
                        } else if (data && data.n > 0) {

                            notesFound.forEach(note => {

                                groupName.forEach(group => note.groupName.push(group));
                                note.modifiedOn = dateNow;
                            });

                            resolve({
                                message: "Notes Group updated ",
                                updateResult: notesFound,
                                status: 200
                            });
                        } else {
                            reject({
                                message: "Cannot update note group. ",
                                status: 500
                            });
                        }
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

const searchNoteByTitle = (titlename, userid) => {
    return new Promise((resolve, reject) => {
        try {
            log.info(`searching notes by title - ${titlename} by user - ${userid}`);

            let searchCriteria = {
                title: {$regex: titlename,  $options: 'i'}, //regex search
                userId: userid
            }
            log.info(searchCriteria);
            noteModel.find(searchCriteria, (err, document) => {
                
                if (err) {
                    throw err;
                } else if (document && document.length > 0) {
                    resolve({
                        message: 'Notes found',
                        updateResult: document,
                        status: 200
                    });
                } else {
                    resolve({
                        message: 'No notes found for title '+ titlename,
                        status: 404
                    });
                }
            })

        } catch (error) {
            log.error(err);
            reject({
                message: 'Failed while searching notes due to unexpected error',
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
    isUserAllowedForNote,
    searchNoteByTitle
}