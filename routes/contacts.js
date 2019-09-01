const express = require('express');
const router = express.Router();
const models = require('../models');

// csrf 셋팅
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

//이미지 저장되는 위치 설정
const path = require('path');
const uploadDir = path.join( __dirname , '../uploads' ); // 루트의 uploads위치에 저장한다.
const fs = require('fs');

//multer 셋팅
const multer  = require('multer');
const storage = multer.diskStorage({
  destination :  (req, file, callback) => { //이미지가 저장되는 도착지 지정
    callback(null, uploadDir);
  },
  filename :  (req, file, callback) => { // contacts-날짜.jpg(png) 저장
    callback(null, 'contacts-' + Date.now() + '.'+ file.mimetype.split('/')[1] );
  }
});
const upload = multer({ storage });

router.get('/', (req, res) => {
  res.send('contacts url 입니당');
});

router.get('/list', async (req, res) => {
  const contacts = await models.Contacts.findAll({
    order: [
      ['updatedAt', 'DESC'],
    ],
  });
  res.render('contacts/list.html' ,{ contacts });
});

router.get('/write', csrfProtection, (req, res) => {
  res.render('contacts/form.html', { csrfToken: req.csrfToken() });
});

router.post('/write', upload.single('thumbnail'), csrfProtection, async (req,res) => {
  try {
    req.body.thumbnail = (req.file) ? req.file.filename : '';
    await models.Contacts.create(req.body);
    res.redirect('/contacts/list');
  } catch (e){
    console.log(e);
  }
});

router.get('/edit/:id', csrfProtection, async (req, res) => {
  try {
    const contact = await models.Contacts.findByPk(req.params.id);
    res.render('contacts/form.html' ,{ contact, csrfToken: req.csrfToken() });
  } catch (e){
    console.log(e);
  }
});

router.post('/edit/:id', upload.single('thumbnail'), async (req, res) => {
  try {
    // 이전에 저장되어있는 파일명을 받아오기 위함
    const contact = await models.Contacts.findByPk(req.params.id);

    if (req.file && contact.thumbnail) { //요청중에 파일이 존재 할시 이전이미지 지운다.
      fs.unlinkSync( uploadDir + '/' + contact.thumbnail );
    }

    // 파일요청이면 파일명을 담고 아니면 이전 DB에서 가져온다
    req.body.thumbnail = (req.file) ? req.file.filename : contact.thumbnail;

    await models.Contacts.update(
      req.body,
      {
        where: { id: req.params.id },
      },
    );
    res.redirect('/contacts/detail/' + req.params.id );
  } catch(e){
    console.log(e);
  }
});

router.get('/delete/:id', async (req, res) => {
  await models.Contacts.destroy({
    where: {
      id: req.params.id,
    }
  });
  res.redirect('/contacts/list');
});

router.get('/detail/:id', async (req, res) => {
  try {
    const contact = await models.Contacts.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        'Memo',
      ],
    });
    res.render('contacts/detail.html' ,{ contact });
  } catch (e){
  }
});

router.post('/detail/:id' , async(req, res) => {
  try {
    const contact = await models.Contacts.findByPk(req.params.id);
    // create + as에 적은 내용 ( Contacts.js association 에서 적은 내용 )
    await contact.createMemo(req.body)
    res.redirect('/contacts/detail/'+req.params.id);
  } catch (e){
    console.log(e);
  }
});

router.get('/delete/:contact_id/:memo_id', async(req, res) => {
  try {
    await models.ProductsMemo.destroy({
      where: {
        id: req.params.memo_id
      }
    });
    res.redirect('/contacts/detail/' + req.params.contact_id );
  } catch (e){
    console.log(e);
  }
});

module.exports = router;
