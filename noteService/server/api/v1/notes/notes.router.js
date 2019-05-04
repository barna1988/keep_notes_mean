const router = require('express').Router();
const controller = require('./notes.controller');
const checkAuthentication = require('../../../services');

router.use(checkAuthentication); //Notes will be accessible only if User is authenticated

router.get('/', controller.getNoteForUserID);

router.post('/', controller.createNote);

router.get('/:noteId', controller.getNoteForNoteID);

router.put('/:noteId', controller.updateNotes);

router.delete('/:noteId', controller.deleteNotes);

router.put('/:noteId/share', controller.shareNote);

router.put('/:noteId/addFavorites', controller.addNoteToFavourites);

router.put('/:noteId/removeFavorites', controller.removeNoteFromFavourites);

router.put('/:noteId/addGroup', controller.addNoteToGroup);

router.get('/:noteId/isAllowed', controller.isUserAllowedForNote);

module.exports = router;