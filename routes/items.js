const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
  models.Item.all().then((items) => {
    res.send(items);
  });

});
module.exports = router;
