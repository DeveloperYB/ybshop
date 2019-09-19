const models = require('../../models');

exports.get_join = (req, res) => {
  res.render('accounts/join.html', { flashMessage : req.flash().error });
};

exports.post_join = async(req, res) => {
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
};

exports.get_login = (req, res) => {
  res.render('accounts/login.html', { flashMessage : req.flash().error });
};

exports.post_login = (req, res) => {
  res.send(
    `<script>
      alert("로그인 성공");
      location.href="/";
    </script>`
  );
};

exports.get_logout = (req, res) => {
  req.logout();
  res.send(
    `<script>
      location.href="/accounts/login";
    </script>`
  );
};
