let express = require('express');
let port = 2000;
let app = express()
let cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())

let { userauth,dataproduk} = require('./routers')
app.use('/product', dataproduk)
app.use('/user', userauth)
app.get('/', (req, res) => {
    res.send(`<h1>muncul kan</h1>`)
})

app.listen(port, () => console.log(port))