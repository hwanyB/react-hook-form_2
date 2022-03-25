<template>
    <div>
        <input type="text" :placeholder="placeholder" :value="title" @input="title = $event.target.value" @keypress.enter="createTodo" />
        <button @click="createTodo"><i class="material-icons-round">add_circle</i></button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: '',
            placeholder: '할 일을 추가하세요!!'
        }
    },
    methods: {
        createTodo() {
            const validatedTitle = this.title && this.title.trim()
            if(!validatedTitle){
                alert('유효하지 않은 문자입니다.')
                this.title = this.title.trim()
                return
            }
            this.$emit('create-todo', this.title)
            this.title = ''
        }
    }
}
</script>