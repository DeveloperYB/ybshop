const { Router } = require('express');
const router = Router();
const ctrl = require('./users.ctrl');
const paginate = require('express-paginate');
const adminRequired = require('../../middleware/adminRequired');

router.get('/', adminRequired, paginate.middleware(3, 50), ctrl.get_users);
router.get('/detail/:id', adminRequired, ctrl.get_user_detail);
router.get('/wishlist/:id', adminRequired, ctrl.get_user_wishlist);

module.exports = router;
