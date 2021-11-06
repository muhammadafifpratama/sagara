let express = require('express')
let router = express()

let { userauth } = require('../controllers')

router.post('/register', userauth.register)
router.get('/login', userauth.login)

router.get('/', function (req, res) {
    res.send('hello world')
  })

module.exports = router