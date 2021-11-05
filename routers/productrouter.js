let express = require('express')
let router = express()

let { dataproduk } = require('../controllers')

router.get('/tes', dataproduk.getgame)
router.post('/create', dataproduk.create)
router.get('/read', dataproduk.read)
router.put('/update', dataproduk.update)
router.delete('/delete', dataproduk.delete)

router.get('/', function (req, res) {
    res.send('hello world')
  })

module.exports = router