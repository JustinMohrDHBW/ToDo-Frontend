<template>
    <OptionsBar @showDialogCategory="switchDialogShowState"/>
    <ItemViewArea>
      <TodoItem 
        v-for="todo in store.todos" 
        :key="todo.id"
        :todo="todo"
        @edit-todo="handleEditTodo"
        @complete-todo="handleCompleteTodo"
      />
    </ItemViewArea>

</template>


<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore'
import ItemViewArea from '@/components/atoms/ItemViewArea.vue';
import TodoItem from '@/components/molecules/TodoItem.vue';
import OptionsBar from '../organisms/OptionsBar.vue';
import type { ToDo } from '@/api';

const store = useTodoStore()

const emits = defineEmits(['showDialogCategory', 'edit-todo', 'complete-todo'])

function switchDialogShowState() {
    emits('showDialogCategory')
}

function handleEditTodo(todo: ToDo) {
  console.log('todo:', JSON.stringify(todo))
    emits('edit-todo', todo)
}

function handleCompleteTodo(todo: ToDo) {
    emits('complete-todo', todo)
}

</script>


<style scoped>


</style>