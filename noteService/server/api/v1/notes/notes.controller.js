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

        svc.getNoteForUserID(userid)
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

    try {
        const noteid = req.params.noteId;   //**noteId** will be passed as route parameters into url
        const userIds = req.body.userIds;   //**userIds** will be passed as request body

        svc.shareNote(noteid, userIds)
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
        const noteId = req.params.noteId;   //**noteId** will be passed as route parameters into url

        svc.deleteNotes(noteId)
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
        const noteId = req.params.noteId;   //**noteId** will be passed as route parameters into url

        svc.addNoteToFavourites(noteId, true)
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
            const noteId = req.params.noteId;   //**noteId** will be passed as route parameters into url
    
            svc.addNoteToFavourites(noteId, false)
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
        const noteId = req.params.noteId;   //**noteId** will be passed as route parameters into url
        const groupName = req.body.groupName;   //**groupName** will be passed as request body

        svc.addNoteToGroup(groupName, noteId)
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
    //return svc.isUserAllowedForNote(userid, noteid);

    try {
        const userid = req.query.userId;    //**userId** will be passed as **query param**
        const noteid = req.params.noteId;   //**noteId** will be passed as route parameters into url

        svc.isUserAllowedForNote(userid, noteid)
            .then((response) => {
                res.status(response.status).send({ isUserAllowed : true});
            }).catch((error) => {
                res.status(error.status).send({ isUserAllowed : false});
            });
    } catch (error) {
        log.info(error);
        res.status(error.status).send({ isUserAllowed : false});
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