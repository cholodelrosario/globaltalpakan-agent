<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <div class="row">
                <div><h5 class="text-primary text-weight-bolder q-mt-none">WITHDRAWALS</h5></div>
                <q-space></q-space>
                <div class="text-white"><q-icon name="account_balance_wallet"  size="sm"/> CREDITS : 0.00 </div>
            </div>
            <q-input v-model="withdrawAmount" type="number" color="dark" label="Withdraw Amount" dark standout class="text-capitalize"/>
            <br>
            <q-select standout dark v-model="outlet" :options="options" label="Outlet" />
            <q-btn color="primary" class="text-black q-mt-md full-width" label="Submit" />
            <br>

            <!-- HISTORY -->
            <div class="q-mt-lg q-pt-lg">
                <h6 class="text-secondary q-ma-none">WITHDRAW HISTORY</h6>
                <q-list class="text-white" separator>
                    <br>
                    <q-item clickable v-ripple class="q-py-md" v-for="n in 10" :key="n">
                        <!-- Left Side -->
                        <q-item-section top side>
                            <q-item-label>200.00</q-item-label>
                            <q-item-label class="text-secondary" caption lines="2">Completed</q-item-label>
                        </q-item-section>
                        <q-item-section top>
                            <q-item-label>Gilbert Franco</q-item-label>
                            <q-item-label class="text-secondary" caption lines="2">09778034981</q-item-label>
                        </q-item-section>
                                
                        <!-- Right Side -->
                        <q-item-section side top>
                            <q-item-label class="text-secondary" caption>Today</q-item-label>
                            <q-item-label class="text-secondary" caption>5 min ago</q-item-label>
                        </q-item-section>
                        <q-item-section side top>
                            <q-btn color="primary" style="width:35px;"><span class="material-icons" style="color: black; font-size: 25px;">more_vert</span></q-btn>
                        </q-item-section>
                    </q-item>
                </q-list>
                <q-btn outline rounded color="primary" label="See All" class="full-width" v-ripple to="/all-withdrawals"/> 
            </div>
        </div>
  </q-page>
</template>

<script>
export default {
    data(){
        return {
            withdrawAmount: 0,
            outlet: '',
            options: [
                'GCASH',
                'BANK TRANSFER'
            ]
        }
    }
}
</script>
