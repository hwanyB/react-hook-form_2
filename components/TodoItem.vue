<template>
    <div class="todo-item backdrop--white" :class="{ done }">
        <div class="item__inner item--edit" v-if="isEditMode">
            <input autofocus="true" type="text" :value="editedTitle" @input="editedTitle = $event.target.value"
                @keypress.enter="editedTodo" @keypress.esc="offEditMode" />
            <div class="item__actions">
                <button class="btn btn--primary" key="complete" @click="editedTodo">
                    <i class="material-icons-round">done</i>
                </button>
                <button class="btn" key="cancle" @click="offEditMode">
                    <i class="material-icons-round">clear</i>
                </button>
            </div>
        </div>
        <div class="item__inner item--normal" v-else>
            <label>
                <input v-model="done" type="checkbox" />
                <span class="icon"><i class="material-icons-round">check</i></span>
            </label>
            <div class="item__title-wrap">
                <div class="item__title">
                    {{ todo.title }}
                </div>
                <div class="item__date">
                    {{ computedDate }}
                </div>
            </div>
            <div class="item__actions">
                <button class="btn" key="update" @click="onEditMode">
                    <i class="material-icons-round">edit</i>
                </button>
                <button class="btn btn--danger" key="delete" @click="delelteTodo">
                    <i class="material-icons-round">delete</i>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    props: {
        todo: Object
    },
    data() {
        return {
            isEditMode: false,
            editedTitle: ''
        }
    },
    methods: {
        editedTodo() {
            if (this.todo.title !== this.editedTitle) {
                this.updateTodo({
                    title: this.editedTitle,
                    updatedAt: new Date()
                })
            }
            this.offEditMode()
        },
        onEditMode() {
            this.isEditMode = true
            this.editedTitle = this.todo.title
        },
        offEditMode() {
            this.isEditMode = false

        },
        updateTodo(value) {
            this.$emit('update-todo', this.todo, value)
        },
        delelteTodo() {
            this.$emit('delete-todo', this.todo)
        },
    },
    computed: {
        done: {
            get() {
                return this.todo.done
            },
            set(done) {
                this.updateTodo({
                    done
                })
            }
        },
        computedDate() {
            const date = dayjs(this.todo.createdAt)
            const isSame = date.isSame(this.todo.updatedAt)

            if (isSame) {
                return date.format('YY년 M월 D일 h:mm a')
            } else {
                return `${date.format('YY년 M월 D일 h:mm a')} (edited)`
            }
        }
    }
}
</script>