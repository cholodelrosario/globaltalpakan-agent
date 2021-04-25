<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <div class="row">
                <div><h5 class="text-primary text-weight-bolder q-mt-none">COMMISSION HISTORY</h5></div>
                <q-space></q-space>
                <div class="text-white"><q-icon name="account_balance_wallet"  size="sm"/> CREDITS ₱ {{walletObj ? walletObj.creditsAmount : 0}}</div>
            </div>

            <!-- <div class="row">
                <q-btn-toggle v-model="selectedFilter" class="my-custom-toggle" no-caps rounded elevated toggle-color="primary" color="dark" text-color="primary" :options="chips" />
            </div> -->
            <!-- HISTORY -->
                <div class="q-mt-lg q-pt-sm">
                    <h6 class="text-secondary flex flex-center q-ma-none">COMMISSION HISTORY</h6>
                    <q-list class="text-white" separator bordered>
                        <q-item clickable v-ripple class="q-py-md" v-for="(p, index) in this.getData" :key="index">
                            <q-item-section top avatar>
                                <q-avatar color="dark" text-color="positive" icon="check"/>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-secondary" caption >Commission</q-item-label>
                                <q-item-label class="text-h6">₱ {{p.amount}} </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-secondary" caption >Player Name/Phone</q-item-label>
                                <q-item-label class="text-overline">{{p.PlayerNamePhone}} </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-secondary" caption >Game</q-item-label>
                                <q-item-label class="overline">{{p.gameSchedule.gameCategory}} </q-item-label>
                            </q-item-section>
                            <q-item-section side top>
                                <q-item-label class="text-secondary" caption>{{p.timestamp.toDate()}}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>  
                    <div class="q-pa-lg flex flex-center">
                        <q-pagination
                            v-model="page"
                            :min="currentPage"
                            :max="Math.ceil(this.orderByComms.length/totalPages)"
                            direction-links
                            unelevated
                            color="black"
                            active-color="yellow"
                            active-text-color="black"
                        />
                    </div>
                    <br><br><br>
                </div>
            <br>
        </div>    
    </q-page>
</template>

<script>
import { firebase,firebaseAuth,firebaseDb } from 'src/boot/firebase'
export default {
    data(){
        return {
            page: 1,
            currentPage:1,
            nextPage: null,
            totalPages:10,
            commissionObj: null,
            walletObj: null,
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
        
    },
    computed: {
        getData(){
			return 	this.orderByComms.slice((this.page-1)*this.totalPages,(this.page-1)*this.totalPages+this.totalPages)
        },
        orderByComms(){
            let orderByP = this.$lodash.orderBy(this.commissionObj, ['timestamp'], ['desc']);
            return orderByP
        }
        
    },
    mounted () {
        let user = this.$store.getters['useraccount/isAuthenticated']
        console.log(user,'user')
        this.$binding("walletObj", this.$db.collection("Wallet").doc(user.uid))
        .then((wallet) => {
            console.log(wallet,'wallet') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })
        this.$binding("commissionObj", this.$db.collection("CommissionHistory").where("accountID", "==", user.uid).limit(20))
        .then((comms) => {
            console.log(comms,'comms') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })
        this.$binding('Wallet', this.$db.collection('Wallet'))
        .then(Wallet => {
          console.log(Wallet, 'Wallet')
        })
    }
}
</script>
