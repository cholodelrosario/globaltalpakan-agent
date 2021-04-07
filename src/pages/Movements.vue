<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <h5 class="text-primary text-weight-bolder q-mt-none">Movements</h5>
            <q-tabs
                v-model="tab"
                inline-label
                shrink
                active-color="primary"
                class="bg-dark text-secondary q-mb-md shadow-1"
            >
                <q-tab name="Transferred"  label="Transferred" />
                <q-tab name="RegLink" label="Registration Link" />
            </q-tabs>
            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="Transferred" class="q-pa-none bg-dark">
                    <q-banner class="bg-info text-white">
                        <q-icon name="info" /> List of players transferred as your downline.
                    </q-banner>
                    <q-list dark separator class="bg-dark">   
                        <q-separator   dark />            
                        <q-item clickable v-ripple v-for="(n,index) in returnedTransferred" :key="index">
                            <q-item-section>
                                <q-icon name="lock" color="grey" v-show="n.lastTransaction && isWithin7Days(n.lastTransaction)" />
                                <q-icon name="lock_open" color="grey" v-show="n.lastTransaction && isWithin7Days(n.lastTransaction) == false" />
                                {{n.accountPhone}} / {{n.accountName}}
                            </q-item-section>                            
                            <q-item-section side top>
                                <q-item-label caption lines="2">{{$moment(n.timestamp.toDate()).format('MM/DD/YYYY')}}
                                    <br>{{$moment(n.timestamp.toDate()).format('LT')}}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
    
                    </q-list>
                </q-tab-panel>
                <q-tab-panel name="RegLink" class="q-pa-none bg-dark">
                    <q-banner class="bg-info text-white">
                        <q-icon name="info" /> List of players registered using your invitation link.
                    </q-banner>
                    <q-list dark separator class="bg-dark">   
                        <q-separator   dark />            
                        <q-item clickable v-ripple v-for="(n,index) in returnedReferral" :key="index">
                             <q-item-section>
                                <q-icon name="lock" color="grey" v-show="n.lastTransaction && isWithin7Days(n.lastTransaction)" />
                                <q-icon name="lock_open" color="grey" v-show="n.lastTransaction && isWithin7Days(n.lastTransaction) == false" />
                                {{n.accountPhone}} / {{n.accountName}}
                            </q-item-section>                            
                            <q-item-section side top>
                                <q-item-label caption lines="2">{{$moment(n.timestamp.toDate()).format('MM/DD/YYYY')}}
                                    <br>{{$moment(n.timestamp.toDate()).format('LT')}}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-tab-panel>
            </q-tab-panels>
        </div>

  </q-page>
</template>
<script>
import { date } from 'quasar'
const { getDateDiff } = date
export default {
    data(){
        return{
            tab: 'Transferred',
            options: [
                '09657059405 / JOHN DOE ',
                '09657059423 / JANE DOE ',
                '09999999923 / JEW DOE '
            ],
            Movements: [],
            Downlines: []
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
        
        this.$binding("Movements", this.$db.collection("Movements").where("topline", "==", user.uid))
        .then((movements) => {
            console.log(movements,'movements') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })  
    },
    computed: {
        movementAgentData(){
            return this.Movements.map(a=>{
                let data = this.returnAgentData(a.downline)
                return {
                    ...a,
                    ...data
                }
            })
        },
        returnedTransferred(){
            return this.movementAgentData.filter(a=>{
                return a.isTransferred == true
            })
        },
        returnedReferral(){
            return this.movementAgentData.filter(a=>{
                return a.isFromReferralLink == true
            })
        }
    },
    methods:{
        returnAgentData(uid){
            return this.Downlines.filter(a=>{
                return a['.key'] == uid
            })[0]
        },
        isWithin7Days(lastTransactionDay){
            return getDateDiff(new Date(),new Date(lastTransactionDay),'days') > 7
        }
    }
}
</script>