<template>
  <q-page class="flex flex-center bg-dark">
    <div class="container">
    <q-img
        :style="$q.platform.is.desktop ? 'width:30vw;' : 'width:90vw'"
        src="~assets/globaltalpakan-sample.png"
        spinner-color="primary"
        spinner-size="82px"
        contain
        class="col-12"
    />
    <br>
    <q-btn :style="$q.platform.is.desktop ? 'width:30vw;' : 'width:90vw'" color="primary" class="text-black q-mt-md col-12" label="Login"  @click="$router.push('/enter')"/>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
