const svc = require('./notes.service');
const log = require('../../../logging');

const createNote = (req, res) => {

    try {
        const userid = req.query.userId;    //**userId** will be passed as **query param**

        svc.createNote(userid, req.body)
            .then((response) => {
                res.status(response.status).send(response);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        log.info(error);
        res.status(error.status).send(error);
    }

};

const getNoteForUserID = (req, res) => {

    try {
        const userid = req.query.userId;    //**userId** will be passed as **query param**
        let titlename = req.query.title;

        if (userid && titlename) {
            log.info('search using title and userid')
            svc.searchNoteByTitle(titlename, userid)
                .then((response) => {
                    res.status(response.status).send(response);
                }).catch((error) => {
                    res.status(error.status).send(error);
                });
        } else {
            log.info('search using userid')

            svc.getNoteForUserID(userid)
                .then((response) => {
                    res.status(response.status).send(response);
                }).catch((error) => {
                    res.status(error.status).send(error);
                });

        }
    } catch (error) {
        log.info(error);
        res.status(error.status).send(error);
    }

};

const updateNotes = (req, res) => {

    try {
        const noteid = req.params.noteId;   //**noteId** will be passed as route parameters into url

        svc.updateNotes(noteid, req.body)
            .then((response) => {
                res.status(response.status).send(response);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        log.info(error);
        res.status(error.status).send(error);
    }
};

const getNoteForNoteID = (req, res) => {

    try {
        const noteid = req.params.noteId;   //**noteId** will be passed as route parameters into url

        svc.getNoteForNoteID(noteid)
            .then((response) => {
                res.status(response.status).send(response);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        log.info(error);
        res.status(error.status).send(error);
    }


};

const shareNote = (req, res) => {
    log.info('inside share');
    try {
        const noteId = req.body.noteId;   //**noteId** will be passed as request body
        const shared = req.body.sharedTo;   //**userIds** will be passed as request body

        log.info('noteID[] : ', noteId);
        log.info('userIds[] : ', shared);

        let noteArr = [];
        if (Array.isArray(noteId)) {
            noteArr = noteId;
        } else {
            noteArr.push(noteId);
        }

        let sharedArr = [];
        if (Array.isArray(shared)) {
            sharedArr = shared;
        } else {
            sharedArr.push(shared);
        }

        svc.shareNote(noteArr, sharedArr)
            .then((response) => {
                res.status(response.status).send(response);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        log.info(error);
        res.status(error.status).send(error);
    }
};

const deleteNotes = (req, res) => {

    try {
        const noteId = req.body.noteId;   //**noteId** will be passed as request body
        let noteArr = [];
        if (Array.isArray(noteId)) {
            noteArr = noteId;
        } else {
            noteArr.push(noteId);
        }

        svc.deleteNotes(noteArr)
            .then((response) => {
                res.status(response.status).send(response);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        log.info(error);
        res.status(error.status).send(error);
    }
};

const addNoteToFavourites = (req, res) => {

    try {
        const noteId = req.body.noteId;   //**noteId** will be passed as request body
        let noteArr = [];
        if (Array.isArray(noteId)) {
            noteArr = noteId;
        } else {
            noteArr.push(noteId);
        }

        svc.addNoteToFavourites(noteArr, true)
            .then((response) => {
                res.status(response.status).send(response);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        log.info(error);
        res.status(error.status).send(error);
    }
};

const removeNoteFromFavourites = (req, res) => {

    try {
        const noteId = req.body.noteId;  //**noteId** will be passed as request body
        let noteArr = [];
        if (Array.isArray(noteId)) {
            noteArr = noteId;
        } else {
            noteArr.push(noteId);
        }

        svc.addNoteToFavourites(noteArr, false)
            .then((response) => {
                res.status(response.status).send(response);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        log.info(error);
        res.status(error.status).send(error);
    }
};

const addNoteToGroup = (req, res) => {

    try {
        const noteIds = req.body.noteId;   //**noteId** will be passed as request body
        const groupName = req.body.groupName;   //**groupName** will be passed as request body

        let noteArr = [];
        if (Array.isArray(noteIds)) {
            noteArr = noteIds;
        } else {
            noteArr.push(noteIds);
        }

        svc.addNoteToGroup(groupName, noteArr)
            .then((response) => {
                res.status(response.status).send(response);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        log.info(error);
        res.status(error.status).send(error);
    }
};

const isUserAllowedForNote = (req, res) => {

    try {
        const userid = req.query.userId;    //**userId** will be passed as **query param**
        const noteid = req.params.noteId;   //**noteId** will be passed as route parameters into url

        svc.isUserAllowedForNote(userid, noteid)
            .then((response) => {
                res.status(response.status).send({ isUserAllowed: true });
            }).catch((error) => {
                res.status(error.status).send({ isUserAllowed: false });
            });
    } catch (error) {
        log.info(error);
        res.status(error.status).send({ isUserAllowed: false });
    }
}

module.exports = {
    createNote,
    getNoteForUserID,
    updateNotes,
    getNoteForNoteID,
    shareNote,
    deleteNotes,
    addNoteToFavourites,
    removeNoteFromFavourites,
    addNoteToGroup,
    isUserAllowedForNote
};