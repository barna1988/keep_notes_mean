const router = require('express').Router();
const controller = require('./notes.controller');
const auth = require('../auth/auth');

router.use(auth.isUserAuthenticated); //Notes will be accessible only if User is authenticated

router.get('/', controller.getNoteForUserID);
router.post('/', controller.createNote);

router.get('/:noteId', controller.getNoteForNoteID);
router.put('/:noteId', controller.updateNotes);

module.exports = router;