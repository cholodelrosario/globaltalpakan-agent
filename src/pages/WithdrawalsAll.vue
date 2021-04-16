<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <div class="row">
                <div><h5 class="text-primary text-weight-bolder q-mt-none"><router-link to="/withdrawals" style="display: inline-block;text-decoration:none;"><span class="material-icons">arrow_back</span></router-link> ALL WITHDRAWALS</h5></div>
                <q-space></q-space>
                <div class="text-white"><q-icon name="account_balance_wallet"  size="sm"/> CREDITS : 0.00</div>
            </div>
            <div class="row">
                <div class="col-xs">
                    <q-btn-toggle
                    v-model="selectedFilter"
                    no-caps
                    rounded
                    elevated
                    toggle-color="primary"
                    color="dark"
                    text-color="primary"
                    :options="chips"
                    />
                </div>
            </div>
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
            <br><br><br>
        </div>
    </q-page>
</template>

<script>
export default {
    data(){
        return {
            withdrawAmount: 0,
            outlet: '',
            chips: [
                {label: 'All', value: 'All'},
                {label: 'Visible', value: 'Visible'},
                {label: 'Hidden', value: 'Hidden'},
                {label: 'Sales', value: 'Sales'},
                {label: 'Purchases', value: 'Purchases'},
            ],
            selectedFilter: ""
        }
    }
}
</script>
<style scoped>
.material-icons {
    color: #fde03a;
}
</style>

