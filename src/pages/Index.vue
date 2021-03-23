<template>
  <q-page class="flex flex-center bg-dark">
    <q-img
        :style="$q.platform.is.desktop ? 'width:30vw;' : 'width:90vw'"
        src="~assets/globaltalpakan-sample.png"
        spinner-color="primary"
        spinner-size="82px"
        contain
        class="col-12"
    />
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
