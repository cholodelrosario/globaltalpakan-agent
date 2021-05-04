<template>
  <q-page class="flex flex-center row bg-dark">
    <div>
    <q-img
        :style="$q.platform.is.desktop ? 'width:30vw;' : 'width:90vw'"
        src="~assets/globaltalpakan-sample.png"
        spinner-color="primary"
        spinner-size="82px"
        contain
        class="col-12"
    />
    <q-card 
        class="bg-white my-card col-12 q-pa-md" 
        flat 
        :style="$q.platform.is.desktop ? 'width:30vw;' : 'width:90vw'"
        v-show="logRegTab"
    >

        <q-card-section class="q-gutter-md">
            <q-input v-model="mobile" type="text" color="white" label="Mobile Number" standout/>
            <q-input v-model="password" :type="isPwd ? 'password' : 'text'" color="white" label="Password" standout>
                <template v-slot:append>
                <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                />
                </template>
            </q-input>
        </q-card-section>
        <q-card-actions align="center">
            <q-btn color="primary" class="text-black full-width" label="Login Account" @click="loginEmail"/>
        </q-card-actions>
            
    </q-card> 
    <!-- phone auth -->


    </div>     
  </q-page>
</template>

<script>
import { firebaseAuth,firebaseApp,firebaseDb,firefirestore } from 'boot/firebase'
export default {
    data(){
        return {
            mobile: '',
            password: '',
            confirmpassword: '',
            isPwd: true,
            code: '',
            logRegTab: true,
            verifyTab: false,
            tab: 'Login',
            userObj: null,
        }
    },
    // firestore(){
    //   return {
    //     Agents: this.$db.collection('Agents'),
    //   }
    // }, 
    methods:{
        loginAccount(){
            let index = this.$lodash.findIndex(this.DashboardUsers, a=>{
                return a.mobile == this.mobile
            })
            // console.log(index,'index');
            if(index !== -1){
                this.$store.dispatch('useraccount/loginUser',{email: this.mobile, password: this.password})
            } else {
                this.$q.dialog({
                    title: `Access Denied!.`,
                    message: `You have no access to this site.`,
                    persistent: true,
                }).onOk(() => {
                    this.$store.dispatch('notification/createNotifs', {userAttempt: this.mobile, module: 'Login',action: 'User Login Attempt'})
                    this.mobile = ''
                    this.password = ''
                })                   
            }
            
        },
        async loginEmail(){
        let emailAdd = `${this.mobile}@gtagent.com`
        let self = this
        // let firstLogin = false
            await this.checkIfActive(this.mobile)
            let checkActive = this.userObj.length > 0 ? 0 : -1
            // let checkActive = this.$lodash.findIndex(this.Agents,a=>{
            //     return a.accountPhone.replace(/[^A-Z0-9]+/ig, "") == this.mobile && a.activated == true
            // })
            // console.log(checkActive)
            if(checkActive == -1){
                    self.$q.dialog({
                    title: `This account has no access to the system. Your account may be inactive. Please contact admin for assistance.`,
                    type: 'negative',
                    color: 'negative',
                    textColor: 'white',
                    icon: 'warning',
                    ok: 'Ok',
                    
                })  
                return               
            } else {
                firebaseAuth.signInWithEmailAndPassword(emailAdd, this.password)
                .then(result => {
                // console.log(result, 'result')
                let user = result.user
                // console.log(user,'user')
                //check if paid na

                let findUser = this.userObj.length > 0 ? this.userObj[0] : null
                // let findUser = this.Agents.filter(a=>{
                //     return a.accountPhone.replace(/[^A-Z0-9]+/ig, "") == this.mobile
                // })[0]
                let store = {
                    displayName: findUser.accountName ? findUser.accountName : null,
                    email: user.email,
                    phone: findUser.accountPhone.replace(/[^A-Z0-9]+/ig, ""),
                    // photoURL: user.photoURL,
                    uid: user.uid,
                    refreshToken: user.refreshToken,
                    userDBKey: findUser['.key'],
                    account: findUser,
                    inviteLink: findUser.inviteLink
                }
                // console.log(store)
        
                self.$store.commit('useraccount/setDashboardUser', store)
                // if(findUser.changePass == true){
                //     firstLogin = true
                // }
                firebaseAuth.setPersistence(this.$firebase.auth.Auth.Persistence.LOCAL)
                    .then(function() {
                        // console.log('setPersistence!')
                        // Existing and future Auth states are now persisted in the current
                        // session only. Closing the window would clear any existing state even
                        // if a user forgets to sign out.
                        // ...
                        // New sign-in will be persisted with session persistence.
                        return firebaseAuth.signInWithEmailAndPassword(emailAdd, self.password);
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // console.log(errorMessage)
                    });
                    self.$router.push('/agent')
                    
                })
                .catch(err =>{
                    // console.log(err, 'error')
                    self.$q.dialog({
                        title: `${err.message}`,
                        type: 'negative',
                        color: 'negative',
                        textColor: 'white',
                        icon: 'warning',
                        ok: 'Ok',
                        
                    }).onOk(()=>{
                        // this.email = ''
                        this.password = ''
                    })
                    //this.isLoading = false
                })
            }
        },
        async checkIfActive(accountPhone){
            await this.$binding("userObj", this.$db.collection("Agents").where("accountPhone", "==", accountPhone).where("activated", "==", true))
            .then((agent) => {
                // console.log(agent,'agent') // => __ob__: Observer
            }).catch(err => {
                // console.error(err)
            })                    
        }
    }  
}
</script>
