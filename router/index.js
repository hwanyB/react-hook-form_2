import Vue from 'vue'
import VueRouter from 'vue-router'

import TodoApp from '~/views/TodoApp'

Vue.use(VueRouter)

const routes = [
    {
        name: 'index',
        path: '/',
        redirect: '/all',
        component: TodoApp,
        children: [
            {
                name: 'todos-filter',
                path: ':id'
            }
        ]
    }
]

export default new VueRouter({
    routes
})