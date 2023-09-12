const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('reached API router');
});

router.use('/game', require('./game.js'));



router.use('/players', require('./players'));
router.use('/avatars', require('./avatars'));


module.exports = router;