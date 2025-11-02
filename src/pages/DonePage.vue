<template>
  <div class="done-page">
    <h1 class="page-title">Completed Todos</h1>
    <ItemViewArea>
      <TodoItem v-for="todo in completedTodos" :key="todo.id" :todo="todo" :show-delete-button="true"
        @edit-todo="showTodoDialog" @delete-todo="deleteTodo" />
      <State v-if="completedTodos.length === 0" variant="bigScreen" message="No completed todos available." />
    </ItemViewArea>
  </div>

  <CreateTodoDialog v-if="isPutBackDialog" :category="selectedCategory" :todo="selectedTodo" :dialog-mode="DialogModes.PUTBACK"
  @reset-state="resetState" @save-todo="{}" @update-todo="putBackTodo" />

</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useRouter } from 'vue-router'
import ItemViewArea from '@/components/atoms/ItemViewArea.vue'
import TodoItem from '@/components/molecules/TodoItem.vue'
import type { Category, ToDo, ToDoCreationDto } from '@/api'
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


function resetState() {
  isPutBackDialog.value = false
  selectedTodo.value = undefined
}



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


const showTodoDialog = (todo: ToDo) => {
  console.log("pressed on item: ", todo);
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

  selectedCategory.value = category;
  selectedTodo.value = todo;
  isPutBackDialog.value = true;
};


async function putBackTodo(todoId: number, updateData: ToDoCreationDto) {
  console.log("put todo back")

  updateData.completed = false
  console.log(updateData)

  const result = await store.updateExistingTodo(todoId, updateData)

  if (result.success) {
    toast.success('Todo successfully updated and put back!')
    resetState()
  } else {
    toast.error('Error updating todo')
  }

}


async function deleteTodo(todo: ToDo) {

  const todoId = todo.id

  if (!todoId) {
    toast.error('No Todo ID.');
    return;
  }

  const result = await store.deleteExistingTodo(todoId);

  if (result.success) {
    toast.success('Todo successfully deleted!');
  } else {
    toast.error('Error deleting todo');
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
