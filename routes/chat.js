const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { user } = req;
  let displayName = '비회원';
  if (user) displayName = user.displayname;
  res.render('chat/index.html', { displayName });
});

module.exports = router;
