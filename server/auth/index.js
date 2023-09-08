const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('reached AUTH router');
});

module.exports = router;