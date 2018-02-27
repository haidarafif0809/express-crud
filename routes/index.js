const router = require('express').Router();
const models = require('../models');
const Op = require('sequelize').Op

router.get('/', (req, res) => {
  res.render('main/index');

});

router.get('/search', (req, res) => {
  let name = req.query.name || '';
  let maxPrice = req.query.maxPrice || 0;
  let minPrice = req.query.minPrice || 0;
  models.SupplierItem.all({
    where: {
      price: {
        [Op.between]: [Number(minPrice), Number(maxPrice)]
      }
    },
    include: [{
      model: models.Item,
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    },{
      model: models.Supplier
    }]
  }).then((items) => {
    // res.send(items)  ;
    res.render('main/search',{items: items});
  })

});
module.exports = router;
