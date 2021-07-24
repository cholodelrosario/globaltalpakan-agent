<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <b v-show="false">{{totalMTD}}</b>
            <div class="row">
                <div><h5 class="text-primary text-weight-bolder q-mt-none">STATS</h5></div>
                <q-space></q-space>
            </div>
            <div class="q-pa-md col-12 row q-gutter-md">
                <div class="col-3">
                    <strong class="text-white">From:</strong><q-input dark v-model="fromdate" mask="YYYY/MM/DD" filled type="date"/>
                </div>
                <div class="col-3">
                    <strong class="text-white">To:</strong><q-input dark v-model="todate" mask="YYYY/MM/DD" filled type="date"/>
                </div>
                <div class="text-white col ">
                    <strong class="text-white">Total MTD</strong><q-input dark  outlined v-model="amountWithdraw" type="number" label="Commission" />
                </div>
            </div>
            <div>
                <q-list v-for="(p, index) in this.getData" :key="index"  class="text-white bg-white-10" bordered separator>
                    <q-item>
                        <q-item-section>{{p.guideDate}}</q-item-section>
                        <q-item-section side >P&nbsp;{{p.totalCommission}}</q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div class="q-pa-lg flex flex-center">
                <q-pagination
                    v-model="page"
                    :min="currentPage"
                    :max="Math.ceil(this.mtdHistory.length/totalPages)"
                    direction-links
                    unelevated
                    color="black"
                    active-color="yellow"
                    active-text-color="black"
                />
            </div>
            <br><br><br>
        </div>
    </q-page>
</template>

<script>
import { firebase,firebaseAuth,firebaseDb } from 'src/boot/firebase'
import { date } from 'quasar'
export default {
    data(){
        return {
            MTDHistory: [],
            agentObj: [],
            Agents: [],
            amountWithdraw: 0,
            fromdate: date.formatDate(new Date(),'YYYY/MM/DD'),
            todate: date.formatDate(new Date(),'YYYY/MM/DD'),
            page: 1,
            currentPage:1,
            nextPage: null,
            totalPages:10,
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
        totalMTD(){
            let total = this.$lodash.sumBy(this.MTDHistory, a => { 
                return parseInt(a.totalCommission)
                })
            // console.log(total, 'sum')
            return this.amountWithdraw = total
        },
        getData(){
			return 	this.mtdHistory.slice((this.page-1)*this.totalPages,(this.page-1)*this.totalPages+this.totalPages)
        },
        mtdHistory(){
            let orderByP = this.$lodash.orderBy(this.MTDHistory, ['lastUpdated'], ['desc']);
            return orderByP
        }
    },
    mounted () {
        let user = this.$store.getters['useraccount/isAuthenticated']
        // console.log(user,'user')
        this.$binding("walletObj", this.$db.collection("Wallet").doc(user.uid))
        .then((wallet) => {
            // console.log(wallet,'wallet') // => __ob__: Observer
        }).catch(err => {
            // console.error(err)
        })
        this.$binding('agentObj', this.$db.collection('Agents').where("masterAgentKey", "==", user.uid))
        .then(agentObj => {
        //   console.log(agentObj, 'agentObj')
        })
        this.$binding('Agents', this.$db.collection('Agents'))
        .then(Agents => {
        //   console.log(Agents, 'Agents')
        })
        this.$binding('MTDHistory', this.$db.collection('MTDHistory').where("accountID", "==", user.uid))
        .then(MTDHistory => {
        //   console.log(MTDHistory, 'MTDHistory')
        })
    }
}
</script>
