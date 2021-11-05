const { mongodb } = require("../database")
let url = mongodb.url
let db = mongodb.MongoClient

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
                res.status(200).send(result[0][283811].data.name)
            })
        })
    },
template: (req, res) => {
    db.connect(url, (err, cli) => {
        if (err) throw err
        var dbo = cli.db("tomato").collection("product")
        dbo.insertOne({
            nama: `${req.body.nama}`,
            harga: `${req.body.harga}`,
            deskripsi: `${req.body.deskripsi}`,
        },
            function (err, result) {
                if (!req.token) {
                    console.log(req.token);
                    return res.status(401).send("not authorized");
                  }
                if (err) {
                    res.status(500).send(err)
                }
                cli.close()
                res.status(200).send(result)
            })
    })
},
}