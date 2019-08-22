const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/', function(req, res){
  res.send('admin url 입니당');
});

router.get('/products', function(req, res){
  models.Products.findAll({

  }).then( (products) => {
    // DB에서 받은 products를 products변수명으로 내보냄
    res.render( 'admin/products.html' ,{ products : products });
  });
});

router.get('/products/write', function(req, res){
  res.render('admin/form.html');
});

router.post('/products/write' , (req,res) => {
  models.Products.create({
    name : req.body.name,
    price : req.body.price ,
    description : req.body.description
  }).then( () => {
    res.redirect('/admin/products');
  });
});

module.exports = router;
