const { mongodb } = require("../database")
let url = mongodb.url
let db = mongodb.MongoClient
const { createJWTToken } = require('../helpers/jwt')
const { transporter } = require('../helpers/mailer')
const crypto = require('crypto')
const secret = 'sagara';

module.exports = {

    register: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            req.body.password = crypto.createHmac('sha256', secret)
                .update(req.body.password)
                .digest('hex'); 1
            var date = new Date()
            var dbo = cli.db("tomato").collection("counters")
            dbo.find({ username: `${req.body.username}` }).toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                if (result.length > 0) {
                    return res.status(500).send({ message: 'username already exist' })
                }
                else {
                    dbo.insertOne({
                        username: `${req.body.username}`,
                        email: `${req.body.email}`,
                        password: `${req.body.password}`,
                        role: "user",
                        status: "unverified",
                        registration_date: date
                    },
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err)
                            }
                            cli.close()
                            var mailOption = {
                                from: "Toko",
                                to: req.body.email,
                                subject: "Email Confirmation",
                                html: `Verified your email by clicking this link  
                        <a href="https://muhammadafifpratama-newfinalproject.glitch.me/">Verified</a>`
                            }
                            transporter.sendMail(mailOption, (err, results) => {
                                if (err) {
                                    return res.status(500).send({ message: 'Kirim Email Confirmation Gagal! silahkan cek kembali', err, error: false, email: req.body.email })
                                }
                                res.status(200).send({ status: 'Kirim Email Confirmation berhasil! ', result: results, email: req.body.email })
                            })
                        })
                }
            })
        })
    },
    login: (req, res) => {
        db.connect(url, (err, cli) => {
            req.body.password = crypto.createHmac('sha256', secret)
                .update(req.body.password)
                .digest('hex');
            if (err) throw err
            var dbo = cli.db("tomato").collection("counters")
            dbo.find({ username: `${req.body.username}`, password: `${req.body.password}` }).toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                if (result.length > 0) {
                    var token = createJWTToken({ result }, { expiresIn: '1h' })
                    return res.status(200).send(token)
                }
                if (result.length === 0) {
                    return res.status(500).send({ message: 'username or password salah' })
                }
                else {
                    cli.close();
                    res.status(200).send(result)
                }
            })
        })
    },
}