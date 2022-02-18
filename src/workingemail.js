import nodemailer from 'nodemailer'
import os from 'os'

export default function workingEmail() {
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.PASS_MAIL
        }
    });
    // Definimos el email
    var mailOptions = {
        from: process.env.USER_MAIL,
        to: 'aaburto@favatex.com,victorino.rodriguez@itsecurity.cl,lsantana@favatex.com,jmercado@favatex.com',
        subject: 'Integracion funcionando',
        text: 'Integracion funcionando correctamente,  servidor: ' + os.hostname
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            //send(500, err.message);
        } else {
            console.log("Email funcionando enviado");
            //status(200).jsonp(req.body);
        }
    });
}
