const models = require('../../models');

exports.get_index = (req, res) => {
  res.send(req.user);
};

exports.get_facebook_fail = (req,res) => {
  res.send('facebook login fail');
};

exports.get_naver = (req, res) => {
  console.log('/auth/naver failed, stopped');
};

exports.get_naver_callback = (req, res) => {
  res.redirect('/');
};

exports.get_naver_fail = (req,res) => {
  res.send('naver login fail');
};
