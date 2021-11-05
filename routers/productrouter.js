let express = require('express')
let router = express()

let { dataproduk } = require('../controllers')

router.get('/tes', dataproduk.getgame)
router.post('/create', dataproduk.template)

router.get('/', function (req, res) {
    res.send('hello world')
  })

module.exports = router