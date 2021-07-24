const axios = require('axios')
const url = require('url')

const obtenerValoresIndicadores = async () => {
    const {data} = await axios.get("https://mindicador.cl/api")
    const dolar = data.dolar.valor
    const euro = data.euro.valor
    const uf = data.uf.valor
    const utm = data.utm.valor
    const valoresIndicadores = {
        dolar: dolar,
        euro: euro,
        uf: uf,
        utm: utm
    }
    // console.log(valoresIndicadores)
    return valoresIndicadores
}

const crearTemplateValores = async(valoresIndicadores) => {
    const valores = await obtenerValoresIndicadores()
    const template = `<p> El valor del dolar el día de hoy es: ${valores.dolar}</p>
    <p>El valor del euro el dia de hoy es: ${valores.euro}</p>
    <p>El valor de la uf el dia de hoy es: ${valores.uf}</p>
    <p>El valor de la utm el dia de hoy es: ${valores.utm}</p>`;
    return template
}

const obtenerParametrosCorreo = (req) => {
    const {correos: stringCorreos, asunto, contenido} = url.parse(req.url, true).query
    const arrayCorreos = stringCorreos.split(',')
    const parametrosCorreo = {
        arrayCorreos,
        asunto,
        contenido
    }
    const promesaSalida = new Promise((resolve, reject) => {
        if ((stringCorreos != "") && (asunto) && (contenido)){
            resolve(parametrosCorreo)
        }
        else{
            reject("No se puede enviar el correo, intente nuevamente")
        }

    });
    return promesaSalida
}

// en rigor, el requerimiento pide una funcion que reciba los input del usuario
// y devuelva una promesa con ellos. Sin embargo, se incluyó esta funcionalidad en 
// la función anterior. Si de todas formas se requiere una función con esas características
// sería la siguiente:

// const promesaParametrosCorreo = (arrayCorreos, asunto, contenido) => {
//     return new Promise((resolve, reject) => {
//         resolve({arrayCorreos, asunto, contenido})
//     })
// }


module.exports = {obtenerValoresIndicadores, crearTemplateValores, obtenerParametrosCorreo}