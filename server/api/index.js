const router = require("express").Router();

router.get('/', (req, res) => {
    res.send("<h1>Welcome to BlackJackMiffin API Hub</h1>")
})

router.use('/players', require('./players'));
router.use('/avatars', require('./avatars'))

module.exports = router;