<template>
  <div class="done-page">
    <h1 class="page-title">Completed Todos</h1>
    <ItemViewArea>
      <TodoItem v-for="todo in completedTodos" :key="todo.id" :todo="todo" :show-delete-button="true"
        @edit-todo="showTodoDialog" @delete-todo="handleDeleteTodo" />
      <State v-if="completedTodos.length === 0" variant="bigScreen" message="No completed todos available." />
    </ItemViewArea>
  </div>

  <CreateTodoDialog v-if="isPutBackDialog" :category="selectedCategory" :todo="selectedTodo" :dialog-mode="DialogModes.PUTBACK"
  @reset-state="resetState" @save-todo="{}" @update-todo="putBack" />

</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useRouter } from 'vue-router'
import ItemViewArea from '@/components/atoms/ItemViewArea.vue'
import TodoItem from '@/components/molecules/TodoItem.vue'
import type { Category, ToDo, ToDoCreationDto } from '@/api'
import { deleteToDo, getAllToDos, updateLinkData } from '@/api'
import { useToast } from 'vue-toast-notification'
import State from '@/components/atoms/State.vue'
import CreateTodoDialog from '@/components/organisms/CreateTodoDialog.vue'
import { DialogModes } from '@/composables/hardLoad'

const store = useTodoStore()
const toast = useToast()


onMounted(() => {
  initialData()
})


const isPutBackDialog = ref(false)
const selectedTodo = ref<ToDo | undefined>(undefined)
  const selectedCategory = ref<Category>({
  id: 0,
  name: '',
  buildingBlocks: []
});


const completedTodos = computed(() => {
  return store.todos.filter(todo => todo.completed === true)
})



// Load
async function initialData(){
  try {
    await Promise.all([
      store.loadCategories(),
      store.loadBuildingBlocks(),
      store.loadTodos()
    ])
  }catch {
    toast.error('Could not load data. Please try again later.')
  }
}


function resetState() {
  isPutBackDialog.value = false
  selectedTodo.value = undefined
}


const showTodoDialog = (todo: ToDo) => {
  console.log("pressed on item: ", todo)

  const categoryId = todo.categoryId?.id;

  if (!categoryId) {
    toast.error('No category assigned to todo.');
    return;
  }

  const category = store.getCategoryById(categoryId);

  if (category === null) {
    toast.error(`Category not found.`);
    return;
  }
  
  selectedCategory.value = category
  selectedTodo.value = todo
  isPutBackDialog.value = true
}


async function putBack(todoId: number, updateData: ToDoCreationDto){
  console.log("putback: ", updateData)

  console.log("update todo")

  const updateLinkDataDto = {
    priority: updateData.priority,
    dueToday: updateData.dueToday,
    title: updateData.title,
    buildingBlockData: updateData.buildingBlockData?.map(block => ({
      buildingBlockId: block.buildingBlockId,
      dataValue: block.dataValue
    }))
  }
  console.log(JSON.stringify(updateLinkDataDto))

  const response = await updateLinkData({
    path: {
      id: todoId
    },
    body: updateLinkDataDto
  })

  if (response.response.ok && response.data) {
    store.updateTodo(todoId, response.data)
    store.updateTodo(todoId, {completed: false})
    toast.success('Todo successfully updated!')
    resetState()
  } else {
    toast.error('Error updating todo')
  }

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
    const todos: ToDo[] = response.data
    for (const todo of todos) {
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
