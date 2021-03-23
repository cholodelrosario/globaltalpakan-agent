<template>
  <q-page class="flex text-center bg-dark q-pa-md q-py-lg">
    <div class="q-py-xl q-mb-xl">
    <h5 class="full-width text-center text-primary text-weight-bolder q-ma-none">SELECT GAME</h5>
    <div class="full-width text-center text-secondary q-ma-none q-mb-md text-weight-light text-italic">SCROLL FOR MORE GAMES & EVENTS</div>
    <div class="row" :class="$q.platform.is.desktop ? 'q-pa-md' : ''">

      <div class="col-6 q-ma-sm" v-for="n in 8" :key="n" :style="$q.platform.is.desktop ? 'width:15vw;' : 'width:40vw'">
        <!-- <q-card class="bg-dark my-card cursor-pointer">
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          contain
          ratio="1"
        >
        </q-img>
        </q-card> -->
        <q-btn round  @click="$router.push('/event')">
          <q-avatar size="30vw">
            <img src="https://picsum.photos/200/300">
          </q-avatar>
        </q-btn>
        <div class="text-white q-mt-sm">GAME {{n}}</div>
      </div>
    </div>
    </div>
  </q-page>
</template>

<script>
export default {

}
</script>
