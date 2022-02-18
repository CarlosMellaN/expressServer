import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import fetch from 'node-fetch';
import errorEmail from './src/errorEmail.js';
import workingEmail from './src/workingEmail.js';
import getUrlSeguimiento from './src/getUrlSegumiento.js';
import cors from 'cors'
const app = express(); 
const port = process.env.PORT || 3030;
app.use(cors())
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route
//console.log(urlSeguimiento)
let Estado,con_ocnumero
let messageErrorEmail
let messageErrorPage
let order ={}
let errorResponse={}
const getResponseFavatex = async () =>{
    await fetch(getUrlSeguimiento())
    .then((respuesta) =>{
        return respuesta.json()
    })
    .then((resp)=> {
        //console.log(resp)
        if(resp.status==='true'){
            //errorMail(messageErrorEmail);
            con_ocnumero = resp.oc_data[0].con_ocnumero
            Estado = resp.oc_data[0].Estado
            console.log(con_ocnumero)
            console.log(Estado)
            //console.log(resp)
            order ={
                Estado: Estado,
                con_ocnumero: con_ocnumero,
                server:'1'
            }
            //console.log(resp)
            app.get("/", (req, res)=> { 
                res.json(order)
                //res.set('Access-Control-Allow-Origin', origin);
                //res.send('<html><body><h1>funcionando</h1></body></html>')
                let dd = new Date();
                let minutesView = dd.getMinutes();
                let hoursView = dd.getHours();
                //console.log(resp)
                console.log('hora del servidor: '+(hoursView.toString() +':'+minutesView.toString()))
            }); 
        }else{
            errorResponse={
                error: resp,
                server: '0'
            }
            app.get("/", (req, res)=> { 
                res.send(errorResponse)
                //res.send('<html><body><h1>Error</h1></body></html>')
                //res.render("error",{messageErrorPage: JSON.stringify(resp)});
                console.log('error else')
            }); 
            console.log(resp)
            messageErrorEmail = JSON.stringify(resp)
            errorEmail(messageErrorEmail);
        }
        resp.status='false'
    })
    .catch(error=>{
        errorResponse={
            error: error,
            server: '0'
        }
        app.get('/', (req, res) =>{
            res.send(errorResponse)
            //res.render("error",{messageErrorPage: error});
            console.log('error catch')
            //res.redirect('/error')
        }); 
        //console.log(error)
        messageErrorEmail = error
        errorEmail(messageErrorEmail);
    })
}
function funcInterval(){
    var d = new Date();
    var minutes = d.getMinutes();
    var hours = d.getHours();
    getResponseFavatex()//execute
    //console.log(hours.toString() +':'+minutes.toString()) 
}
setInterval(funcInterval, 60000 * 5);//one minute is 60000.
clearInterval(funcInterval())

//mail para chequear que funciona el monitor
function functionWorkingMail(){
    var d = new Date();
    var minutes = d.getMinutes();
    var hours = d.getHours();
    workingEmail()
    //console.log('hora de email funcionando '+hours.toString() +':'+minutes.toString()) 
}
setInterval(functionWorkingMail, 60000 * 1440);//one minute is 60000.
clearInterval(functionWorkingMail())