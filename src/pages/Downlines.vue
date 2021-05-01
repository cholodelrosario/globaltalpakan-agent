<template>
    <q-page class="container flex q-pa-lg bg-dark">
        <div class="full-width">
            <h5 class="text-primary text-weight-bolder q-mt-none q-mb-sm">Downlines</h5>
            <q-list class="text-white" separator>
                <q-item class="q-py-none">
                    <q-item-section>
                        <q-item-label class="text-white" caption lines="2">Downline</q-item-label>
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
        </div>

  </q-page>
</template>
<script>
import { date } from 'quasar'
// import { delete } from 'app/node_modules/vue/types/umd'
const { getDateDiff } = date
export default {
    data(){
        return{
            playerMTD: null,
            tab: 'Transferred',
            options: [
                '09657059405 / JOHN DOE ',
                '09657059423 / JANE DOE ',
                '09999999923 / JEW DOE '
            ],
            agentOBj: null,
            Downlines: [],
            Wallet: null,
            commmss: null
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
        this.$binding("agentOBj", this.$db.collection("Agents").doc(user.uid))
        .then((agents) => {
            console.log(agents,'agents') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })
        this.$binding("commmss", this.$db.collection("CommissionHistory").where("accountID", "==", user.uid))
        .then((commmss) => {
            console.log(commmss,'commmss') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })
        this.$binding("playerMTD", this.$db.collection("PlayerAgentMTD").where("agentID", "==", user.uid))
        .then((playerMTD) => {
            console.log(playerMTD,'playerMTD') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })  
    },
    computed: {
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
        }
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
    }

}
</script>