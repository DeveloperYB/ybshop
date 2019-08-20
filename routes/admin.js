const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.send('admin url 입니당');
});

router.get('/products', function(req, res){
  const { pid } = req.query;
  res.send(`상품 ID는 ${pid || '없음'} 입니다.`);
});

module.exports = router;
