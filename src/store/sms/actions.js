/*
export function someAction (context) {
}
*/
import { Dialog } from 'quasar'
import axios from 'axios'
// var qs = require('qs');
// qs.stringify({
//     '1': payload.number,
//     '2': payload.message,
//     '3': username,
//     'passwd': passwd
// })
export function sendSMS({commit},payload){
    console.log(payload)
    let username = 'ST-GLOBA248984_P5KHI'
    let passwd = '!$18)bg!tn'

    axios({
        method: 'post',
        // url: 'https://www.itexmo.com/php_api/api.php',
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        url: 'https://global-talpakan-backend.herokuapp.com/itexmo',
        data: {number: payload.number,message: payload.message}
      })
      .then(function (response) {
        if(response.data == 0){    
            console.log('Message Sent')
        } else {
            console.log(response)
            console.log(response.data,'- SMS Service Response')
        }
      })
      .catch(function (error) {

        console.log(error,'- SMS Service Error')
      })
}
