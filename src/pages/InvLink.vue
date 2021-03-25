<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <h5 class="text-primary text-weight-bolder q-mt-none">Invitation Link</h5>
            <br>
            <q-card class="my-card text-center q-pa-md">
                Use this link to recruit downlines.
                Screenshot and share QR CODE / Send them the link below.
                <qrcode value="https://globaltalpakan.com/r/QWERTY1" :options="{ width: 200 }"></qrcode>
                <q-card-section>
                    <q-list bordered class="q-pa-md">
                        <q-item-label caption lines="2">https://globaltalpakan.com/r/QWERTY1</q-item-label>
                    </q-list>
                </q-card-section>
                <q-card-actions vertical align="center">
                    <q-btn color="primary" class="text-black full-width" label="Copy Link" />
                    <br>
                    <q-btn flat class="text-grey-8 full-width" label="back to dashboard"  icon="arrow_left" @click="$router.push('/agent')"/>
                </q-card-actions>
            </q-card>
            
           
        </div>
    </q-page>
</template>
<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import Vue from 'vue'

Vue.component(VueQrcode.name, VueQrcode);
export default {
    
}
</script>