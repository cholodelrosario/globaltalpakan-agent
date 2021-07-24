<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <div class="row">
                <q-tabs v-model="tab" class="q-pa-md text-h6" narrow-indicator dense align="justify">
                    <q-tab class="text-primary text-h5 text-weight-bolder" name="agentWithdraw" label="Agent Withdrawals" />
                    <q-tab class="text-primary text-h5 text-weight-bolder" name="playerWithdraw" label="Players W/drawals Request" />
                </q-tabs>
                <!-- <div><h5 class="text-primary text-weight-bolder q-mt-none">WITHDRAWALS</h5></div> -->
                <q-tab-panels class="bg-dark full-width" v-model="tab" animated>
                    <q-tab-panel name="agentWithdraw">
                        <q-space></q-space>
                        <div class="text-white q-mt-sm"><q-icon name="account_balance_wallet"  size="sm"/> CREDITS : ₱ {{walletObj ? walletObj.creditsAmount : 0}} </div>
                        <q-input v-model="withdrawAmount"  bottom-slots :error="!isValid" type="number" color="dark" label="Withdraw Amount" dark standout class="text-capitalize">
                            <template v-if="withdrawAmount <= 500" v-slot:error>
                                Min. Withdraw Amount is 500
                            </template>
                            <template v-else-if="withdrawAmount >= walletObj.creditsAmount" v-slot:error>
                                Insufficient Credit
                            </template>
                        </q-input>
                        <br>
                        <q-select standout dark v-model="outlet" :options="options" label="Outlet" />
                        <q-btn color="primary" @click="withdrawCredits()" class="text-black q-mt-md full-width" label="Submit" />
                        <br>

                        <!-- HISTORY -->
                        <div class="q-mt-lg q-pt-sm">
                            <h6 class="text-secondary flex flex-center q-ma-none">WITHDRAW HISTORY</h6>
                            <q-list v-for="(a, index) in this.getData" :key="index"  :class="a.status == false ? 'text-white bg-white-10' : 'text-white bg-green-10'" bordered separator>
                                <!-- <br> -->
                                <q-item>
                                    <q-item-section caption top>
                                        <q-item-label overline class="text-white">P&nbsp;{{a.amount}}</q-item-label>
                                        <q-item-label overline class="text-white">{{a.status == false ? 'Pending' : 'Completed'}}</q-item-label>
                                        <q-item-label overline class="text-white">{{a.to.accountPhone}}</q-item-label>
                                        <q-item-label overline class="text-white">{{a.masterAgentName}}</q-item-label>
                                    </q-item-section>

                                    <q-item-section top>
                                        <q-item-label overline class="text-white">{{a.timestamp.toDate('MM-DD-YYYY')}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <!-- <div class="col-12 row">
                                    <div class="row col-9 column q-pt-sm" >
                                        <div class="col-4q-pa-sm row items-start">
                                            <div class="col-2 column">P&nbsp;{{a.amount}}</div>
                                            <div class="col column">{{a.to.accountPhone}}</div>
                                        </div>
                                        <div class="col-4 row items-start">
                                            <div class="col-2 column">{{a.status == false ? 'Pending' : 'Completed'}}</div>
                                            <div class="col column">{{a.masterAgentName}}</div>
                                        </div>
                                    </div>
                                    <div class="row col column" >
                                        <div class="col-3 row items-start">
                                            <div class="col column">{{a.timestamp.toDate()}}</div>
                                        </div>
                                    </div>
                                </div> -->
                            </q-list>
                            <div class="q-pa-lg flex flex-center">
                                <q-pagination
                                    v-model="page"
                                    :min="currentPage"
                                    :max="Math.ceil(this.agentWithdrawal.length/totalPages)"
                                    direction-links
                                    unelevated
                                    color="black"
                                    active-color="yellow"
                                    active-text-color="black"
                                />
                            </div>
                            <!-- <q-btn outline rounded color="primary" label="See All" class="full-width q-mt-md" v-ripple to="/all-withdrawals"/>  -->
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="playerWithdraw">
                        <div class="q-mt-sm q-pt-sm">
                            <div class="row">
                                <div class="col-xs q-pa-md">
                                    <q-btn-toggle v-model="selectedFilter" no-caps rounded elevated toggle-color="primary" color="dark" text-color="primary" :options="chips" />
                                </div>
                            </div>
                            <!-- <h6 class="text-secondary flex flex-center q-ma-none">WITHDRAW HISTORY</h6> -->
                            <q-list v-for="(p, index) in this.newgetData" :key="index" :class="p.status == false ? 'text-white bg-white-10' : 'text-white bg-green-10'" bordered separator>
                                <!-- <br> -->
                                <q-item>
                                    <q-item-section caption top>
                                        <q-item-label overline class="text-white">P&nbsp;{{p.amount}}</q-item-label>
                                        <q-item-label overline class="text-white">{{p.status == false ? 'Pending' : 'Completed'}}</q-item-label>
                                        <q-item-label overline class="text-white">{{p.from.accountPhone}}</q-item-label>
                                        <q-item-label overline class="text-white">{{p.from.accountName}}</q-item-label>
                                    </q-item-section>

                                    <q-item-section top>
                                        <q-item-label overline class="text-white">{{p.timestamp.toDate('MM-DD-YYYY')}}</q-item-label>
                                    </q-item-section>

                                    <q-item-section side top>
                                        <q-btn v-if="p.status == false" @click="approve(p)" flat round color="primary" icon="mdi-check-bold" >
                                            <q-tooltip>
                                                Approve
                                            </q-tooltip>
                                        </q-btn>
                                        <q-btn v-else v-show="p.archive == undefined || p.archive == false" flat round @click="archive(p)" color="primary" icon="mdi-archive-arrow-down" >
                                            <q-tooltip>
                                                Add to Archive
                                            </q-tooltip>
                                        </q-btn>
                                        <q-btn v-show="p.archive == true" flat round @click="archiveRemove(p)" color="primary" icon="mdi-archive-arrow-up" >
                                            <q-tooltip>
                                                Remove from Archive
                                            </q-tooltip>
                                        </q-btn>
                                    </q-item-section>
                                </q-item>
                                <!-- <div class="col-12 row">
                                    <div class="row col-8 column q-pt-sm" >
                                        <div class="col-4q-pa-sm row items-start">
                                            <div class="col-2 column">P&nbsp;{{p.amount}}</div>
                                            <div class="col column">{{p.to.accountPhone}}</div>
                                        </div>
                                        <div class="col-4 row items-start">
                                            <div class="col-2 column">{{p.status == false ? 'Pending' : 'Completed'}}</div>
                                            <div class="col column">{{p.from.accountName}}</div>
                                        </div>
                                    </div>
                                    <div class="row col-3 column" >
                                        <div class="col row items-start">
                                            <div class="col column">{{p.timestamp.toDate()}}</div>
                                        </div>
                                    </div>
                                    <div v-if="p.status == false" class="row col q-pl-lg column" >
                                        <div class="col-3 row items-start">
                                            <q-btn @click="approve(p)" flat round color="primary" icon="mdi-check-bold" >
                                                <q-tooltip>
                                                    Approve
                                                </q-tooltip>
                                            </q-btn>
                                        </div>
                                    </div>
                                    <div v-else v-show="p.archive == undefined || p.archive == false" class="row col q-pl-lg column" >
                                        <div class="col-3 row items-start">
                                            <q-btn flat round @click="archive(p)" color="primary" icon="mdi-archive-arrow-down" >
                                                <q-tooltip>
                                                    Add to Archive
                                                </q-tooltip>
                                            </q-btn>
                                        </div>
                                    </div>
                                    <div v-show="p.archive == true" class="row col q-pl-lg column" >
                                        <div class="col-3 row items-start">
                                            <q-btn flat round @click="archiveRemove(p)" color="primary" icon="mdi-archive-arrow-up" >
                                                <q-tooltip>
                                                    Remove from Archive
                                                </q-tooltip>
                                            </q-btn>
                                        </div>
                                    </div>
                                </div> -->
                            </q-list>
                            <div class="q-pa-lg flex flex-center">
                                <q-pagination
                                    v-model="newpage"
                                    :min="newcurrentPage"
                                    :max="Math.ceil(this.playersWithdrawal.length/newtotalPages)"
                                    direction-links
                                    unelevated
                                    color="black"
                                    active-color="yellow"
                                    active-text-color="black"
                                />
                            </div>
                            <!-- <q-btn outline rounded color="primary" label="See All" class="full-width q-mt-md" v-ripple to="/all-withdrawals"/>  -->
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </div>
  </q-page>
</template>

<script>
import { firebase,firebaseAuth,firebaseDb } from 'src/boot/firebase'
import { date } from 'quasar'
export default {
    data(){
        return {
            NewplayersWithdraw: [],
            newpage: 1,
            newcurrentPage:1,
            newnextPage: null,
            newtotalPages:10,
            agentsWithdraw: [],
            page: 1,
            currentPage:1,
            nextPage: null,
            totalPages:10,
            chips: [
                {label: 'All', value: 'All'},
                {label: 'Visible', value: 'Visible'},
                {label: 'Hidden', value: 'Hidden'},
                {label: 'Approved', value: 'Approved'},
                {label: 'Pending', value: 'Pending'},
            ],
            selectedFilter: "All",
            PlayersWithdrawal: [],
            tab: 'agentWithdraw',
            AgentsWithdrawal: [],
            MasterAgents: [],
            agentOBj: null,
            Wallet: [],
            walletObj: null,
            withdrawAmount: 0,
            outlet: '',
            options: [
                'Main Coordinator',
                // 'BANK TRANSFER'
            ]
        }
    },
    methods: {
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
            // var status = data.archive == undefined ? true : false
            data.archive = data.archive == true ? false : true
			// console.log(data, 'data')
			let key = data['.key']
            let update = {...data}
            delete update['.key']
            this.$db.collection(`PlayersWithdrawal`).doc(key).set(update)
				.then(() => {
                this.$q.notify({
                message: data.archive ? `${data.from.accountName} Has Successfully Move from Archive`: `${data.from.accountName} Has Successfully Move from Archive`,
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
					// console.log(err)
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
			// console.log(data, 'data')
			let key = data['.key']
            let update = {...data}
            delete update['.key']
            this.$db.collection(`PlayersWithdrawal`).doc(key).set(update)
				.then(() => {
                this.$q.notify({
                message: data.archive ? `${data.from.accountName} Has Successfully Move to Archive`: `${data.from.accountName} Has Successfully Move to Archive`,
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
					// console.log(err)
                })
            })
		},
        approve(data) {
            this.$q.dialog({
                title: data.status == false ? `Approve Request ??` : `Decline Request ??`,
                type: 'accent',
                color: 'accent',
                textColor: 'white',
                persistent: true,
                icon: 'warning',
                ok: 'Ok'
            }).onOk(()=> {
            let agentID = this.agentOBj['.key']
            let currentCredits = this.walletObj.creditsAmount
            let withdrawCredits = data.amount
            let total = parseFloat(currentCredits) + parseFloat(withdrawCredits)
            var updateCredits = {
                creditsAmount: total,
                commisionBalance: this.walletObj.commisionBalance = undefined ? 0 : this.walletObj.commisionBalance
            }
            // console.log(updateCredits, 'update')
            this.$db.collection('Wallet').doc(agentID).set(updateCredits)
            var status = data.status == false ? true : false
            data.status = data.status == false ? true : false
			// console.log(data, 'data')
			let key = data['.key']
            let update = {...data}
            delete update['.key']
            this.$db.collection(`PlayersWithdrawal`).doc(key).set(update)
				.then(() => {
                this.$q.notify({
                message: status ? `${data.to.accountName} Withdrawal Request has been Approved`: `${data.to.accountName} has been Decline`,
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
					// console.log(err)
                })
            })
		},
        withdrawCredits(){
            let agentID = this.agentOBj['.key']
            let currentCredits = this.walletObj.creditsAmount
            // console.log(currentCredits, 'current')
            let total = parseFloat(currentCredits) - parseFloat(this.withdrawAmount)
            var updateCredits = {
                creditsAmount: total,
                commisionBalance: this.walletObj.commisionBalance == undefined ? 0 : this.walletObj.commisionBalance
            }
            let MA = this.$lodash.filter(this.MasterAgents, a => {
                // console.log(a, 'a')
                return a['.key'] === this.agentOBj.masterAgentKey
            })
            let reciever = {...MA[0]}
            // console.log(reciever, 'receiver')
            let recieverID = reciever['.key']
            delete reciever['.key']
            reciever.accountID = recieverID

            let sender = {...this.agentOBj}
            delete sender['.key']
            sender.accountID = agentID
            // console.log(sender, 'ID')
            var sendToWithdrawals = {
                amount: this.withdrawAmount,
                masterAgentKey: recieverID,
                masterAgentName: reciever.accountFirstName + ' ' + reciever.accountLastName,
                agentKey: agentID,
                from: sender,
                to: reciever,
                timestamp: new Date(),
                status: false
            }
            // console.log(sendToWithdrawals, 'sendtoWithdrawals')
            if(this.withdrawAmount === '' || this.withdrawAmount < 500 || this.withdrawAmount > this.walletObj.creditsAmount || this.outlet === ''){
                this.$q.dialog({
                    title: this.withdrawAmount === 0 ?  'Enter Amount to Withdraw?' : this.withdrawAmount < 500 ? 'Enter Right Amount' : this.withdrawAmount > this.walletObj.creditsAmount ? 'Enter Right Amount' : this.outlet === '' ? 'Select Outlet Type' : 'Withdraw Credits?',
                    message: this.withdrawAmount === 0 ?  'Enter Amount to Withdraw?' : this.withdrawAmount < 500 ? 'Min. Withdraw Amount is 500' : this.withdrawAmount > this.walletObj.creditsAmount ? 'Insufficient Credit' : this.outlet === '' ? 'Select Outlet Type' : 'Withdraw Credits?',
                    ok: 'Ok',
                    cancel: 'Cancel'
                    })
                }else
                this.$q.dialog({
                    title: 'Withdraw This Credit',
                    message: 'Withdraw Credits??',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                this.$db.collection('Wallet').doc(agentID).set(updateCredits)
                this.$db.collection('AgentsWithdrawal').add(sendToWithdrawals)
                this.recordHistory()
                this.updateLastTransaction()
                this.$q.notify({
                        title: 'Withdrawl Request Sent! ',
                        message: 'Please Wait for Your Main Coordinator Approval',
                        icon: 'mdi-update',
                        color: 'positive',
                        textColor: 'white',
                        position: 'center'
                    })
                    this.withdrawAmount = 0
                    this.outlet = ''  
            })
        },
        recordHistory(){
                let agentID = this.agentOBj['.key']
                let MA = this.$lodash.filter(this.MasterAgents, a => {
                    return a['.key'] === this.agentOBj.masterAgentKey 
                })
                let reciever = {...MA[0]}
                // console.log(reciever, 'receiver')
                let recieverID = reciever['.key']
                delete reciever['.key']
                reciever.accountID = recieverID

                let sender = {...this.agentOBj}
                delete sender['.key']
                sender.accountID = agentID
                // console.log(sender, 'ID')
                var newHistory = {
                    amount: this.withdrawAmount,
                    from: sender,
                    to: reciever,
                    timestamp: new Date(),
                }
                this.$db.collection('WithdrawalHistory').add(newHistory)
        },
        async updateLastTransaction(){
            try {
                let agentID = this.agentOBj['.key']
                const response = await firebaseDb.collection('Agents').doc(agentID).update({ lastTransaction: new Date() })
                // if(response) { console.log('%c SUCCESS_LAST_TRANSACTION','background: #222; color: #bada55') }
            } catch (error) {
                // console.log(error,'error')
                // console.log('%c ERROR_LAST_TRANSACTION','background: #D50000; color: #fff')
            }      
        },
    },
    computed: {
        newgetData(){
			return 	this.playersWithdrawal.slice((this.newpage-1)*this.newtotalPages,(this.newpage-1)*this.newtotalPages+this.newtotalPages)
        },
        getData(){
			return 	this.agentWithdrawal.slice((this.page-1)*this.totalPages,(this.page-1)*this.totalPages+this.totalPages)
        },
        isValid () {
            return this.withdrawAmount >= 500 && this.walletObj.creditsAmount >= this.withdrawAmount
        },
        agentWithdrawal(){
            let withdrawals = this.$lodash.filter(this.agentsWithdraw, p => {
                // console.log(p, 'p')
                return p.agentKey === this.agentOBj['.key'] 
            })
            let orderBy = this.$lodash.orderBy(withdrawals, ['timestamp'], ['desc']);
                return orderBy
        },
        playersWithdrawal(){
            let pWithdraw = this.$lodash.filter(this.NewplayersWithdraw, p => {
                return p.agentKey === this.agentOBj['.key'] 
            })
            let orderByP = this.$lodash.orderBy(pWithdraw, ['timestamp'], ['desc']);
            if(this.selectedFilter == 'All'){
                let AllArchive = this.$lodash.filter(orderByP, p => {
                    return p.archive !== true || p.archive === undefined
                })
                    return AllArchive
            }else if(this.selectedFilter == 'Approved'){
                let wd = this.$lodash.filter(orderByP, p => {
                    return p.status == true && p.archive == false
                })
                    return wd
            }else if(this.selectedFilter == 'Pending'){
                let wdOne = this.$lodash.filter(orderByP, p => {
                    return p.status === false 
                })
                    return wdOne
            }else if(this.selectedFilter == 'Hidden'){
                let wdOne = this.$lodash.filter(orderByP, p => {
                    return p.archive === true 
                })
                    return wdOne
            }else{
                let wdOne = this.$lodash.filter(orderByP, p => {
                    return p.archive !== true 
                })
                    return wdOne
            }
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
        this.$binding("agentOBj", this.$db.collection("Agents").doc(user.uid))
        .then((agents) => {
            // console.log(agents,'agents') // => __ob__: Observer
        }).catch(err => {
            // console.error(err)
        })
        this.$binding('Wallet', this.$db.collection('Wallet'))
        .then(wallet => {
        //   console.log(wallet, 'wallet')
        })
        this.$binding('AgentsWithdrawal', this.$db.collection('AgentsWithdrawal'))
        .then(AgentsWithdrawal => {
        //   console.log(AgentsWithdrawal, 'AgentsWithdrawal')
        })
        this.$binding('MasterAgents', this.$db.collection('MasterAgents'))
        .then(MasterAgents => {
        //   console.log(MasterAgents, 'MasterAgents')
        })     
        this.$binding('PlayersWithdrawal', this.$db.collection('PlayersWithdrawal'))
        .then(PlayersWithdrawal => {
        //   console.log(PlayersWithdrawal, 'PlayersWithdrawal')
        })
        this.$binding('agentsWithdraw', this.$db.collection('AgentsWithdrawal').where("from.accountID", "==", user.uid))
        .then(agentsWithdraw => {
        //   console.log(agentsWithdraw, 'agentsWithdraw')
        })
        this.$binding('NewplayersWithdraw', this.$db.collection('PlayersWithdrawal').where("agentKey", "==", user.uid))
        .then(NewplayersWithdraw => {
        //   console.log(NewplayersWithdraw, 'NewplayersWithdraw')
        }) 
    }
}
</script>
