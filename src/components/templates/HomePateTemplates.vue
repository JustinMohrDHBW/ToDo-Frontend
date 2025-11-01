<template>
    <OptionsBar 
      @showDialogCategory="switchDialogShowState"
      v-model:sortBy="sortBy"
      v-model:filterDueToday="filterDueToday"
      v-model:selectedCategoryId="selectedCategoryId"
    />
    <ItemViewArea>
      <TodoItem 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        :todo="todo"
        @edit-todo="handleEditTodo"
        @complete-todo="handleCompleteTodo"
      />
      <div v-if="filteredTodos.length === 0" class="empty-state">
        <p class="empty-message">Super, keine offenen todos!</p>
      </div>
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

const store = useTodoStore()

const sortBy = ref<string>('Priority')
const filterDueToday = ref<boolean>(false)
const selectedCategoryId = ref<string>('Alle')

const activeTodos = computed(() => {
  return store.todos.filter(todo => !todo.completed)
})

const filteredTodos = computed(() => {
  let filtered = [...activeTodos.value]

  console.log(JSON.stringify(filtered))
  
  // Filter by category
  if (selectedCategoryId.value !== 'Alle') {
    filtered = filtered.filter(todo => {
      return store.getCategoryById(todo.categoryId!.id)?.name === selectedCategoryId.value
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
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-message {
  font-size: 20px;
  font-weight: 600;
  color: #10b981;
  margin: 0;
}
</style>