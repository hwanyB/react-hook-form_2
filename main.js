import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import "./node_modules/sal.js/dist/sal.css"

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})