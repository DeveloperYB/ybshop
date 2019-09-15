const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const NaverStrategy = require('passport-naver').Strategy;

const passwordHash = require('../helpers/passwordHash');
const models = require('../models');

const dotenv = require('dotenv');
dotenv.config(); // LOAD CONFIG

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
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
    if (!user){
      return done(null, false, { message: '패스워드가 일치하지 않습니다.' });
    // 유저에서 조회 되면 세션등록쪽으로 데이터를 넘김
    } else {
      return done(null, user.dataValues );
    }
  }
));

passport.use(new FacebookStrategy({
    // https://developers.facebook.com에서 appId 및 scretID 발급
    clientID: process.env.FACEBOOK_APPID , //입력하세요
    clientSecret: process.env.FACEBOOK_SECRETCODE , //입력하세요.
    callbackURL: `${process.env.SITE_DOMAIN_HTTPS}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email'] //받고 싶은 필드 나열
  },
  async (accessToken, refreshToken, profile, done) => {
    // 아래 하나씩 찍어보면서 데이터를 참고해주세요.
    // console.log(accessToken);
    // console.log(profile);
    // console.log(profile.displayName);
    // console.log(profile.emails[0].value);
    // console.log(profile._raw);
    // console.log(profile._json);
    try{
      const username =`fb_${profile.id}`;
      // 존재하는지 체크
      const exist = await models.User.count({
        where: {
          // 아이디로 조회를 해봅니다.
          username,
        }
      });
      if (!exist){
        // 존재하면 바로 세션에 등록
        user = await models.User.create({
          username,
          displayname: profile.displayName,
          password: 'facebook',
        });
      } else {
        user = await models.User.findOne({
          where: {
            username,
          }
        });
      }
      return done(null, user);
    }catch(e){
      console.log(e);
    }
  }
));

passport.use(new NaverStrategy({
    clientID: process.env.NAVER_APPID,
    clientSecret: process.env.NAVER_SECRETCODE,
    callbackURL: `${process.env.SITE_DOMAIN_HTTP}/auth/naver/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    //아래 하나씩 찍어보면서 데이터를 참고해주세요.
    // console.log(profile);
    try{
      const username =`naver_${profile.id}`;
      // 존재하는지 체크
      const exist = await models.User.count({
        where: {
          // 아이디로 조회를 해봅니다.
          username,
        }
      });
      if (!exist){
        // 존재하면 바로 세션에 등록
        user = await models.User.create({
          username,
          displayname: profile.displayName,
          password: "naver"
        });
      } else {
        user = await models.User.findOne({
          where: {
            username
          }
        });
      }
      return done(null, user);
    }catch(e){
      console.log(e);
    }
  },
));

module.exports = passport;
