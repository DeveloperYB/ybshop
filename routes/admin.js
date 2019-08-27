const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('admin url 입니당');
});

router.get('/products', (req, res) => {
  models.Products.findAll({
    order: [
      ['updatedAt', 'DESC'],
    ],
  }).then( (products) => {
    // DB에서 받은 products를 products변수명으로 내보냄
    res.render( 'admin/products.html' ,{ products });
  });
});

router.get('/products/write', (req, res) => {
  res.render('admin/form.html');
});

router.post('/products/write' , (req,res) => {
  models.Products.create(req.body).then( () => {
    res.redirect('/admin/products');
  });
});

router.get('/products/detail/:id', (req, res) => {
  models.Products.findByPk(req.params.id).then((product) => {
    res.render( 'admin/detail.html' ,{ product });
  });
});

router.get('/products/edit/:id', (req, res) => {
  models.Products.findByPk(req.params.id).then((product) => {
    res.render( 'admin/form.html' ,{ product });
  });
});

router.post('/products/edit/:id', (req, res) => {
  models.Products.update(
    req.body,
    {
      where: {
        id: req.params.id,
      }
    },
  ).then((product) => {
    res.redirect(`/admin/products/detail/${req.params.id}`);
  });
});

router.get('/products/delete/:id', (req, res) => {
  models.Products.destroy({
    where: {
      id: req.params.id,
    }
  }).then(() => {
    res.redirect('/admin/products');
  });
});

module.exports = router;
