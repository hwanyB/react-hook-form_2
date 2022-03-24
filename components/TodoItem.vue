<template>
    <div id="todo-item">
        <div class="item__inner" item--edit v-if="isEditMode">
            <input autofocus="true" type="text" :value="editedTitle" @input="editedTitle = $event.target.value"
                @keypress.enter="editedTodo" @keypress.esc="offEditMode" />
            <div class="item__actions">
                <button key="complete" @click="editedTodo">완료</button>
                <button key="cancle" @click="offEditMode">취소</button>
            </div>
        </div>
        <div class="item__inner" item--normal v-else>
            <input type="checkbox" v-model="done" />
            <div class="item__title-wrap"></div>
            <div class="item__title">
                {{ todo.title }}
            </div>
            <div class="item__date">
                {{ computedDate }}
            </div>
            <div class="item__actions">
                <button key="update" @click="onEditMode">수정</button>
                <button key="delete" @click="delelteTodo">삭제</button>
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
            if(this.todo.title !== this.editedTitle){
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
                return date.format('YY년 M월 D일')
            } else {
                return `${date.format('YY년 M월 D일')} (edited)`
            }
        }
    }
}
</script>