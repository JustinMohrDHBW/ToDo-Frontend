<template>
  <div class="done-page">
    <h1 class="page-title">Completed Todos</h1>
    <ItemViewArea>
      <TodoItem 
        v-for="todo in completedTodos" 
        :key="todo.id"
        :todo="todo"
        :show-delete-button="true"
        @edit-todo="handleEditTodo"
        @delete-todo="handleDeleteTodo"
      />
      <State 
        v-if="completedTodos.length === 0" 
        variant="bigScreen"
        message="No completed todos available."
      />
    </ItemViewArea>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useRouter } from 'vue-router'
import ItemViewArea from '@/components/atoms/ItemViewArea.vue'
import TodoItem from '@/components/molecules/TodoItem.vue'
import type { ToDo } from '@/api'
import { deleteToDo, getAllToDos } from '@/api'
import { useToast } from 'vue-toast-notification'
import State from '@/components/atoms/State.vue'

const store = useTodoStore()
const router = useRouter()
const toast = useToast()

const completedTodos = computed(() => {
  return store.todos.filter(todo => todo.completed === true)
})

const handleEditTodo = (todo: ToDo) => {
  // Navigate to home page and open edit dialog
  router.push('/todo')
  // The edit functionality should be handled in HomePage
}

const handleDeleteTodo = async (todo: ToDo) => {
  if (!todo.id) {
    toast.error('Todo ID is missing')
    return
  }

  try {
    const response = await deleteToDo({
      path: {
        id: todo.id
      }
    })

    if (response.response.ok) {
      store.deleteTodo(todo.id)
      toast.success('Todo successfully deleted!')
    } else {
      toast.error('Error deleting todo')
    }
  } catch (error) {
    console.error('Error deleting todo:', error)
    toast.error('Error deleting todo')
  }
}

onMounted(() => {
  // Refresh todos if not loaded
  if (!store.areTodosLoaded) {
    fetchTodos()
  }
})

async function fetchTodos() {
  if (store.areTodosLoaded) {
    return
  }

  const response = await getAllToDos()
  
  if (response.data) {
    const todos: Array<ToDo> = response.data
    for (const todo of todos) {
      // Only add if not already in store
      if (!store.todos.find(t => t.id === todo.id)) {
        store.todos.push(todo)
      }
    }
    store.areTodosLoaded = true
  }
}
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

