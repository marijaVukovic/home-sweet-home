const express = require('express');

const router = express.Router();
const guestController = require('../app/api/controllers/guests');
const validateUser = require('../lib/validate-user');

router.get('/', validateUser, guestController.getAll);
router.post('/', guestController.create);
router.get('/:guestId', validateUser, guestController.getById);
router.put('/:guestId', validateUser, guestController.updateById);
router.delete('/:guestId', validateUser, guestController.deleteById);

module.exports = router;
