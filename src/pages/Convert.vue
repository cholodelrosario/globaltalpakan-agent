<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <h5 class="text-primary text-weight-bolder q-mt-none">Convert Commision</h5>

        <div class="text-white q-mt-xl">COMMISION BALANCE: <br>
        <span class="text-primary text-h4">₱ {{walletObj.commisionBalance === undefined || walletObj.commisionBalance === null ? 0 : walletObj.commisionBalance}}</span>
        </div>
        <br>
        <div class="row ">
            <q-input v-model="convertAmount" type="number" color="dark" label="Amount to Convert" dark standout class="text-capitalize col"/>
            <q-btn color="grey-8" class="col-3 q-ml-md" label="all" @click="allCredits()" />
        </div>
        
        <br>
        <q-select standout dark v-model="convertMethod" :options="options" label="Convert to" />
        <br>
        <q-input v-model="notes" type="textarea" color="dark" label="Notes" dark standout class="text-capitalize"/>
        <q-btn color="primary" @click="convertCommission()" class="text-black q-mt-md full-width" label="Submit Request" />

      </div>
  </q-page>
</template>

<script>
import { firebase,firebaseAuth,firebaseDb } from 'src/boot/firebase'
export default {
    data(){
        return {
            walletObj: null,
            convertAmount: 0,
            convertMethod: '',
            notes: '',
            options: [
                'Credits',
                // 'Debit'
            ]
        }
    },
    methods: {
        convertCommission(){
            let user = this.$store.getters['useraccount/isAuthenticated']
            // console.log(user,'user')
            let userID = user.uid
            let currentCommissions = this.walletObj.commisionBalance
            // console.log(currentCommissions, 'current')
            let total = parseFloat(currentCommissions) - parseFloat(this.convertAmount)
            var updateCommission = {
                creditsAmount: this.walletObj.creditsAmount,
                commisionBalance: total
            }
            // console.log(updateCommission, 'updateCommission')
            let sender = {...this.agentObj}
            // console.log(sender, 'ID')
            var sendToConvertion = {
                amount: this.convertAmount,
                agentKey: userID,
                from: sender,
                to: 'Administrator',
                timestamp: new Date(),
                status: false,
                note: this.notes,
                approveDate: new Date()
            }
            // console.log(sendToConvertion, 'sendToConvertion')
            if(this.convertAmount === '' || this.convertAmount < 500 || this.convertAmount > this.walletObj.commisionBalance || this.convertMethod === ''){
                this.$q.dialog({
                    title: this.convertAmount === 0 ?  'Enter Amount to Convert?' : this.convertAmount < 500 ? 'Enter Right Amount' : this.convertAmount > this.walletObj.commisionBalance ? 'Enter Right Amount' : this.convertMethod === '' ? 'Select Convertion Type' : 'Withdraw Commission?',
                    message: this.convertAmount === 0 ?  'Enter Amount to Convert?' : this.convertAmount < 500 ? 'Min. Convertion Amount is 500' : this.convertAmount > this.walletObj.commisionBalance ? 'Insufficient Commission' : this.convertMethod === '' ? 'Select Convertion Type' : 'Withdraw Commission?',
                    ok: 'Ok',
                    cancel: 'Cancel'
                    })
                }else
                this.$q.dialog({
                    title: 'Convert This Commission',
                    message: 'Convert Commission??',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                this.$db.collection('Wallet').doc(userID).set(updateCommission)
                this.$db.collection('AgentConvertion').add(sendToConvertion)
                this.recordHistory()
                this.updateLastTransaction()
                this.$q.notify({
                        title: 'Convertion Request Sent! ',
                        message: 'Please Wait for Administrator Approval',
                        icon: 'mdi-update',
                        color: 'positive',
                        textColor: 'white',
                        position: 'center'
                    })
                    this.convertAmount = 0
                    this.convertMethod = ''  
                    this.notes = ''
            })
        },
        recordHistory(){
                let sender = {...this.agentObj}
                // console.log(sender, 'ID')
                var newHistory = {
                    amount: this.convertAmount,
                    from: sender,
                    to: 'Administrator',
                    timestamp: new Date(),
                }
                // console.log(newHistory, 'newHistory')
                this.$db.collection('ConvertionHistory').add(newHistory)
        },
        async updateLastTransaction(){
            try {
                let agentID = this.agentObj['.key']
                const response = await firebaseDb.collection('Agents').doc(agentID).update({ lastTransaction: new Date() })
                // if(response) { console.log('%c SUCCESS_LAST_TRANSACTION','background: #222; color: #bada55') }
            } catch (error) {
                // console.log(error,'error')
                // console.log('%c ERROR_LAST_TRANSACTION','background: #D50000; color: #fff')
            }      
        },
        allCredits(){
            this.convertAmount = this.walletObj.commisionBalance
        }
    },
    mounted(){
        let user = this.$store.getters['useraccount/isAuthenticated']
        // console.log(user,'user')
        this.$binding("walletObj", this.$db.collection("Wallet").doc(user.uid))
        .then((wallet) => {
            // console.log(wallet,'wallet') // => __ob__: Observer
        }).catch(err => {
            // console.error(err)
        })
        this.$binding("agentObj", this.$db.collection("Agents").doc(user.uid))
        .then((agents) => {
            // console.log(agents,'agents') // => __ob__: Observer
        }).catch(err => {
            // console.error(err)
        })
    }
}
</script>
