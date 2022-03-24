<template>
    <div id="todo-item">
        <input type="checkbox" v-model="done" />
        <div class="item__title-wrap"></div>
            <div class="item__title">
                {{ todo.title }}
            </div>
            <div class="item__date">
                {{ computedDate }}
            </div>
        <div class="item__actions">
            <button @click="onEditMode">수정</button>
            <button @click="delelteTodo">삭제</button>
        </div>
    </div>
</template>
<script>
    import dayjs from 'dayjs'
    export default {
        props: {
            todo: Object
        },
        methods: {
            onEditMode () {

            },
            offEditMode () {

            },
            updateTodo (value){
                this.$emit('update-todo', this.todo, value)
            },
            delelteTodo () {
                this.$emit('delete-todo', this.todo)
            },
        },
        computed: {
            done: {
                get(){
                    return this.todo.done
                },
                set(done){
                    this.updateTodo({
                        done
                    })
                }
            },
            computedDate () {
                const date = dayjs(this.todo.createdAt)
                const isSame = date.isSame(this.todo.updatedAt)

                if (isSame){
                    return date.format('YY년 M월 D일')
                } else {
                    return `${date.format('YY년 M월 D일')} (edited)`
                }
            }
        }
    }
</script>