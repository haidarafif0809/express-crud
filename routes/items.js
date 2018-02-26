const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
  let page = req.query.page || 1;
  let offset = 0;
  if (page > 1) {
     offset = ((page - 1) * 10)  + 1;
  }
  models.Item.findAndCountAll({
    limit : 10,
    offset: offset,
    order : [['id','DESC']],
    include: [{ model: models.Supplier}]
  }).then((items) => {
    // res.send(items);
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus};
    const totalPage = Math.ceil(items.count / 10);
    const pagination = {totalPage : totalPage, currentPage: page};
    res.render('items/index',{
      items: items.rows,
      alert: alert,
      pagination: pagination
    });
  });
});

router.get('/create', (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus};
  let data = {
    name: req.flash('name'),
    kota: req.flash('kota'),
  };
  res.render('items/create',{
    alert: alert,
    data: data
  });
});
router.post('/create', (req, res) => {
  models.Item.build(req.body).save().then(() => {
    req.flash('alertMessage','Success Add New Item');
    req.flash('alertStatus', 'success');
    res.redirect('/items');
  }).catch((err) => {
    req.flash('alertMessage', err.message);
    req.flash('alertStatus', 'danger');
    req.flash('name',req.body.name);
    req.flash('kota',req.body.kota);
    res.redirect('/items/create');

  });

});
router.get('/:id/edit', (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus};

  const id = req.params.id;
  models.Item.findById(id).then((item) => {
    res.render('items/edit',{
      alert: alert,
      item: item
    });
  });
});

router.post('/:id/edit', (req, res) => {

  const id = req.params.id;
  models.Item.findById(id).then((item) => {
    return item.update(req.body);
  }).then(() => {
    req.flash('alertMessage', `Success Update Item With Id : ${id}`);
    req.flash('alertStatus', 'success');
    res.redirect('/items');
  }).catch((err) => {
    req.flash('alertMessage', err.message);
    req.flash('alertStatus', 'danger');
    res.redirect(`/items/${id}/edit`);
  })
});
router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  models.Item.findById(id).then((item) => {
    return item.destroy();
  }).then(() => {
    req.flash('alertMessage', `Success Delete Item With Id : ${id}`);
    req.flash('alertStatus', 'success');
    res.redirect('/items');

  }).catch((err) => {
    req.flash('alertMessage', err.message);
    req.flash('alertStatus', 'danger');
    res.redirect('/items');

  })

});
module.exports = router;
