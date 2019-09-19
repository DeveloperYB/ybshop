const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');
const paginate = require('express-paginate');

const csrfProtection = require('../../middleware/csrf');
const loginRequired = require('../../middleware/loginRequired');
const upload = require('../../middleware/multer');


router.get('/products', paginate.middleware(3, 50), ctrl.get_products);

router.get('/products/write', loginRequired, csrfProtection, ctrl.get_write);
router.post('/products/write', loginRequired, upload.single('thumbnail'), csrfProtection, ctrl.post_write);

router.get('/products/edit/:id', loginRequired, csrfProtection, ctrl.get_edit);
router.post('/products/edit/:id', loginRequired, upload.single('thumbnail'), ctrl.post_edit);

router.get('/products/delete/:id', loginRequired, ctrl.get_delete);
router.get('/products/delete/:product_id/:memo_id', ctrl.get_delete_memo);

router.get('/products/detail/:id', ctrl.get_detail);
router.post('/products/detail/:id', ctrl.post_detail);

router.post('/products/ajax_summernote', loginRequired, upload.single('thumbnail'), ctrl.post_summernote);

router.get('/order', ctrl.get_order );
router.get('/order/edit/:id', ctrl.get_order_edit );

module.exports = router;
