<template>
  <q-page class="container flex q-pa-lg bg-dark">
      <div class="full-width">
        <h5 class="text-primary text-weight-bolder q-mt-none">COMMISSION</h5>
        <q-list>
            <q-item class="text-black bg-primary q-pa-md">
                <q-item-section class="text-h6">
                    <q-item-label>₱ {{walletObj.commisionBalance === undefined || walletObj.commisionBalance === null ? 0 : walletObj.commisionBalance}}</q-item-label>
                    <q-item-label caption lines="2">Commission<br> Balance</q-item-label>
                </q-item-section>
                <q-item-section class="text-h6">
                    <q-item-label>₱ {{sumMTD}}</q-item-label>
                    <q-item-label caption lines="2">Commission <br>(Month to Date)</q-item-label>
                </q-item-section>
            </q-item>
            <q-item dark class="">
                <q-item-section>
                    <q-item-label caption lines="2">Commision computed: 02:22AM </q-item-label>
                </q-item-section>
            </q-item>
            <q-item dark class="bg-grey-8 q-pa-md">
                <q-item-section>
                    <q-item-label caption lines="2">Main Coor: 
                        <span class="text-primary q-ml-sm">{{returnMyMasterAgent[0].accountFirstName + ' ' + returnMyMasterAgent[0].accountLastName}}</span>
                    </q-item-label>
                    <q-item-label caption lines="2">Commission: 
                        <span class="q-ml-sm">{{agentObj.percentSetByMA}}%</span>
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
        <div class="container row q-gutter-sm q-mt-sm">
            <q-btn color="primary" class="text-black col" label="Send Credits" icon="send" @click="$router.push('/send-credits')"/>
            <q-btn color="primary" class="text-black col" label="Withdrawals" icon="credit_card" @click="$router.push('/withdrawals')"/>
        </div>
        <div class="container row q-gutter-sm q-mt-sm">
            <q-btn color="primary" class="text-black col" label="Inv. Link" icon="mail" @click="$router.push('/invlink')"/>
            <q-btn color="primary" class="text-black col" label="Convert" icon="sync" @click="$router.push('/convert')"/>
        </div>
        <!-- DOWNLINES -->
        <div class="q-mt-lg q-pt-lg">
            <h6 class="text-secondary q-ma-none">Top Downlines</h6>
            <q-list class="text-white" separator>
                <q-item class="q-py-none">
                    <q-item-section>
                        <q-item-label class="text-grey" caption lines="2">Account Number / Name</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-right text-secondary" caption>MTD Comm</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple class="q-py-md" v-for="n in newDownlines" :key="n['.key']">
                        <q-item-section>
                            <q-icon name="lock" color="grey" v-show="n.lastTransaction && isWithin7Days(n.lastTransaction)" />
                            <q-icon name="lock_open" color="grey" v-show="n.lastTransaction && isWithin7Days(n.lastTransaction) == false" />
                            {{n.accountPhone}} / {{n.accountName}}
                        </q-item-section>
                        <q-item-section>
                            <q-item-label class="text-right text-secondary" caption>{{n.mtd}}</q-item-label>
                        </q-item-section>
                    <q-item-section side>
                        <q-btn color="primary" icon="send" class="text-black" size="md" @click="confirmTransaction(n)"  />
                    </q-item-section>
                </q-item>
            </q-list>
            <br><br><br>
        </div>
      </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
const { getDateDiff } = date
export default {
    data(){
        return {
            playerMTD: null,
            agents: [],
            MasterAgents: [],
            walletObj: null,
            masterAgentObj: null,
            agentObj: null,
            withdrawAmount: 0,
            outlet: '',
            options: [
                'GCASH',
                'BANK TRANSFER'
            ],
            Downlines: [],
            Wallet: null,
            commsObj: null,
        }
    },
    mounted(){
        let user = this.$store.getters['useraccount/isAuthenticated']
        console.log(user,'user')
        this.$binding("Downlines", this.$db.collection("Players").where("agentKey", "==", user.uid))
        .then((downlines) => {
            console.log(downlines,'downlines') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })
        this.$binding("agentObj", this.$db.collection("Agents").doc(user.uid))
        .then((agentObj) => {
            console.log(agentObj,'agentObj') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })
        this.$binding("walletObj", this.$db.collection("Wallet").doc(user.uid))
        .then((walletObj) => {
            console.log(walletObj,'walletObj') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })
        this.$binding("commsObj", this.$db.collection("CommissionHistory").where("accountID", "==", user.uid))
        .then((commsObj) => {
            console.log(commsObj,'commsObj') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })
        this.$binding('MasterAgents', this.$db.collection('MasterAgents'))
        .then(MasterAgents => {
          console.log(MasterAgents, 'MasterAgents')
        })
        this.$binding('agents', this.$db.collection('Agents'))
        .then(Agents => {
          console.log(Agents, 'Agents')
        })
        this.$binding("playerMTD", this.$db.collection("PlayerAgentMTD").where("agentID", "==", user.uid))
        .then((playerMTD) => {
            console.log(playerMTD,'playerMTD') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })
    },
    methods:{
        getMTD(key){
            // let date = this.$moment(new Date()).format('MM-YYYY-')
            // let filterKey = date + key
            var docRef = null
            var data = null
            docRef = this.playerMTD.filter(a=>{
                return a.playerID == key
            })[0]
            data = {...docRef}
            delete data['.key']
            console.log(data, 'MTTDDD')
            return data.MTDCommission

        },
        async checkWalletBalance(){
            let user = this.$store.getters['useraccount/isAuthenticated']
            await this.$binding("Wallet", this.$db.collection("Wallet").doc(user.uid))
            .then((wallet) => {
                console.log(wallet,'wallet') // => __ob__: Observer
            }).catch(err => {
                console.error(err)
            })             
        },
        async confirmTransaction(downline){
            await this.checkWalletBalance()
            let balance = this.Wallet.creditsAmount
            console.log(balance,'balance')
            this.$q.dialog({
                dark: true,
                title: 'Enter Amount to Send',
                message: ``,
                prompt: {
                    model: 0,
                    type: 'number', // optional
                },
                cancel: {
                    color: 'grey',
                    flat: true,
                },
                persistent: true
            }).onOk(async (data) =>{
                console.log(data,'credits')
                console.log(downline,'downline')

                if(data > balance){
                    this.$q.dialog({
                        dark: true,
                        title: 'Insufficient Credit Balance',
                    })
                    return
                }

                await this.$store.dispatch('wallet/creditWallet',{to: downline, credits: data, downlineID: downline['.key']})

            })            
        },
        isWithin7Days(lastTransactionDay){
            return getDateDiff(new Date(),new Date(lastTransactionDay),'days') > 7
        }
    },
    computed:{
        newDownlines(){
            let map = this.$lodash.map(this.Downlines,a=>{
                let MTDs = this.getMTD(a['.key'])
                return {
                        ['.key']: a['.key'],
                        accountID: a['.key'],
                        accountName: a.accountName,
                        accountPhone: a.accountPhone,
                        mtd: MTDs === undefined || MTDs === null ? 0 : MTDs,
                        agentKey: a.agentKey,
                        masterAgentKey: a.masterAgentKey,
                        lastTransaction: a.lastTransaction
                    }
            })
            console.log(map, 'mapping')
            let user = this.$store.getters['useraccount/isAuthenticated']
            let downliness = map.filter(p => {
                return p.agentKey === user.uid 
            })
            let orderByP = this.$lodash.orderBy(downliness, ['mtd'], ['desc']);
            return orderByP
        },
        returnMyMasterAgent(){
            let MAKey = this.agentObj.masterAgentKey
            let MAgent = this.$lodash.filter(this.MasterAgents, p => {
                    return p['.key'] === MAKey
                })
            let sender = {...MAgent}
                console.log(sender, 'MAKEY')
                return sender
        },
        sumMTD(){   
            let thisMonth = this.$lodash.filter(this.commsObj, p => {
                    return p.timestamp === date.formatDate(new Date(), 'MM')
                })
            let sum = this.$lodash.sumBy(this.commsObj, a => { 
                return parseInt(a.amount)
                })
            console.log(sum, 'sum')
            return sum
        }
    }
}
</script>
