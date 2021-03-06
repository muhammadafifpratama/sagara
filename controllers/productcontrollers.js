const { mongodb } = require("../database")
let url = mongodb.url
let db = mongodb.MongoClient
const jwt_decode = require("jwt-decode")
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7Il9pZCI6IjYxODUxYzg2N2Y2MjdjZTFmNWM3ZmI3NSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6Imd1YXBsZWlAZ21haWwuY29tIiwicGFzc3dvcmQiOiJlNGIwMDE0YTk0YzdiNzFlNDFmMzBmMThiMDkzOThkOTMyODlkMDUwYjU1NzAwZTUzOGY3OGQ0YzBiN2U4OTcwIiwicm9sZSI6InVzZXIiLCJzYWxkbyI6IjUwMDAwMCIsInN0YXR1cyI6InVudmVyaWZpZWQiLCJ0YW5nZ2FsIjoiMjAyMS0xMS0wNVQxMTo1OTowMi40NDJaIn1dLCJpYXQiOjE2MzYxMjI4NjAsImV4cCI6MTYzNjEyNjQ2MH0.ZplOjjXfdCBNtzj2TGlXgQqYMNq5WkDBaoqySd9k7yE"

module.exports = {
    getgame: (req, res) => {
        db.connect(url, (err, client) => {
            if (err) throw err;
            var dbo = client.db("tugasakhir").collection("tampung")
            dbo.find().toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                client.close();
                console.log(JSON.stringify(req.headers.auth));
                var decoded = jwt_decode(token);
                res.status(200).send(decoded)
            })
        })
    },
    create: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("product")
            if (!req.headers.auth) {
                console.log(req.headers.auth);
                return res.status(401).send("not authorized");
            }
            else {
                var decoded = jwt_decode(req.headers.auth)
                console.log(decoded);
            }
            dbo.insertOne({
                nama: `${req.body.nama}`,
                harga: `${req.body.harga}`,
                deskripsi: `${req.body.deskripsi}`,
                created_by: `${decoded.result[0].username}`
            },
                function (err, result) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    cli.close()
                    res.status(200).send(result)
                })
        })
    },
    read: (req, res) => {
        db.connect(url, (err, client) => {
            if (err) throw err;
            var dbo = client.db("tomato").collection("product")
            if (!req.headers.auth) {
                console.log(req.headers.auth);
                return res.status(401).send("not authorized");
            }
            else {
                var decoded = jwt_decode(req.headers.auth)
                console.log(decoded.result[0].username);
            }
            dbo.find().toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                client.close();
                res.status(200).send(result)
            })
        })
    },
    update: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("product")
            if (!req.headers.auth) {
                console.log(req.headers.auth);
                return res.status(401).send("not authorized");
            }
            else {
                var decoded = jwt_decode(req.headers.auth)
                console.log(decoded);
            }
            const query = { "nama": `${req.body.nama}` }
            const replacement = {
                nama: `${req.body.nama}`,
                harga: `${req.body.harga}`,
                deskripsi: `${req.body.deskripsi}`,
                updated_by: `${decoded.result[0].username}`
            };
            const options = { "returnNewDocument": false };
            dbo.findOneAndReplace(query, replacement, options,
                function (err, result) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    cli.close()
                    res.status(200).send(result)
                })
        })
    },
    delete: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("product")
            if (!req.headers.auth) {
                console.log(req.headers.auth);
                return res.status(401).send("not authorized");
            }
            else {
                var decoded = jwt_decode(req.headers.auth)
                console.log(decoded);
            }
            dbo.deleteOne({
                nama: `${req.body.nama}`,
                harga: `${req.body.harga}`,
                deskripsi: `${req.body.deskripsi}`,
            },
                function (err, result) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    cli.close()
                    res.status(200).send(result)
                })
        })
    },
}