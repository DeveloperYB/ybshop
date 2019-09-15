const { Router } = require('express');
const router = Router();
const ctrl = require('./auth.ctrl');

const passport = require('../../middleware/passport');

router.get('/', ctrl.get_index);

// http://localhost:5000/auth/facebook 접근시 facebook으로 넘길 url 작성해줌
router.get('/facebook', passport.authenticate('facebook', { scope: 'email'}) );

//인증후 페이스북에서 이 주소로 리턴해줌. 상단에 적은 callbackURL과 일치
router.get('/facebook/callback',
  passport.authenticate('facebook',
    {
      successRedirect: '/',
      failureRedirect: '/auth/facebook/fail'
    }
  )
);

router.get('/facebook/fail', ctrl.get_facebook_fail);

// http://localhost:5000/auth/naver 접근시 naver으로 넘길 url 작성해줌
router.get('/naver', passport.authenticate('naver'), ctrl.get_naver);

router.get('/naver/callback', passport.authenticate('naver', {
  failureRedirect: '/auth/naver/fail'
}), ctrl.get_naver_callback);

router.get('/naver/fail', ctrl.get_naver_fail);

module.exports = router;
