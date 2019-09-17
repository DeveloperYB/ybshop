const { Router } = require('express');
const router = Router();
const ctrl = require('./products.ctrl');

router.get('/:id', ctrl.index);

module.exports = router;
