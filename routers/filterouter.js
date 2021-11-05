let express = require('express')
let router = express()

let { filter } = require('../controllers')

router.get('/tes', filter.getgame)
// router.get('/murah', filter.gamemurah)
// router.get('/mahal', filter.gamemahal)
// router.get('/tipe', filter.notgame)
// router.get('/game/:id', filter.detailgame)
// router.post('/cart', filter.insert)
// router.get('/cart/:username', filter.select)
// router.delete('/cart', filter.apus)

router.get('/', function (req, res) {
    res.send('hello world')
  })

module.exports = router