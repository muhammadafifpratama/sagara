const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'afifpratama@gmail.com',
        pass: 'phhnznextbvamjmv'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = {
    transporter
};