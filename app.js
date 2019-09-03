const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//flash  메시지 관련
const flash = require('connect-flash');

//passport 로그인 관련
const passport = require('passport');
const session = require('express-session');

// db 관련
const db = require('./models');

// DB authentication
db.sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  // return db.sequelize.sync();
  // return db.sequelize.drop();
})
.then(() => {
  console.log('DB Sync complete.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const admin = require('./routes/admin');
const contacts = require('./routes/contacts');
const accounts = require('./routes/accounts');
const auth = require('./routes/auth');

const app = express();
const port = 5000;

nunjucks.configure('template', {
  autoescape: true,
  express: app,
});

// 미들웨어 셋팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 업로드 path 추가
app.use('/uploads', express.static('uploads'));

//session 관련 셋팅
app.use(session({
  secret: 'fastcampus',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2000 * 60 * 60 //지속시간 2시간
  }
}));

//passport 적용
app.use(passport.initialize());
app.use(passport.session());

//플래시 메시지 관련
app.use(flash());

app.get('/', (req, res) => {
  res.send('first app !!');
  // nunjucks.renderString('Hello ');
});

app.use('/admin', admin);
app.use('/contacts', contacts);
app.use('/accounts', accounts);
app.use('/auth', auth);


app.listen(port, () => {
  console.log('Express listening on port', port);
});
