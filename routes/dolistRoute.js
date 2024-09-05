const express = require('express');
const router = express.Router();
const dolistController = require('../controller/dolistController');


router.get('/:dolistName', dolistController.gettodo);

// POST: Add a new todo to a specific collection
router.post('/:dolistName/add-todo', dolistController.addtodo);

// PUT: Update a specific todo in a specific collection
router.put('/:dolistName/update-todo/:id', dolistController.updatetodo);

// DELETE: Delete a specific todo from a specific collection
router.delete('/:dolistName/delete-todo/:id', dolistController.deletetodo);

module.exports = router;
