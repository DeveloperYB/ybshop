const { Router } = require('express');
const router = Router();
const ctrl = require('./chat.ctrl');

router.get('/', ctrl.get_chat);

module.exports = router;
