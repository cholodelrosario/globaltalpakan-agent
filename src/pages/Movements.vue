<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <h5 class="text-primary text-weight-bolder q-mt-none">Movements</h5>
            <q-tabs
                v-model="tab"
                inline-label
                shrink
                active-color="primary"
                class="bg-dark text-secondary q-mb-md shadow-1"
            >
                <q-tab name="Transferred"  label="Transferred" />
                <q-tab name="RegLink" label="Registration Link" />
            </q-tabs>
            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="Transferred" class="q-pa-none bg-dark">
                    <q-banner class="bg-info text-white">
                        <q-icon name="info" /> List of players transferred as your downline.
                    </q-banner>
                    <q-list dark separator class="bg-dark">   
                        <q-separator   dark />            
                        <q-item clickable v-ripple v-for="(n,index) in options" :key="index">
                            <q-item-section><q-icon name="lock_open" color="grey" />{{n}}</q-item-section>
                            <q-item-section side top>
                                <q-item-label caption>03/24<br>11:20PM</q-item-label>
                            </q-item-section>
                        </q-item>
    
                    </q-list>
                </q-tab-panel>
                <q-tab-panel name="RegLink" class="q-pa-none bg-dark">
                    <q-banner class="bg-info text-white">
                        <q-icon name="info" /> List of players registered using your invitation link.
                    </q-banner>
                    <q-list dark separator class="bg-dark">   
                        <q-separator   dark />            
                        <q-item clickable v-ripple v-for="(n,index) in options" :key="index">
                            <q-item-section><q-icon name="lock" />{{n}}</q-item-section>
                        </q-item>
                    </q-list>
                </q-tab-panel>
            </q-tab-panels>
        </div>

  </q-page>
</template>
<script>
export default {
    data(){
        return{
            tab: 'Transferred',
            options: [
                '09657059405 / JOHN DOE ',
                '09657059423 / JANE DOE ',
                '09999999923 / JEW DOE '
            ]
        }
    }
}
</script>