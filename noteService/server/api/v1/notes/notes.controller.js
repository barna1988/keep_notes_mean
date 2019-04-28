const svc = require('./notes.service');

const createNote = (req, res) => {

    try {
        const userid = req.query.userId;    //**userId** will be passed as **query param**

        svc.createNote(userid, req.body)
            .then((response) => {
                res.status(response.status).send(response.note);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        res.status(error.status).send(error);
    }

};

const getNoteForUserID = (req, res) => {

    try {
        const userid = req.query.userId;    //**userId** will be passed as **query param**

        svc.getNoteForUserID(noteid)
            .then((response) => {
                res.status(response.status).send(response.notes);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        res.status(error.status).send(error);
    }

};

const updateNotes = (req, res) => {

    try {
        const noteid = req.params.noteId;   //**noteId** will be passed as route parameters into url

        svc.updateNotes(noteid, req.body)
            .then((response) => {
                res.status(response.status).send(response.note);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        res.status(error.status).send(error);
    }
};

const getNoteForNoteID = (req, res) => {

    try {
        const noteid = req.params.noteId;   //**noteId** will be passed as route parameters into url

        svc.getNoteForNoteID(noteid)
            .then((response) => {
                res.status(response.status).send(response.note);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        res.status(error.status).send(error);
    }


};

const shareNote = (req, res) => {

    try {
        const noteid = req.params.noteId;   //**noteId** will be passed as route parameters into url
        const userIds = req.body.userIds;   //**userIds** will be passed as request body

        svc.shareNote(noteid, userIds)
            .then((response) => {
                res.status(response.status).send(response.updateResult);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        res.status(error.status).send(error);
    }
};

const deleteNotes = (req, res) => {

    try {
        const noteIds = req.body.noteIds;   //**noteIds** will be passed as request body

        svc.deleteNotes(noteIds)
            .then((response) => {
                res.status(response.status).send(response);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        res.status(error.status).send(error);
    }
};

const addNoteToFavourites = (req, res) => {

    try {
        const noteIds = req.body.noteIds;   //**noteIds** will be passed as request body

        svc.addNoteToFavourites(noteIds)
            .then((response) => {
                res.status(response.status).send(response.updateResult);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        res.status(error.status).send(error);
    }
};

const addNoteToGroup = (groupName, noteIds) => {

    try {
        const noteIds = req.body.noteIds;   //**noteIds** will be passed as request body
        const groupName = req.body.groupName;   //**groupName** will be passed as request body

        svc.addNoteToGroup(groupName, noteIds)
            .then((response) => {
                res.status(response.status).send(response.updateResult);
            }).catch((error) => {
                res.status(error.status).send(error);
            });
    } catch (error) {
        res.status(error.status).send(error);
    }
};

const isUserAllowedForNote = (userid, noteid) => {
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
    addNoteToGroup,
    isUserAllowedForNote
};