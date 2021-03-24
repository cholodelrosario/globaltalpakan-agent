<template>
  <q-page class="flex container q-pa-lg bg-dark">
      <div class="full-width">
        <h5 class="text-primary text-weight-bolder q-mt-none">COMMISSION</h5>
        <q-list>
            <q-item class="bg-primary text-black q-pa-md">
                <q-item-section class="text-h6">
                    <q-item-label>100.98</q-item-label>
                    <q-item-label caption lines="2">Commission<br> Balance</q-item-label>
                </q-item-section>
                <q-item-section class="text-h6">
                    <q-item-label>10,000.50</q-item-label>
                    <q-item-label caption lines="2">Commission <br>(Month to Date)</q-item-label>
                </q-item-section>
            </q-item>
            <q-item dark class="">
                <q-item-section>
                    <q-item-label caption lines="2">Commision computed: 02:22AM </q-item-label>
                </q-item-section>
            </q-item>
            <q-item dark class="bg-grey-8 q-pa-md">
                <q-item-section>
                    <q-item-label caption lines="2">Main Coor: 
                        <span class="text-primary q-ml-sm">Master Agent</span>
                    </q-item-label>
                    <q-item-label caption lines="2">Commission: 
                        <span class="q-ml-sm">1.00% of bets</span>
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
        <div class="container row q-gutter-sm q-mt-sm">
            <q-btn color="primary" class="text-black col" label="Send Credits" icon="send"/>
            <q-btn color="primary" class="text-black col" label="Withdrawals" icon="credit_card"/>
        </div>
        <div class="container row q-gutter-sm q-mt-sm">
            <q-btn color="primary" class="text-black col" label="Inv. Link" icon="mail"/>
            <q-btn color="primary" class="text-black col" label="Convert" icon="sync"/>
        </div>
        <!-- DOWNLINES -->
        <div class="q-mt-lg q-pt-lg">
            <h6 class="text-secondary q-ma-none">Top Downlines</h6>
            <q-list class="text-white" separator>
                <q-item class="q-py-none">
                    <q-item-section>
                        <q-item-label class="text-white" caption lines="2">Downline</q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-secondary text-right" caption>MTD Comm</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple class="q-py-md" v-for="n in 9" :key="n">
                    <q-item-section>
                        <q-item-label class="text-white" caption lines="2">0999987685{{n}} / Player {{n}}</q-item-label>
                    </q-item-section>
                        <q-item-section>
                            <q-item-label class="text-secondary text-right" caption>{{n}},00{{n}}.0{{n}}</q-item-label>
                        </q-item-section>
                    <q-item-section side>
                        <q-btn color="primary" icon="send" class="text-black" size="md"  />
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
