module.exports = {
    getgame: (req, res) => {
        console.log(req.headers)
        console.log('aaa');

        res.status(200).send({token: "berhasil" })
    },
}