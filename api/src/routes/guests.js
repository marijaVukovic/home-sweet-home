const express = require('express');

const router = express.Router();
const guestController = require('../app/api/controllers/guests');
const validateUser = require('../lib/validate-user');

// TODO: add validateUser fot getAll and deleteById
router.get('/', guestController.getAll);
router.post('/', guestController.create);
router.get('/:guestId', validateUser, guestController.getById);
router.put('/:guestId', validateUser, guestController.updateById);
router.put('/:guestId', validateUser, guestController.updateById);
router.delete('/:guestId', guestController.deleteById);

module.exports = router;
