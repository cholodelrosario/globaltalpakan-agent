<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <h5 class="text-primary text-weight-bolder q-my-none">Convertion Request</h5>
            <div class="text-white">Click to show details.</div>
        <!-- HISTORY -->
        <div class="q-mt-md">
            <q-list class="text-white" separator bordered>
                <q-item clickable v-ripple class="q-py-md" v-for="n in 9" :key="n" @click="infoDialog = true">
                    <q-item-section top avatar>
                        <q-avatar color="dark" text-color="positive" icon="check" v-if="n % 2 == 0" />
                        <q-avatar color="dark" text-color="negative" icon="close" v-else/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-secondary" caption >Credits</q-item-label>
                        <q-item-label class="text-h6">100{{n}}.0{{n}} </q-item-label>
                    </q-item-section>
                    <q-item-section side top>
                        <q-item-label class="text-secondary" caption>{{n+1}} days ago</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
            <br><br><br>
        </div>
      </div>

      <q-dialog v-model="infoDialog" persistent>
          <q-card class="full-width">
              <q-card-section class="row items-center">
                  <span class="q-ml-sm col-12">Status: Approved</span>
                  <span class="q-ml-sm col-12">Amount: 109.99</span>
                  <span class="q-ml-sm col-12">Submitted: 12:25AM Mar 24,2021</span>
                  <span class="q-ml-sm col-12">Notes: Credit To Play</span>
                  <span class="q-ml-sm col-12">Approved: 12:30AM Mar 24,2021</span>
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
            infoDialog: false,
            infoSelected: null
        }
    }
}
</script>