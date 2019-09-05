const express = require('express');
const router = express.Router();
const models = require('../models');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('../helpers/passwordHash');

passport.serializeUser(  (user, done) => {
  console.log('serializeUser');
  done(null, user);
});

passport.deserializeUser(  (user, done) => {
  console.log('deserializeUser');
  done(null, user);
});

passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField : 'password',
    passReqToCallback : true
  },
  async (req, username, password, done) => {
    // 아이디 조회
    const isExistedUsername = await models.User.findOne({
      where: {
        username,
      },
      // attributes: { exclude: ['password'] }
    });
    if (!isExistedUsername) {
      return done(null, false, { message: '일치하는 아이디가 존재하지 않습니다.' });
    }
    // 조회
    const user = await models.User.findOne({
      where: {
        username,
        password : passwordHash(password),
      },
      attributes: { exclude: ['password'] }
    });
    // 유저에서 조회되지 않을시
    if(!user){
      return done(null, false, { message: '패스워드가 일치하지 않습니다.' });
    // 유저에서 조회 되면 세션등록쪽으로 데이터를 넘김
    }else{
      return done(null, user.dataValues );
    }
  }
));

router.get('/', ( _ , res) => {
  res.send('account app');
});

router.get('/join', ( req , res) => {
  res.render('accounts/join.html', { flashMessage : req.flash().error });
});

router.post('/join', async(req, res) => {
  const { username } = req.body;
  try {
    // TODO: findOne vs Count 퍼포먼스 차이 비교하기
    const existedName = await models.User.count({
      where: {
        username,
      },
    });
    if (existedName >= 1) {
      req.flash('error', '중복된 아이디가 있습니다.');
      res.redirect('/accounts/join');
      return;
    }
    await models.User.create(req.body);
    res.send(
      `<script>
        alert("회원가입 성공");
        location.href="/accounts/login";
      </script>`
    );
  } catch (e){
    console.log(e);
  }
});

router.get('/login', ( req , res) => {
  res.render('accounts/login.html', { flashMessage : req.flash().error });
});

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/accounts/login',
    failureFlash: true,
  }),
  (_, res) => {
    res.send(
      `<script>
        alert("로그인 성공");
        location.href="/";
      </script>`
    );
  }
);

module.exports = router;
