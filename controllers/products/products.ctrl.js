const models = require('../../models');

exports.index = async(req, res) => {
  try {
    const user = req.user;
    const product = await models.Products.findByPk(req.params.id);
    res.render('products/detail.html', { product, user });
  } catch (e){
    console.error(e);
  }
};

