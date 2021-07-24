const http = require('http')
const nodemailer = require('nodemailer')
const fs = require('fs')
const {obtenerValoresIndicadores, crearTemplateValores, obtenerParametrosCorreo, promesaParametrosCorreo} = require('./index')
const transporter = require('./mailer')
const {v4: uuidv4} = require('uuid')


http
.createServer(async (req, res) => {
    if (req.url == '/'){
        fs.readFile('index.html', (err, data) => {
            if (err) {
                console.error(err)
                res.end()
            }
            if (data){
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'})
                res.end(data)
            }
        })
    }

    if (req.url.startsWith('/mailing')){
        const valoresIndicadores = await obtenerValoresIndicadores()
        const template = await crearTemplateValores(valoresIndicadores)
        
        const parametrosCorreo = obtenerParametrosCorreo(req)
        parametrosCorreo
        .then((resolve) => {
            console.log(resolve)
            transporter.sendMail({
                from: 'nodemailerADL@gmail.com',
                to: resolve.arrayCorreos,
                subject: resolve.asunto,
                html: resolve.contenido + template
            }, (err, data) => {
                if (err){
                    res.writeHead(500, {'Content-type': 'text/html; charset=utf-8'})
                    console.log("error en el envio")
                    res.end("Error en el envío, intente nuevamente...")
                }
                console.log("correo enviado!");
                res.end("correo enviado!")
            });
            fs.writeFile(`correos/correo-${uuidv4().slice(0,6)}.json`, JSON.stringify(resolve), () => console.log('archivo de correo creado!'))

        })
        .catch((reject) => {
            console.error(reject)
            res.end(reject)
        })
    }    
})
.listen(3000, () => console.log('server up in port 3000'))