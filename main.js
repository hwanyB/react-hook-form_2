import Vue from 'vue'
import App from './App'
import sal from 'sal.js'
import "./node_modules/sal.js/dist/sal.css"

new Vue({
    created(){
        sal.init()
    },
    el: '#app',
    render: h => h(App)
})