<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <h5 class="text-primary text-weight-bolder q-mt-none">WITHDRAWALS</h5>

        <div class="text-white q-mt-xl"><q-icon name="account_balance_wallet"  size="sm"/> CREDITS : 0.00 </div>
        <br>
        <q-input v-model="withdrawAmount" type="number" color="dark" label="Withdraw Amount" dark standout class="text-capitalize"/>
        <br>
        <q-select standout dark v-model="outlet" :options="options" label="Outlet" />
        <q-btn color="primary" class="text-black q-mt-md full-width" label="Submit" />

        <!-- HISTORY -->
        <div class="q-mt-lg q-pt-lg">
            <h6 class="text-secondary q-ma-none">WITHDRAW HISTORY</h6>
            <q-list class="text-white" separator>
                <br>
                <q-item clickable v-ripple class="q-py-md" v-for="n in 10" :key="n">
                    <q-item-section>
                        <q-item-label>Single line item</q-item-label>
                        <q-item-label class="text-secondary" caption lines="2">Secondary line text.</q-item-label>
                    </q-item-section>
                    <q-item-section side top>
                        <q-item-label class="text-secondary" caption>5 min ago</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
            <br><br><br>
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
