const express = require('express');
const router = express.Router();
const noteController = require('../controller/noteController');

router.get('/:notename', noteController.getNotes);
router.post('/:notename/createnotes', noteController.createNote);
router.post('/:notename/updatenote', noteController.updateNote);
router.delete('/:notename/deletenote', noteController.deleteNote);

module.exports = router;