<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          
        </q-toolbar-title>

        <div class="text-white">₱ 0.00 <q-icon name="local_offer"  size="sm"/></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[90, 19]">
        <q-btn fab color="purple-6" icon="star" @click="dialog = true"></q-btn>
      </q-page-sticky>
      <q-dialog
        v-model="dialog"
        persistent
        maximized
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="bg-dark text-white">
        <div class="flex text-center bg-dark q-pa-md q-py-lg">
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
          <q-btn class="q-mt-md text-black" fab color="primary" icon="close" @click="dialog = false"></q-btn>
          </div>
          
        </div>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/6058aab7067c2605c0bb0d86/1f1d5lnue';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
  })();

import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {

      dialog: false,
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
