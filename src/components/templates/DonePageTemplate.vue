<template>
    <div class="done-page">
      <h1 class="page-title">Completed Todos</h1>
  
      <ItemViewArea/>
  
      <ItemViewArea>
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" :show-delete-button="true"
          @edit-todo="$emit('edit-todo', todo)" 
          @delete-todo="$emit('delete-todo', todo)" 
          @uncomplete-todo="$emit('uncomplete-todo', todo)"/>
        <State v-if="todos.length === 0" variant="bigScreen" message="No completed todos available." />
      </ItemViewArea>
    </div>
  </template>

<script setup lang="ts">
import ItemViewArea from '../atoms/ItemViewArea.vue';
import State from '../atoms/State.vue';
import TodoItem from '../molecules/TodoItem.vue';
import type { ToDo } from '@/api';

const props = defineProps<{
  todos: ToDo[];
}>();

defineEmits(['edit-todo', 'delete-todo', 'uncomplete-todo'])


</script>


<style scoped>
.done-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 24px 0;
}
</style>