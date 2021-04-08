import { firebase,firebaseAuth,firebaseDb } from 'src/boot/firebase'
import { Dialog } from 'quasar'

export async function creditWallet ({rootState},payload) {

    const dashboardUser = rootState.useraccount.dashboardUser
    const uid = dashboardUser.uid
    const account = dashboardUser.account
    // payload structure
    // downlineID, to(account), credits 
    Dialog.create({
        title: `Do you confirm this credit sending transaction?`,
        message: `SEND ${payload.credits} CREDITS to ${payload.to.accountPhone} - ${payload.to.accountName}`,
        type: 'warning',
        color: 'primary',
        textColor: 'white',
        icon: 'warning',
        ok: 'YES',
        dark: true,
        cancel: {
            color: 'grey',
            flat: true,
        }
        
    }).onOk(async ()=>{
        await subtractCredits(payload.credits,uid)
        .then(async ()=>{
            await addCredits(payload.credits,payload.downlineID)
            .then(async ()=>{
                await recordHistory(payload.to,account,payload.credits)
                .then(async ()=>{
                    await updateLastTransaction(payload.downlineID)
                    Dialog.create({
                        title: `Sending Credits Successful !`,
                        message: `${payload.credits} CREDITS to ${payload.to.accountPhone} - ${payload.to.accountName}`,
                        type: 'info',
                        color: 'primary',
                        textColor: 'white',
                        icon: 'info',
                        ok: 'close',
                        dark: true,
                    })
                })
            })
        })
    })

    
}


async function subtractCredits(credits,uid){
    try {
        const decrement = firebase.firestore.FieldValue.increment(-credits);
        const response = await firebaseDb.collection('Wallet').doc(uid).update({ creditsAmount: decrement });
        if(response) { console.log('%c SUCCESS_CREDITS_SUB','background: #222; color: #bada55') }
    } catch (error) {
        console.log(error,'error')
        console.log('%c ERROR_CREDITS_SUB','background: #D50000; color: #fff')
    }   
}

async function addCredits(credits,downlineID){
    try {
        const increment = firebase.firestore.FieldValue.increment(credits);
        const response = await firebaseDb.collection('Wallet').doc(downlineID).update({ creditsAmount: increment });
        if(response) { console.log('%c SUCCESS_CREDITS_ADD','background: #222; color: #bada55') }
    } catch (error) {
        console.log(error,'error')
        console.log('%c ERROR_CREDITS_ADD','background: #D50000; color: #fff')
    }   
}

async function recordHistory(to,from,amount){
    try {
        let reciever = {...to}
        let recieverID = reciever['.key']
        delete reciever['.key']
        reciever.accountID = recieverID

        let sender = {...from}
        let senderID = sender['.key']
        delete sender['.key']
        sender.accountID = senderID

        const response = await firebaseDb.collection('CreditHistory').add({to:reciever,from:sender,amount:amount,timestamp: new Date()})
        if(response) { console.log('%c SUCCESS_CREDITS_HISTORY','background: #222; color: #bada55') }
    } catch (error) {
        console.log(error,'error')
        console.log('%c ERROR_CREDITS_HISTORY','background: #D50000; color: #fff')
    }      
}

async function updateLastTransaction(downlineID){
    try {
        const response = await firebaseDb.collection('Players').doc(downlineID).update({ lastTransaction: new Date() })
        if(response) { console.log('%c SUCCESS_LAST_TRANSACTION','background: #222; color: #bada55') }
    } catch (error) {
        console.log(error,'error')
        console.log('%c ERROR_LAST_TRANSACTION','background: #D50000; color: #fff')
    }      
}