<template>
  <q-page class="container bg-dark">
    <div>
      <iframe
        class="full-width"
        :height="$q.platform.is.desktop ? '554' : '315'"
        src="https://www.youtube.com/embed/055bkx3Tvzk" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
    <!-- title -->
    <div class="q-pa-sm">
      <q-item class="text-white">
        <q-item-section>
          <q-item-label class="text-h6">GAME #1</q-item-label>
          <q-item-label class="text-secondary text-overline" lines="3">
            <q-badge size="md" class="text-black q-mr-sm" color="primary" label="MIRROR" />
            MPL LEAGUE
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label class="text-white">CLOSED <q-icon name="circle" /></q-item-label>
        </q-item-section>
      </q-item>      
    </div>
    <!-- meron o wala -->
    <div class="row">
      <q-card class="my-card col-6 bg-blue-10 text-white text-center" flat square>
        <q-card-section>
          <div class="text-h6">TEAM BLUE</div>
          <div class="text-subtitle2">GGBOYS</div>
        </q-card-section>
        <q-card-section class="bg-blue-8">
          <div class="text-h5">₱ 10,900.50</div>
          <div class="text-subtitle2">300.00%</div>
          <q-btn color="dark" label="BET" @click="onClick" class="full-width q-mt-sm"/>
        </q-card-section>
      </q-card>
      <q-card class="my-card col-6 bg-red-10 text-white text-center" flat square>
        <q-card-section>
          <div class="text-h6">TEAM RED</div>
          <div class="text-subtitle2">GGGIRLS</div>
        </q-card-section>
        <q-card-section class="bg-red-8">
          <div class="text-h5">₱ 900.50</div>
          <div class="text-subtitle2">100.47%</div>
          <q-btn color="dark" label="BET" @click="onClick" class="full-width q-mt-sm"/>
        </q-card-section>
      </q-card>
    </div>
    <!-- trends -->
    <div class="text-white q-pa-md q-pb-xl">
      <div class="text-overline">TRENDS</div>
      <q-scroll-area
        horizontal
        style="height: 210px; width: 100%;"
      >
        <div class="row no-wrap">
          <div v-for="n in 10" :key="n" style="width: 150px" class="q-pa-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto fuga quae veritatis blanditiis sequi id expedita amet esse aspernatur! Iure, doloribus!
          </div>
        </div>        
      </q-scroll-area>
    </div>
    <div class="q-py-md">
      &nbsp;
    </div>

  </q-page>
</template>

<script>
export default {

}
</script>
