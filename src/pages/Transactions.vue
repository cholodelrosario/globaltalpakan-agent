<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <div class="row">
                <div><h5 class="text-primary text-weight-bolder q-mt-none">TRANSACTIONS</h5></div>
                <q-space></q-space>
                <div class="text-white"><q-icon name="account_balance_wallet"  size="sm"/> CREDITS ₱ {{walletObj ? walletObj.creditsAmount : 0}}</div>
            </div>

            <div class="row">
                <q-btn-toggle
                    v-model="selectedFilter"
                    class="my-custom-toggle"
                    no-caps
                    rounded
                    elevated
                    toggle-color="primary"
                    color="dark"
                    text-color="primary"
                    :options="chips"
                />
            </div>
            <br>
            <q-list bordered separator v-for="(p, index) in getData" :key="index" :class="p.from.accountID == user.uid ? 'text-white bg-green-10' : 'text-white bg-grey-10' " dense>
                <br>
                <q-item>
                    <q-item-section caption top>
                        <q-item-label overline class="text-white">P&nbsp;{{p.amount}}</q-item-label>
                        <q-item-label overline class="text-white">{{p.from.accountID == user.uid ? 'Sales' : p.to.accountID == user.uid ? 'Purchases' : ''}}</q-item-label>
                        <q-item-label overline class="text-white">{{p.from.accountID == user.uid ? p.to.accountPhone : p.to.accounID == user.uid ? p.to.accountPhone : p.from.accountPhone || p.from.Phone}}</q-item-label>
                        <q-item-label overline class="text-white">{{p.from.accountID == user.uid ? p.to.accountName :  p.from.accountFirstName + ' ' + p.from.accountLastName}}</q-item-label>
                    </q-item-section>

                    <q-item-section top>
                        <q-item-label overline class="text-white">{{p.timestamp.toDate('MM-DD-YYYY')}}</q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                        <q-btn color="primary" flat icon="mdi-dots-vertical">
                            <q-menu class="flex flex-center" transition-show="scale" transition-hide="scale" >
                                <q-list class="bg-dark text-primary">
                                    <q-item v-if="p.archive == undefined || p.archive == false">
                                        <q-btn @click="archive(p)" flat icon="mdi-archive-arrow-down" color="white"> <q-tooltip> Add To Archive </q-tooltip> </q-btn>
                                    </q-item>
                                    <q-item v-else>
                                        <q-btn @click="archiveRemove(p)" v-close-popup flat icon="mdi-archive-arrow-up" color="white"> <q-tooltip> Remove from Archive </q-tooltip> </q-btn>
                                    </q-item>
                                    <q-item v-show="p.from.accountID === user.uid ">
                                        <q-btn flat icon="mdi-send" @click="sendDialog(p)" color="white"> <q-tooltip> Send Credits </q-tooltip> </q-btn>
                                    </q-item>
                                    <q-item>
                                        <q-btn v-close-popup @click="openDeleteDialog(p)" flat icon="mdi-delete" color="white"> <q-tooltip> Delete </q-tooltip> </q-btn>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                    </q-item-section>
                </q-item>
                <!-- <div>
                    <div :class="p.from.accountID == user.uid ? 'col-12 row bg-green-10 q-pa-sm' : 'col-12 row bg-grey-10 q-pa-sm' ">
                        <div class="row col-8 column q-pt-sm">
                            <div class="col-4 row items-start">
                                <div class="col-2 column">₱&nbsp;{{p.amount}}</div>
                                <div class="col column">{{p.from.accountID == user.uid ? p.to.accountPhone : p.to.accounID == user.uid ? p.to.accountPhone : p.from.accountPhone || p.from.Phone}}</div>
                            </div>
                            <div class="col-4 row items-start">
                                <div class="col-2 column">{{p.from.accountID == user.uid ? 'Sales' : p.to.accountID == user.uid ? 'Purchases' : ''}}</div>
                                <div class="col column">{{p.from.accountID == user.uid ? p.to.accountName :  p.from.accountFirstName + ' ' + p.from.accountLastName}}</div>
                            </div>
                        </div>
                        <div class="row col-3 column" >
                            <div class="col row items-start">
                                <div class="col column">{{p.timestamp.toDate()}}</div>
                            </div>
                        </div>
                        <div>
                            <q-btn color="primary" flat icon="mdi-dots-vertical">
                                <q-menu class="flex flex-center" transition-show="scale" transition-hide="scale" >
                                    <q-list class="bg-dark text-primary">
                                        <q-item v-if="p.archive == undefined || p.archive == false">
                                            <q-btn @click="archive(p)" flat icon="mdi-archive-arrow-down" color="white"> <q-tooltip> Add To Archive </q-tooltip> </q-btn>
                                        </q-item>
                                        <q-item v-else>
                                            <q-btn @click="archiveRemove(p)" v-close-popup flat icon="mdi-archive-arrow-up" color="white"> <q-tooltip> Remove from Archive </q-tooltip> </q-btn>
                                        </q-item>
                                        <q-item v-show="p.from.accountID === user.uid ">
                                            <q-btn flat icon="mdi-send" @click="sendDialog(p)" color="white"> <q-tooltip> Send Credits </q-tooltip> </q-btn>
                                        </q-item>
                                        <q-item>
                                            <q-btn v-close-popup @click="openDeleteDialog(p)" flat icon="mdi-delete" color="white"> <q-tooltip> Delete </q-tooltip> </q-btn>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-btn>
                        </div>
                    </div>
                </div> -->
            </q-list>
            <div class="q-pa-lg flex flex-center">
                <q-pagination
                    v-model="page"
                    :min="currentPage"
                    :max="Math.ceil(this.returnCreditHistory.length/totalPages)"
                    direction-links
                    unelevated
                    color="black"
                    active-color="yellow"
                    active-text-color="black"
                />
            </div>
            <br><br><br>
        </div>
        <q-dialog v-model="send" persistent>
            <q-card class="bg-grey-10 text-white" style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">Enter Amount To Send</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input dense dark v-model="amount" type="number" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Send Credits" @click="sendCredits()" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { firebase,firebaseAuth,firebaseDb } from 'src/boot/firebase'
export default {
    data(){
        return {
            Players: [],
            amount: 0,
            agentObj: null,
            send: false,
            user: this.$store.getters['useraccount/isAuthenticated'],
            page: 1,
            currentPage:1,
            nextPage: null,
            totalPages:10,
            walletObj: null,
            CreditHistory: [],
            Agents: [],
            Wallet: [],
            From: [],
            To: [],
            withdrawAmount: 0,
            outlet: '',
            chips: [
                {label: 'All', value: 'All'},
                {label: 'Visible', value: 'Visible'},
                {label: 'Hidden', value: 'Hidden'},
                {label: 'Sales', value: 'Sales'},
                {label: 'Purchases', value: 'Purchases'},
            ],
            selectedFilter: "All"
        }
    },
    methods:{
        sendCredits(){
            let user = this.$store.getters['useraccount/isAuthenticated']
            let recieverID = this.playerID
            let credits = this.$lodash.filter(this.Wallet, m => {
                    return m['.key'] == recieverID
            })
            console.log(credits, 'credits')
            let currentCredits = credits[0].creditsAmount
            let total = parseFloat(currentCredits) + parseFloat(this.amount)
            var addCreditsBago = {
                creditsAmount: total,
                commisionBalance: this.walletObj.commisionBalance = undefined ? 0 : this.walletObj.commisionBalance
            }
            console.log(addCreditsBago, 'adddddd')
            if(this.amount === '' || this.amount === 0){
                this.$q.dialog({
                    title: 'Field Required!',
                    message: 'Fill all Requirements?',
                    ok: 'Ok',
                    cancel: 'Cancel'
                    })
                }else
                this.$q.dialog({
                    title: 'Send Credits?',
                    message: 'Send This Credits?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                this.$db.collection('Wallet').doc(recieverID).set(addCreditsBago)
                    let user = this.$store.getters['useraccount/isAuthenticated']
                    let usercredits = this.$lodash.filter(this.Wallet, m => {
                            return m['.key'] == user.uid
                    })
                    console.log(usercredits, 'usercredits')
                    let currentUserCredits = usercredits[0].creditsAmount
                    let usertotal = parseFloat(currentUserCredits) - parseFloat(this.amount)
                    var userCreditsBago = {
                        creditsAmount: usertotal,
                        commisionBalance: this.walletObj.commisionBalance = undefined ? 0 : this.walletObj.commisionBalance
                    }
                    console.log(userCreditsBago, 'bago')
                this.$db.collection('Wallet').doc(user.uid).set(userCreditsBago)
                this.recordHistory()
                this.updateLastTransaction()
                this.$q.notify({
                        message: 'Credits Send! Your Transaction Has Been Recorded',
                        icon: 'mdi-update',
                        color: 'positive',
                        textColor: 'white',
                        position: 'center'
                    })
                    this.amount = 0
                    this.send = false  
            })
        },
        recordHistory(){
                let agentID = this.agentObj['.key']
                let receiveID = this.playerID

                let receiverInfo = this.$lodash.filter(this.Players, m => {
                        return m['.key'] == receiveID
                })
                console.log(receiverInfo, 'receivers')
                let reciever = {...receiverInfo[0]}
                let recieverID = reciever['.key']
                delete reciever['.key']
                reciever.accountID = recieverID
                
                let sender = {...this.agentObj}
                delete sender['.key']
                sender.accountID = agentID
                console.log(reciever, 'ID')
                var newHistory = {
                    amount: this.amount,
                    from: sender,
                    to: reciever,
                    timestamp: new Date(),
                }
                console.log(newHistory, 'newHistory')
                this.$db.collection('CreditHistory').add(newHistory)
        },
        async updateLastTransaction(){
            let user = this.$store.getters['useraccount/isAuthenticated']
            try {
                const response = await firebaseDb.collection('Agents').doc(user.uid).update({ lastTransaction: new Date() })
                if(response) { console.log('%c SUCCESS_LAST_TRANSACTION','background: #222; color: #bada55') }
            } catch (error) {
                console.log(error,'error')
                console.log('%c ERROR_LAST_TRANSACTION','background: #D50000; color: #fff')
            }      
        },
        sendDialog (task) {
            console.log(task, 'taskk')
            this.playerID = task.to.accountID
            this.send = true
        },
        archiveRemove(data) {
            this.$q.dialog({
                title: data.archive == true ? `Remove from Archive ??` : ` `,
                type: 'accent',
                color: 'accent',
                textColor: 'white',
                persistent: true,
                icon: 'warning',
                ok: 'Ok'
            }).onOk(()=> {
            data.archive = false
			let key = data['.key']
            let update = {...data}
            delete update['.key']
            this.$db.collection(`CreditHistory`).doc(key).set(update)
				.then(() => {
                this.$q.notify({
                message: 'Transaction Has Successfully Remove from Archive',
                type: 'positive',
                color: 'positive',
                textColor: 'white',
                icon: 'info'
            })
				})
				.catch((err) => {
					this.$q.notify({
                    message: `An error occured`,
                    type: 'negative',
                    color: 'negative',
                    textColor: 'white',
                    icon: 'warning'
                })
					console.log(err)
                })
            })
		},
        archive(data) {
            this.$q.dialog({
                title: data.archive == undefined || data.archive == false ? `Add To Archive ??` : ` `,
                type: 'accent',
                color: 'accent',
                textColor: 'white',
                persistent: true,
                icon: 'warning',
                ok: 'Ok'
            }).onOk(()=> {
            // var status = data.archive == undefined ? true : false
            data.archive = data.archive == undefined || data.archive == false ? true : false
			console.log(data, 'data')
			let key = data['.key']
            let update = {...data}
            delete update['.key']
            this.$db.collection(`CreditHistory`).doc(key).set(update)
				.then(() => {
                this.$q.notify({
                message: 'Transaction Has Successfully Move to Archive',
                type: 'positive',
                color: 'positive',
                textColor: 'white',
                icon: 'info'
            })
				})
				.catch((err) => {
					this.$q.notify({
                    message: `An error occured`,
                    type: 'negative',
                    color: 'negative',
                    textColor: 'white',
                    icon: 'warning'
                })
					console.log(err)
                })
            })
		},
        openDeleteDialog(task) {
          var id = task['.key']
          this.$q.dialog({
            title: 'Delete Transaction',
            message: 'Delete This Transaction?',
            ok: 'Yes',
            cancel: 'Cancel'
            }).onOk(() => { 
                this.$db.collection('CreditHistory').doc(id).delete()
                this.$q.notify({
                        message: 'Transaction Deleted!',
                        icon: 'mdi-delete',
                        color: 'negative',
                        textColor: 'white',
                        position: 'center'
                    })
            })
        },
    },
    computed:{
        allHistory(){
            return [...this.From,...this.To]
        },
        getData(){
			return 	this.returnCreditHistory.slice((this.page-1)*this.totalPages,(this.page-1)*this.totalPages+this.totalPages)
        },
        returnCreditHistory(){
            let user = this.$store.getters['useraccount/isAuthenticated']
            let orderBy = this.$lodash.orderBy(this.allHistory, ['timestamp'], ['desc']);
            if(this.selectedFilter == 'All'){
                let creditTosss = this.$lodash.filter(orderBy, p => {
                    return p.archive !== true || p.archive === undefined
                })
                    return creditTosss
            }else if(this.selectedFilter == 'Sales'){
                let creditHistory = this.$lodash.filter(orderBy, p => {
                    return p.from.accountID === user.uid 
                })
                    return creditHistory
            }else if(this.selectedFilter == 'Purchases'){
                let creditTo = this.$lodash.filter(orderBy, p => {
                    return p.to.accountID === user.uid && p.archive !== true 
                })
                    return creditTo
            }else if(this.selectedFilter == 'Hidden'){
                let creditTos = this.$lodash.filter(orderBy, p => {
                    return p.archive === true 
                })
                    return creditTos
            }else if(this.selectedFilter == 'Visible'){
                let creditToss = this.$lodash.filter(orderBy, p => {
                    return p.archive !== true || p.archive === undefined
                })
                    return creditToss
            }
        }
    },
    mounted(){
        let user = this.$store.getters['useraccount/isAuthenticated']
        console.log(user,'user')
        this.$binding("walletObj", this.$db.collection("Wallet").doc(user.uid))
        .then((wallet) => {
            console.log(wallet,'wallet') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })
        this.$binding("agentObj", this.$db.collection("Agents").doc(user.uid))
        .then((agent) => {
            console.log(agent,'agent') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })
        this.$binding('CreditHistory', this.$db.collection('CreditHistory'))
        .then(CreditHistory => {
          console.log(CreditHistory, 'CreditHistory')
        })
        this.$binding('Agents', this.$db.collection('Agents'))
        .then(Agents => {
          console.log(Agents, 'Agents')
        })
        this.$binding('Wallet', this.$db.collection('Wallet'))
        .then(Wallet => {
          console.log(Wallet, 'Wallet')
        })
        this.$binding('Players', this.$db.collection('Players'))
        .then(Players => {
          console.log(Players, 'Players')
        })
        this.$binding('From', this.$db.collection('CreditHistory').where("from.accountID", "==", user.uid).limit(20))
        .then(From => {
          console.log(From, 'From')
        })
        this.$binding('To', this.$db.collection('CreditHistory').where("to.accountID", "==", user.uid).limit(20))
        .then(To => {
          console.log(To, 'To')
        })
    }
}
</script>
