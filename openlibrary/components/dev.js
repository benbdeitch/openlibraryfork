import Vue from 'vue'
import BulkSearch from './BulkSearch.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(BulkSearch),
}).$mount('#app')
