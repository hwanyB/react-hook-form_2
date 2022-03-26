import Vue from 'vue'
import App from './App'
import sal from 'sal.js'
import router from './router'
import "./node_modules/sal.js/dist/sal.css"

new Vue({
    created(){
        sal.init()
    },
    el: '#app',
    router,
    render: h => h(App)
})