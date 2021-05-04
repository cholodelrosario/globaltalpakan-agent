<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <h5 class="text-primary text-weight-bolder q-my-none">Convertion Request</h5>
            <div class="text-white">Click to show details.</div>
        <!-- HISTORY -->
        <div class="q-mt-md">
              <q-list class="text-white" separator bordered>
                <q-item clickable v-ripple class="q-py-md" v-for="(p, index) in this.getData" :key="index" @click="openData(p)">
                    <q-item-section top avatar>
                        <q-avatar color="dark" text-color="positive" icon="check" v-if="p.status == true" />
                        <q-avatar color="dark" text-color="negative" icon="close" v-else/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-secondary" caption >Credits</q-item-label>
                        <q-item-label class="text-h6">₱&nbsp;{{p.amount}} </q-item-label>
                    </q-item-section>
                    <q-item-section top>
                        <q-item-label class="text-secondary" caption>{{p.timestamp.toDate()}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
            <div class="q-pa-lg flex flex-center">
                <q-pagination
                    v-model="page"
                    :min="currentPage"
                    :max="Math.ceil(this.orderByComms.length/totalPages)"
                    direction-links
                    unelevated
                    color="black"
                    active-color="yellow"
                    active-text-color="black"
                />
            </div>
            <br><br><br>
        </div>
      </div>

      <q-dialog v-model="infoDialog" persistent>
          <q-card class="full-width bg-dark text-white">
              <q-card-section class="row items-center">
                  <span class="q-ml-sm col-12">Status: {{this.status == true ? 'Approved' : 'Pending'}}</span>
                  <span class="q-ml-sm col-12">Amount: {{this.amount}}</span>
                  <span class="q-ml-sm col-12">Submitted: {{this.dateTime}}</span>
                  <span class="q-ml-sm col-12">Notes: {{this.notes}}</span>
                  <span class="q-ml-sm col-12">Approved: {{this.dateApprove}}</span>
              </q-card-section>
              <q-card-actions align="right">
                  <q-btn label="close" color="dark" v-close-popup />
              </q-card-actions>
          </q-card>
      </q-dialog>
  </q-page>
</template>
<script>
export default {
    data(){
        return{
            dateApprove: new Date(),
            notes: '',
            dateTime: new Date(),
            amount: 0,
            status: false,
            page: 1,
            currentPage:1,
            nextPage: null,
            totalPages:10,
            ConvertionObj: null,
            infoDialog: false,
            infoSelected: null
        }
    },
    methods: {
        openData(data){
            this.dateApprove = data.status == false ? 'Pending' : data.approveDate.toDate()
            this.notes = data.note
            this.dateTime = data.timestamp.toDate()
            this.amount = data.amount
            this.status = data.status
            this.infoDialog = true
        }
    },
    computed:{
        getData(){
			return 	this.orderByComms.slice((this.page-1)*this.totalPages,(this.page-1)*this.totalPages+this.totalPages)
        },
        orderByComms(){
            let orderByP = this.$lodash.orderBy(this.ConvertionObj, ['timestamp'], ['desc']);
            return orderByP
        }
    },
    mounted(){
        let user = this.$store.getters['useraccount/isAuthenticated']
        // console.log(user,'user')
        this.$binding("ConvertionObj", this.$db.collection("AgentConvertion").where("agentKey", "==", user.uid))
        .then((agent) => {
            // console.log(agent,'agent') // => __ob__: Observer
        }).catch(err => {
            // console.error(err)
        })
    }
}
</script>