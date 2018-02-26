const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Express MiniPos');

});
module.exports = router;
