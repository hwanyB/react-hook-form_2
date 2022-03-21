<template>
    <div>
        <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" />
        <todo-creator @create-todo="createTodo" />
    </div>
</template>
<script>
import lowdb from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import cryptoRandomString from 'crypto-random-string'
import _cloneDeep from 'lodash/cloneDeep'

import TodoItem from "./TodoItem";
import TodoCreator from "./TodoCreator";

export default {
    components: {
        TodoCreator,
        TodoItem
    },
    data() {
        return {
            db: null,
            todos: []
        }
    },
    created() {
        this.initDB()
    },
    methods: {
        initDB() {
            const adapter = new LocalStorage('todo-app')
            const hasTodos = this.has('todos').value()
            this.db = lowdb(adapter)

            if (hasTodos) {
                this.todos = _cloneDeep(this.db.getState().todos)
            } else {
                this.db.defaults({
                    todos: []
                }).write()
            }


        },
        createTodo(title) {
            const newTodo = {
                id: cryptoRandomString({ length: 10 }),
                title,
                createAt: new Date(),
                updatedAt: new Date(),
                done: false,
            }
            this.db.get('todos').push(newTodo).write()
        }
    }
}
</script>