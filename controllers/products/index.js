const { Router } = require('express');
const router = Router();
const ctrl = require('./products.ctrl');
const loginRequired = require('../../middleware/loginRequired');

router.get('/:id', ctrl.index);

router.post('/like/:product_id(\\d+)', loginRequired, ctrl.likes);

module.exports = router;
