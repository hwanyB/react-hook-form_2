<template>
    <div>
        <todo-item />
        <todo-creator />
    </div>
</template>
<script>
import TodoItem from "./TodoItem";
import TodoCreator from "./TodoCreator";

export default {
    components: {
        TodoCreator,
        TodoItem
    }
}
</script>