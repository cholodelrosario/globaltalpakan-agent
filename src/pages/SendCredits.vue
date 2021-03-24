<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
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
            <q-btn color="primary" class="text-black full-width" label="Next"/>

        </div>
    </q-page>
</template>

<script>
export default {
    data(){
        return {
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