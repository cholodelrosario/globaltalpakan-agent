<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <div v-show="prepareScreen">
                <h5 class="text-primary text-weight-bolder q-mt-none">SEND CREDITS</h5>
                <div class="text-white q-mt-xl"><q-icon name="account_balance_wallet"  size="sm"/> CREDITS : 0.00 </div>
                <br>
                <q-input v-model="sendAmount" type="number" color="dark" label="Amount" dark standout class="text-capitalize"/>\
                <br>
                <q-select standout dark v-model="downline" :options="options" label="Reciepient" clearable/>
                <q-list dark separator class="bg-grey-8">
                    <q-item-label
                    header
                    >
                    RECENT DOWNLINES
                    </q-item-label>    
                    <q-separator   dark />            
                    <q-item clickable v-ripple v-for="(n,index) in options" :key="index">
                        <q-item-section>{{n}}</q-item-section>
                    </q-item>
                </q-list>
                <br>
                <q-btn color="primary" class="text-black full-width" label="Next" @click="proceedScreen = true, prepareScreen = false"/>
            </div>
            <!-- SENDING -->
            <div class="text-center q-pa-md text-white text-h6 full-height" v-show="proceedScreen">
                <!-- <q-icon name="send" size="lg"/> -->
                <br> You will be sending
                <br> <span class="text-primary text-h4">{{sendAmount}}.00 </span>
                <br> to
                <br>  <span class="text-primary text-h4">{{options[0]}} </span>
                <br><br>
                <q-btn color="grey-8" icon="arrow_left" label="go back and edit" @click="proceedScreen = false, prepareScreen = true"/>
                <div class="absolute-bottom q-pa-md">
                <q-btn color="primary" class="text-black full-width" label="Submit" @click="proceedScreen = false, prepareScreen = true"/>

                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    data(){
        return {
            prepareScreen: true,
            proceedScreen: false,
            sendAmount: 0,
            downline: '',
            options: [
                '09657059405 / JOHN DOE ',
                '09657059423 / JANE DOE ',
                '09999999923 / JEW DOE '
            ]
        }
    }
}
</script>