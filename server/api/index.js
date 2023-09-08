const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('reached API router');
});

// router.use('/game', require('./game.js'));



router.use('/players', require('./players'));


module.exports = router;