const models = require('../../models');

exports.index = async(req, res) => {
  try {
    const user = req.user;
    const product = await models.Products.findOne({
      where: { id: req.params.id},
      include: [
        { model: models.Tag, as: 'Tag' }
      ],
      order: [
        [ 'Tag', 'createdAt', 'desc' ]
      ],
    });
    const userLikes = await require('../../helpers/userLikes')(req);
    res.render('products/detail.html', { product, user, userLikes });
  } catch (e){
    console.error(e);
  }
};

exports.likes = async (req, res) => {
  try {
    const product = await models.Products.findByPk(req.params.product_id);
    const user = await models.User.findByPk(req.user.id);
    const status = await user.addLikes(product);
    res.json({
      status
    })
  } catch (e) {
    console.log(e);
  }
};

exports.delete_likes = async (req, res) => {
  try {
    const product = await models.Products.findByPk(req.params.product_id);
    const user = await models.User.findByPk(req.user.id);
    await user.removeLikes(product);
    res.json({
      message: "success"
    });
  } catch (e) {
    console.log(e);
  }
};
