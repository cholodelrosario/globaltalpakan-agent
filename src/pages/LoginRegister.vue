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
        class="my-card col-12 q-pa-md bg-white" 
        flat 
        :style="$q.platform.is.desktop ? 'width:30vw;' : 'width:90vw'"
        v-show="logRegTab"
    >

        <q-tabs
            v-model="tab"
            inline-label
            active-color="primary"
            class="bg-dark text-secondary q-mb-md shadow-1"
        >
            <q-tab name="Login"  label="Login" />
            <q-tab name="Register" label="Register" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="Login">
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
                    <q-btn color="primary" class="text-black full-width" label="Login Account" @click="$router.push('/events')"/>
                </q-card-actions>
            </q-tab-panel>
            <q-tab-panel name="Register">
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
                    <q-input v-model="confirmpassword" :type="isPwd ? 'password' : 'text'" color="white" label="Confirm Password" standout>
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
                    <q-btn color="primary" class="text-black full-width" label="Register Account" @click="verifyTab = true,logRegTab = false"/>
                </q-card-actions>
            </q-tab-panel>
        </q-tab-panels>
    </q-card> 
    <!-- phone auth -->
    <q-card 
        class="my-card col-12 q-pa-md bg-white" 
        flat 
        :style="$q.platform.is.desktop ? 'width:30vw;' : 'width:90vw'"
        v-show="verifyTab"
    >
        <q-card-section>
            We have sent a verification code on your number: {{mobile}}
        </q-card-section>
        <q-input v-model="code" type="text" color="white" label="Verification Code" standout class="text-capitalize q-px-lg"/>
        <q-card-actions align="center" class="q-px-md">
            <q-btn color="primary" class="text-black q-mt-md full-width" label="Verify Number"  @click="$router.push('/events')"/>
            <q-btn color="dark" flat size="sm" label="resend code" class="q-mt-sm" />
        </q-card-actions>
    </q-card>

    </div>     
  </q-page>
</template>

<script>
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
            tab: 'Login'
        }
    },
    firestore(){
      return {
        DashboardUsers: this.$db.collection('DashboardUsers'),
      }
    }, 
    methods:{
        loginAccount(){
            let index = this.$lodash.findIndex(this.DashboardUsers, a=>{
                return a.mobile == this.mobile
            })
            console.log(index,'index');
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
            
        }
    }  
}
</script>
