const router = require('express').Router();
const controller = require('./notes.controller');
const checkAuthentication = require('../../../services');

router.use(checkAuthentication); //Notes will be accessible only if User is authenticated

router.get('/', controller.getNoteForUserID);

router.post('/', controller.createNote);

router.put('/share', controller.shareNote);

router.post('/delete', controller.deleteNotes);

router.put('/addFavorites', controller.addNoteToFavourites);

router.put('/removeFavorites', controller.removeNoteFromFavourites);

router.put('/addGroup', controller.addNoteToGroup);

router.get('/:noteId/isAllowed', controller.isUserAllowedForNote);

router.get('/:noteId', controller.getNoteForNoteID);

router.put('/:noteId', controller.updateNotes);

module.exports = router;