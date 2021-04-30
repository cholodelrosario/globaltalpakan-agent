<template>
  <q-page class="flex container q-pa-lg bg-dark">
      <div class="full-width">
          <h5 class="text-primary text-weight-bolder q-mt-none">Settings</h5>
          <b class="text-h6 text-white">Name</b><br>
          <q-input outlined dark v-model="name" :label="this.agentObj.accountName" />
          <q-btn class="q-mt-md q-pt-sm q-pb-sm full-width" color="red" label="Submit" />
          <br><br><br>
          <h6 class="text-white flex flex-center q-ma-none">Transactions</h6>
          <q-btn class="q-mt-md q-pt-sm q-pb-sm full-width" color="red" label="View History" @click="$router.push('/transactions')" />
          <br><br><br>
          <h6 class="text-white flex flex-center q-ma-none">Update Password</h6>
          <br>
          <b class="text-h6 text-white">Current Password</b><br>
          <q-input outlined dark v-model="currentPassword" />
          <br>
          <b class="text-h6 text-white">New Password</b><br>
          <q-input outlined dark v-model="newPassword" />
          <br>
          <b class="text-h6 text-white">Current Password</b><br>
          <q-input outlined dark v-model="rePassword" />
          <br>
          <q-btn class="q-mt-md q-pt-sm q-pb-sm full-width" color="red" label="Submit" />
          <br>
          <br>
          <br>
      </div>
  </q-page>
</template>

<script>
import { firebase,firebaseAuth,firebaseDb } from 'src/boot/firebase'
import { date } from 'quasar'
export default {
    data(){
        return {
            rePassword: '',
            newPassword: '',
            currentPassword: '',
            name: '',
            agentObj: null,
            
        }
    },
    methods: {
        
    },
    computed: {
        returnUser(){
        let user = this.$store.getters['useraccount/isAuthenticated']
        return user
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
        .then((agentObj) => {
            console.log(agentObj,'agentObj') // => __ob__: Observer
        }).catch(err => {
            console.error(err)
        })
    }
}
</script>
