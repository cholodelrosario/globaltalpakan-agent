<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <h5 class="text-primary text-weight-bolder q-mt-none">Convert Commision</h5>

        <div class="text-white q-mt-xl">COMMISION BALANCE: <br>
        <span class="text-primary text-h4"> 0.00 </span>
        </div>
        <br>
        <div class="row ">
            <q-input v-model="convertAmount" type="number" color="dark" label="Amount to Convert" dark standout class="text-capitalize col"/>
            <q-btn color="grey-8" class="col-3 q-ml-md" label="all" @click="onClick" />
        </div>
        
        <br>
        <q-select standout dark v-model="convertMethod" :options="options" label="Convert to" />
        <br>
        <q-input v-model="notes" type="textarea" color="dark" label="Notes" dark standout class="text-capitalize"/>
        <q-btn color="primary" class="text-black q-mt-md full-width" label="Submit Request" />

      </div>
  </q-page>
</template>

<script>
export default {
    data(){
        return {
            convertAmount: 0,
            convertMethod: '',
            notes: '',
            options: [
                'Credits',
                'Debit'
            ]
        }
    }
}
</script>
