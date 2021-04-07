<template>
    <q-page class="flex container q-pa-lg bg-dark">
        <div class="full-width">
            <h5 class="text-primary text-weight-bolder q-mt-none q-mb-sm">Downlines</h5>
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