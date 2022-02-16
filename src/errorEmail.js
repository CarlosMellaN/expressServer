import nodemailer from 'nodemailer'
import os from 'os'

export default function errorEmail(messageErrorEmail) {
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
        to: 'carlosmellaneira@gmail.com',
        subject: 'Problemas con la integracion',
        text: 'La integración se cayó, '+ messageErrorEmail + '\n Servidor: ' + os.hostname,
        /*attachments: [{
            filename: 'the-server-is-up-aaand-its-down-again.jpg',
            //path: '${__dirname}/../public/images/the-server-is-up-aaand-its-down-again.jpg',
            cid: 'the-server-is-up-aaand-its-down-again' //same cid value as in the html img src
        }]*/
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            //send(500, err.message);
        } else {
            console.log("Email error enviado");
            //status(200).jsonp(req.body);
        }
    });
}
