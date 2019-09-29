const models = require('../../models');
const paginate = require('express-paginate');

exports.get_users = async (req, res) => {
  try {
    const [ users, totalCount ] = await Promise.all([
      models.User.findAll({
        limit: req.query.limit,
        offset: req.offset,
      }),
      models.User.count()
    ]);
    const pageCount = Math.ceil( totalCount / req.query.limit );
    const pages = paginate.getArrayPages(req)( 4, pageCount, req.query.page);
    res.render( 'users/index.html', { users, pages, pageCount });
  } catch (e){
    console.log(e);
  }
};

exports.get_user = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.render( 'users/detail.html',{ user });
  } catch (e){
    console.log(e);
  }
};
