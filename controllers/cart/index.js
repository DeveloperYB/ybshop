const { Router } = require('express');
const router = Router();
const ctrl = require('./cart.ctrl');
const loginRequired = require('../../middleware/loginRequired');

router.get('/', loginRequired, ctrl.index);

module.exports = router;
