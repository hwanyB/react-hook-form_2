<template>
    <div class="todo-app">
        <h1>안녕하세요 환희님!</h1>
        <h3>해야 할 일이 {{ activeCount }}개 있습니다.</h3>
        <todo-creator class="todo-app__creator" @create-todo="createTodo" />
        <div class="todo-app__actions">
            <div class="filters">
                <button :class="{ active: filter === 'all' }" @click="changeFilter('all')">모든 항목 ({{ total }})</button>
                <button :class="{ active: filter === 'active' }" @click="changeFilter('active')">해야 할 항목 ({{ activeCount
                }})</button>
                <button :class="{ active: filter === 'completed' }" @click="changeFilter('completed')">완료된 항목 ({{
                        completedCount
                }})</button>
            </div>
            <div class="actions">
                <label class="actions--left">
                    <input v-model="allDone" type="checkbox" />
                    <span class="icon"><i class="material-icons-round">done_all</i></span>
                </label>
                <div class="actions--right">
                    <button class="btn" @click="scrollToTop">
                        <i class="material-icons-round">vertical_align_top</i>
                    </button>
                    <button class="btn" @click="scrollToBottom">
                        <i class="material-icons-round">vertical_align_bottom</i>
                    </button>
                    <button class="btn btn--danger" @click="clearCompleted">
                        <i class="material-icons-round">delete_sweep</i>
                    </button>
                </div>
            </div>
        </div>
        <div class="todo-app__list">
            <todo-item v-for="todo in filteredTodos" :key="todo.id" :todo="todo" @update-todo="updateTodo"
                @delete-todo="deleteTodo" />
        </div>
    </div>
</template>

<script>
import lowdb from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import cryptoRandomString from 'crypto-random-string'
import _cloneDeep from 'lodash/cloneDeep'
import _find from 'lodash/find'
import _assign from 'lodash/assign'
import _findIndex from 'lodash/findIndex'
import _forEachRight from 'lodash/forEachRight'

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
            todos: [],
            filter: 'all'
        }
    },
    computed: {
        filteredTodos() {
            switch (this.filter) {
                case 'all': default:
                    return this.todos
                case 'active':
                    return this.todos.filter(todo => !todo.done)
                case 'completed':
                    return this.todos.filter(todo => todo.done)
            }
        },
        total() {
            return this.todos.length
        },
        activeCount() {
            return this.todos.filter(todo => !todo.done).length
        },
        completedCount() {
            return this.total - this.activeCount
        },
        allDone: {
            get() {
                return this.total === this.completedCount && this.total > 0
            },
            set(checked) {
                this.completeAll(checked)
            }
        }
    },
    created() {
        this.initDB()
    },
    methods: {
        initDB() {
            const adapter = new LocalStorage('todo-app')
            this.db = lowdb(adapter)
            const hasTodos = this.db.has('todos').value()

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
                createdAt: new Date(),
                updatedAt: new Date(),
                done: false,
            }
            this.db.get('todos').push(newTodo).write()
            this.todos.push(newTodo)
        },
        updateTodo(todo, value) {
            this.db.get('todos').find({ id: todo.id }).assign(value).write()
            const foundTodo = _find(this.todos, { id: todo.id })
            _assign(foundTodo, value)
        },
        deleteTodo(todo) {
            this.db.get('todos').remove({ id: todo.id }).write()
            const foundIndex = _findIndex(this.todos, { id: todo.id })
            this.$delete(this.todos, foundIndex)
        },
        changeFilter(filter) {
            this.filter = filter
        },
        completeAll(checked) {
            const newTodos = this.db.get('todos').forEach(todo => {
                todo.done = checked
            }).write()

            this.todos = _cloneDeep(newTodos)
        },
        clearCompleted() {
            _forEachRight(this.todos, todo => {
                if (todo.done) {
                    this.deleteTodo(todo)
                }
            })
        },
        scrollToBottom() {
            scrollTo(
                0,
                document.body.scrollHeight
            )
        },
        scrollToTop() {
            scrollTo(0, 0)
        }
    }
}
</script>
<style lang="scss">
@import "../scss/style";
</style>