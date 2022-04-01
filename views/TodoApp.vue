<template>
    <div class="todo-app">
        <router-link to="/" class="todo-app__to-home" data-sal="fade" style="--sal-duration: 1.5s; --sal-delay:2s;">
            <i class="material-icons-round">home</i>
        </router-link>
        <h1 data-sal="slide-left" style="--sal-duration: 1.5s;">안녕하세요 환희님!</h1>
        <h3 data-sal="slide-left" style="--sal-duration: 1.5s; --sal-delay:0.2s;">해야 할 일이 {{ activeCount }}개 있습니다.</h3>
        <todo-creator data-sal="slide-up" style="--sal-duration: 1.5s; --sal-delay:0.5s;" class="todo-app__creator"
            @create-todo="createTodo" />
        <div data-sal="slide-up" style="--sal-duration: 1.5s; --sal-delay:0.8s;" class="todo-app__actions">
            <div class="filters">
                <router-link to="all" tag="button">모든 항목 ({{ total }})</router-link>
                <router-link to="active" tag="button">해야 할 항목 ({{ activeCount
                }})</router-link>
                <router-link to="completed" tag="button">완료된 항목 ({{
                        completedCount
                }})</router-link>
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
        <div data-sal="slide-down" style="--sal-duration: 1.5s; --sal-delay:1s;" ref="todoAppList"
            class="todo-app__list">
            <todo-item v-for="todo in filteredTodos" :key="todo.id" :todo="todo" @update-todo="updateTodo"
                @delete-todo="deleteTodo" />
        </div>
    </div>
</template>

<script>
import sal from "sal.js"
import TodoItem from "~/components/TodoItem";
import TodoCreator from "~/components/TodoCreator";

export default {
    components: {
        TodoCreator,
        TodoItem
    },
    computed: {
        filteredTodos() {
            switch (this.$route.params.id) {
                case 'all': default:
                    return this.todos
                case 'active':
                    return this.todos.filter(todo => !todo.done)
                case 'completed':
                    return this.todos.filter(todo => todo.done)
            }
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
    mounted() {
        sal()
    },
    methods: {
        scrollToTop() {
            this.$refs.todoAppList.scrollTo(0, 0)
        },
        scrollToBottom() {
            this.$refs.todoAppList.scrollTo(
                0,
                this.$refs.todoAppList.scrollHeight
            )
        },
    },
}
</script>
<style lang="scss">
@import "scss/style";
</style>