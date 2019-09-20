import layoutAside from '../components/home/layout-aside'
import layoutHeader from '../components/home/layout-header'
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
  }
}
