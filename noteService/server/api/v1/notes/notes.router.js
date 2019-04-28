const router = require('express').Router();
const controller = require('./notes.controller');
const checkAuthentication = require('../../../services');

router.use(checkAuthentication); //Notes will be accessible only if User is authenticated

router.get('/', controller.getNoteForUserID);

router.post('/', controller.createNote);

router.get('/:noteId', controller.getNoteForNoteID);

router.put('/:noteId', controller.updateNotes);

router.put('/share', controller.shareNote);

router.delete('/delete', controller.deleteNotes);

router.put('/addFavorites', controller.addNoteToFavourites);

router.put('/addGroup', controller.addNoteToGroup);

router.get('/isAllowed', controller.isUserAllowedForNote);

module.exports = router;