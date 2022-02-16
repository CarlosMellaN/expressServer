import CryptoJS from 'crypto-js';

export default function getUrlSeguimiento() {
    let today = new Date();
    today.setHours( today.getHours() /*+ 3*/);//in local after 21:00
    let dd = today.getDate();
    if(dd < 10){
        dd.toString()
        dd = '0' + dd
    }else{
        dd.toString()
    }
    //console.log(dd)
    let mm = (today.getMonth()+1).toString();
    if(mm < 10){
        mm.toString()
        mm = '0' + mm
    }else{
        mm.toString()
    }
    //console.log(mm) //As January is 0.
    let yyyy = today.getFullYear().toString();
    let tokenDate = yyyy+mm+dd
    console.log('fecha token'+tokenDate)
    let tokenString = tokenDate+'@'+process.env.CMNID
    let token = CryptoJS.MD5(tokenString);
    console.log('el token es: '+token)
    /**get token */
    let urlSeguimiento = process.env.URLSEGUIMIENTO+token+process.env.IDCLIENTE
    console.log(urlSeguimiento)
    return urlSeguimiento
}