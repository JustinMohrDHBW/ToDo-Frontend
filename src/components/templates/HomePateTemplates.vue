<template>
    <OptionsBar @showDialogCategory="switchDialogShoState"/>
    <ItemViewArea>
      <TodoItem 
        v-for="todo in store.todos" 
        :key="todo.id"
        :todo="todo"
      />
    </ItemViewArea>

</template>


<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore'
import ItemViewArea from '@/components/atoms/ItemViewArea.vue';
import TodoItem from '@/components/molecules/TodoItem.vue';
import OptionsBar from '../organisms/OptionsBar.vue';

const store = useTodoStore()

const emits = defineEmits(['showDialogCategory'])

function switchDialogShoState() {
    emits('showDialogCategory')
}

</script>


<style scoped>


</style>