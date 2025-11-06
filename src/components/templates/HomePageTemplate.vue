<template>
    <OptionsBar @showDialogCategory="switchDialogShowState" v-model:sortBy="sortBy"
      v-model:filterDueToday="filterDueToday" v-model:selectedCategoryId="selectedCategoryId" />

    <ItemFrameHeader />

    <ItemViewArea>
      <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" @edit-todo="handleEditTodo"
        @complete-todo="handleCompleteTodo" @toggle-due-today="handleToggleDueToday" />
      <State v-if="store.areTodosLoaded && filteredTodos.length === 0" variant="bigScreenCongratulations"
        message="Great, no open todos!" />
      <State v-else-if="!store.areTodosLoaded" variant="bigScreen" message="Loading todos..." />
    </ItemViewArea>

</template>


<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import ItemViewArea from '@/components/atoms/ItemViewArea.vue';
import TodoItem from '@/components/molecules/TodoItem.vue';
import OptionsBar from '../organisms/OptionsBar.vue';
import type { ToDo } from '@/api';
import { priorityArray } from '@/composables/hardLoad';
import State from '../atoms/State.vue';
import ItemFrameHeader from '../molecules/ItemFrameHeader.vue';

const store = useTodoStore()

const sortBy = ref<string>('Priority')
const filterDueToday = ref<boolean>(false)
const selectedCategoryId = ref<string>('All')

const activeTodos = computed(() => {
  return store.todos.filter(todo => !todo.completed)
})

const filteredTodos = computed(() => {
  let filtered = [...activeTodos.value]

  // Filter by category
  if (selectedCategoryId.value !== 'All') {
    filtered = filtered.filter(todo => {
      if (!todo.categoryId) return false

      const categoryId = store.getCategoryById(todo.categoryId.id!)
      return categoryId?.name === selectedCategoryId.value
    })
  }

  // Filter by dueToday if checkbox is checked
  if (filterDueToday.value) {
    filtered = filtered.filter(todo => todo.dueToday === true)
  }

  // Sort by selected option
  if (sortBy.value === 'Priority') {

    const getPriorityValue = (priorityName: string): number => {
      const priorityObj = priorityArray.find(p => p.name === priorityName);
      return priorityObj ? priorityObj.priority : 1;
    };

    filtered.sort((a, b) => {
      const aValue = getPriorityValue(a.priority || 'LOW');
      const bValue = getPriorityValue(b.priority || 'LOW');

      return bValue - aValue;
    });

  } else if (sortBy.value === 'Name') {
    filtered.sort((a, b) => {
      const aName = typeof a.categoryId === 'object'
        ? (a.categoryId?.name || '')
        : ''
      const bName = typeof b.categoryId === 'object'
        ? (b.categoryId?.name || '')
        : ''
      return aName.localeCompare(bName)
    })
  }

  return filtered
})

const emits = defineEmits(['showDialogCategory', 'edit-todo', 'complete-todo', 'toggle-due-today'])

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

function handleToggleDueToday(todo: ToDo, value: boolean) {
  emits('toggle-due-today', todo, value)
}

</script>

<style scoped>
</style>