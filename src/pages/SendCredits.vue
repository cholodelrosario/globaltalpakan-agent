<template>
    <q-page class="container flex q-pa-lg bg-dark">
        <div class="full-width">
            <div v-show="prepareScreen">
                <h5 class="text-primary text-weight-bolder q-mt-none">SEND CREDITS</h5>
                <div class="text-white q-mt-xl"><q-icon name="account_balance_wallet"  size="sm" :v-show="walletObj"/> <span class="text-grey"> CREDITS </span> <span class="float-right text-h6">₱ {{walletObj ? walletObj.creditsAmount : 0}}</span>  </div>
                <br>
                <q-input v-model="sendAmount" type="number" color="dark" label="Amount" dark standout class="text-capitalize "  :rules="[val => val < walletObj.creditsAmount || 'Insufficient Credits!']"/>\
                <br>
                <q-select
                    standout
                    dark 
                    v-model="downline" 
                    :options="options" 
                    label="Reciepient" 
                    clearable          
                    use-input
                    map-options
                    emit-value
                    use-chips
                    option-value
                    behavior="menu"
                    @new-value="createValue"
                    @filter="filterFn"
                >
                    <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">
                        No results
                        </q-item-section>
                    </q-item>
                    </template>
                </q-select>
                <q-list dark separator class="bg-grey-8" v-show="downline == null">
                    <q-item-label
                    header
                    >
                    RECENT DOWNLINES
                    </q-item-label>    
                    <q-separator   dark />            
                    <q-item clickable v-ripple v-for="(n,index) in Downlines" :key="n['.key']" @click="selectDownline(n)">
                        <q-item-section >{{n.accountPhone}} / {{n.accountName}}</q-item-section>
                    </q-item>
                </q-list>
                <br>
                <q-btn :disable="returnDisabled" color="primary" class="text-black full-width" label="Next" @click="nextFixDisplay"/>
            </div>
            <!-- SENDING -->
            <div class="text-center text-white q-pa-md text-h6 full-height" v-show="proceedScreen">
                <!-- <q-icon name="send" size="lg"/> -->
                <br> You will be sending
                <br> <span class="text-primary text-h4">{{sendAmount}} </span>
                <br> 
                <br>  <span class="text-primary text-h4" v-show="selectedDownline">{{selectedDownline ? selectedDownline.accountPhone : ''}} / {{selectedDownline ? selectedDownline.accountName : ''}} </span>
                <br><br>
                <q-btn color="grey-8" icon="arrow_left" label="go back and edit" @click="proceedScreen = false, prepareScreen = true"/>
                <div class="absolute-bottom q-pa-md">
                <q-btn  color="primary" class="text-black full-width" label="Submit" @click="confirmTransaction"/>

                </div>
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
            prepareScreen: true,
            proceedScreen: false,
            sendAmount: 0,
            downline: null,
            options: Object.freeze(this.returnMapDownlines),
            Downlines: [],
            walletObj: null,
            selectedDownline: null
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
        this.$binding("walletObj", this.$db.collection("Wallet").doc(user.uid))
        .then((wallet) => {
            console.log(wallet,'wallet') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })  
    },
    computed: {
        returnMapDownlines(){
            return this.Downlines.map(a=>{
                return {
                    label: `${a.accountPhone} / ${a.accountName}`,
                    value: a
                }
            })
        },
        returnDisabled(){
            return this.sendAmount == 0 || this.downline == null || this.sendAmount > this.walletObj.creditsAmount ? true : false
        }
    },
    methods: {

        createValue (val, done) {
        // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
        // only if is not already set
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
        // (adds to model if not already in the model, removes from model if already has it)
        // and it resets the input textbox to empty string
        // ----
        // If "var" content is undefined/null, then it doesn't tampers with the model
        // and only resets the input textbox to empty string
        if (val.length > 2) {
            if (!this.options.includes(val)) {
            done(val, 'add-unique')
            }
        }
        },
        filterFn (val, update) {
            if (val === '') {
                update(() => {
                this.options = this.returnMapDownlines

                // with Quasar v1.7.4+
                // here you have access to "ref" which
                // is the Vue reference of the QSelect
                })
                return
            }

            update(() => {
                const needle = val.toLowerCase()
                console.log(needle)
                this.options = this.returnMapDownlines.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
            })
        },
        selectDownline(downline){
            console.log(downline)
            this.downline = this.returnMapDownlines.filter(a=>{
                return a.value.accountPhone == downline.accountPhone
            })[0]            
        },
        nextFixDisplay(){
            let downline = {...this.downline}
            this.selectedDownline = downline.value
            this.proceedScreen = true
            this.prepareScreen = false
        },
        async confirmTransaction(){
            console.log(this.downline)
            let downline = this.selectedDownline
            await this.$store.dispatch('wallet/creditWallet',{to: downline, credits: this.sendAmount, downlineID: downline['.key']})
            this.clearAll()
        },
        clearAll(){
            let self = this
            console.log('here')
            setTimeout(function(){
                console.log('here inside')
                self.downline = null
                self.sendAmount = 0
                self.proceedScreen = false
                self.prepareScreen = true
             }, 3000);
            
        },
        isWithin7Days(lastTransactionDay){
            return getDateDiff(new Date(),new Date(lastTransactionDay),'days') > 7
        }
    }
}
</script>