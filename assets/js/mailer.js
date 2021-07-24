const nodemailer = require('nodemailer')

const transporterOptions = {
    service: 'gmail',
    auth:{
        user: 'nodemailerADL@gmail.com',
        pass: 'desafiolatam'
    }
}
const transporter = nodemailer.createTransport(transporterOptions)

module.exports = transporter