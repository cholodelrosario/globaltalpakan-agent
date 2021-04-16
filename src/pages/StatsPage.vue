<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <div class="row">
                <div><h5 class="text-primary text-weight-bolder q-mt-none">STATS</h5></div>
                <q-space></q-space>
                <div class="text-white"><q-icon name="account_balance_wallet"  size="sm"/> CREDITS : 0.00 </div>
            </div>
            <div class="row">
                <div>
                    <span class="selectedDates text-primary">{{startDate}} <span v-if="startDate&&endDate">6AM</span> </span><span class="selectedDates" style="color: white;" v-if="startDate&&endDate"> to </span><span class="selectedDates text-primary"> {{endDate}} <span v-if="startDate&&endDate">6AM</span></span>  
                </div>
                <q-space></q-space>
                <div>
                    <span class="change" @click="alert = true">Change</span>
                </div>
            </div>
            <q-table
                :data="data"
                :columns="columns"
                row-key="name"
                dark
                hide-bottom
            />
   
            <br><br><br>
        
        </div>
        <q-dialog v-model="alert" persistent>
            <q-card>
                <q-card-section><div class="text-h6">Select Date Range</div></q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="q-pa-md" style="max-width: 300px">
                        <q-input filled v-model="selectedStartDate" label="Start Date" stack-label disable>
                            <template v-slot:after>
                                <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-date v-model="selectedStartDate" mask="MMM D">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                    </q-date>
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </div>

                    <div class="q-pa-md" style="max-width: 300px">
                        <q-input filled v-model="selectedEndDate" label="End Date" stack-label disable>
                            <template v-slot:after>
                                <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-date v-model="selectedEndDate" mask="MMM D">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                    </q-date>
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" @click="applyDates()" v-close-popup :disable="selectedStartDate&&selectedEndDate"/>
                    <q-btn flat label="Cancel" color="primary" @click="cancelDates()" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
export default {
    data(){
        return {
            alert: false,
            selectedStartDate: "",
            selectedEndDate: "",
            startDate: "",
            endDate: "",
            columns: [
               {
                    name: 'desc',
                    required: true,
                    label: 'Date',
                    align: 'center',
                    field: row => row.date,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'Commision',
                    label: 'Commision',
                    field: 'commision',
                    align: 'center',
                },
                {
                    name: 'MTD',
                    label: 'MTD*',
                    field: 'mtd',
                    align: 'center',
                },
            ],
            data: [
                {
                    date: '04/08-04/09',
                    commision: 0.00,
                    mtd: 84.7,
                },
                {
                    date: '04/08-04/09',
                    commision: 0.00,
                    mtd: 84.7,
                },
                {
                    date: '04/08-04/09',
                    commision: 0.00,
                    mtd: 84.7,
                },
                {
                    date: '04/08-04/09',
                    commision: 0.00,
                    mtd: 84.7,
                },
                {
                    date: '04/08-04/09',
                    commision: 0.00,
                    mtd: 84.7,
                },
            ]
        }
    },
    methods: {
        applyDates () {
            this.startDate = this.selectedStartDate
            this.endDate = this.selectedEndDate
        },
        cancelDates (){
            this.selectedStartDate = ""
            this.selectedEndDate = ""
        }
    }
}
</script>
<style scoped>
.selectedDates {
font-size: 20px;
}
.change{
font-size: 16px;
color: white;
text-decoration: underline;
cursor: pointer;
}
</style>
