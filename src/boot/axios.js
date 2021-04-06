import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
  Vue.prototype.$lodash = _
  Vue.prototype.$moment = moment

}