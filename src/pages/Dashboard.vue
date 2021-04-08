<template>
  <q-page class="container flex q-pa-lg bg-dark">
      <div class="full-width">
        <h5 class="text-primary text-weight-bolder q-mt-none">COMMISSION</h5>
        <q-list>
            <q-item class="text-black bg-primary q-pa-md">
                <q-item-section class="text-h6">
                    <q-item-label>100.98</q-item-label>
                    <q-item-label caption lines="2">Commission<br> Balance</q-item-label>
                </q-item-section>
                <q-item-section class="text-h6">
                    <q-item-label>10,000.50</q-item-label>
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
                        <span class="text-primary q-ml-sm">Master Agent</span>
                    </q-item-label>
                    <q-item-label caption lines="2">Commission: 
                        <span class="q-ml-sm">1.00% of bets</span>
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
                    <q-item-section side>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple class="q-py-md" v-for="n in Downlines" :key="n['.key']">
                        <q-item-section>
                            <q-icon name="lock" color="grey" v-show="n.lastTransaction && isWithin7Days(n.lastTransaction)" />
                            <q-icon name="lock_open" color="grey" v-show="n.lastTransaction && isWithin7Days(n.lastTransaction) == false" />
                            {{n.accountPhone}} / {{n.accountName}}
                        </q-item-section>
                        <q-item-section>
                            <q-item-label class="text-right text-secondary" caption></q-item-label>
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
            withdrawAmount: 0,
            outlet: '',
            options: [
                'GCASH',
                'BANK TRANSFER'
            ],
            Downlines: [],
            Wallet: null,
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
    },
    methods:{
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
