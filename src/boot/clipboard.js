import Vue from 'vue'
import Clipboard from 'v-clipboard'
export default async ({ Vue }) => {
    Vue.prototype.$clipboard = Clipboard
    Vue.use(Clipboard)
}   