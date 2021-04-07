<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <h5 class="text-primary text-weight-bolder q-mt-none q-mb-sm">Downlines</h5>
            <q-list class="text-white" separator>
                <q-item class="q-py-none">
                    <q-item-section>
                        <q-item-label class="text-white" caption lines="2">Downline</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <!-- <q-item-label class="text-secondary text-right" caption>MTD Comm</q-item-label> -->
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
                            <q-item-label class="text-secondary text-right" caption></q-item-label>
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
export default {
    data(){
        return{
            tab: 'Transferred',
            options: [
                '09657059405 / JOHN DOE ',
                '09657059423 / JANE DOE ',
                '09999999923 / JEW DOE '
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
        }
    }

}
</script>