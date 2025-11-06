<template>

  <HomePageTemplates @show-dialog-category="showDialogCategory" @edit-todo="handleEditTodo"
    @complete-todo="handleCompleteTodo" @toggle-due-today="handleToggleDueToday" />

  <CategorySelectionDialog v-if="isDialogCategoryShown" :building-blocks="store.buildingBlocks"
    :categories="store.categories" @reset-state="resetState" @add-category="saveNewCategory"
    @select-category="selectCategory" @delete-category="removeCategory" />


  <CreateTodoDialog v-if="isDialogCreateUpdate" :category="selectedCategory" :todo="selectedTodo" :dialog-mode="dialogMode"
  @reset-state="resetState" @save-todo="saveTodo" @update-todo="updateTodo" />

</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore'
import { onMounted, ref } from 'vue'
import { type Category, type CreateToDoData, type ToDo, type ToDoCreationDto } from '@/api'
import { useToast } from 'vue-toast-notification'
import CreateTodoDialog from '@/components/organisms/CreateTodoDialog.vue'
import HomePageTemplates from '@/components/templates/HomePageTemplate.vue'
import CategorySelectionDialog from '@/components/organisms/CategorySelectionDialog.vue'
import { DialogModes } from '@/composables/hardLoad'


const store = useTodoStore()
const toast = useToast()

const isDialogCategoryShown = ref(false)
const isDialogCreateUpdate = ref(false)
const dialogMode = ref<DialogModes>()

const selectedCategory = ref<Category>({
  id: 0,
  name: '',
  buildingBlocks: []
})

const selectedTodo = ref<ToDo | undefined>(undefined)

onMounted(() => {
  initialData()
})

function showDialogCategory() {
  isDialogCategoryShown.value = true
}

function resetState() {
  isDialogCategoryShown.value = false
  isDialogCreateUpdate.value = false
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


// ToDo
async function saveTodo(todo: ToDoCreationDto) {
  console.log('Saving Todo...')
  const result = await store.createNewTodo(todo)

  if (result.success) {
    toast.success('Todo successfully created!')
    resetState()
  } else {
    toast.error('Error saving todo')
  }
}

async function updateTodo(todoId: number, updateData: ToDoCreationDto) {
  console.log("update todo")
  const result = await store.updateExistingTodo(todoId, updateData)

  if (result.success) {
    toast.success('Todo successfully updated!')
    resetState()
  } else {
    toast.error('Error updating todo')
  }
}


function handleEditTodo(todo: ToDo) {
  const categoryId = todo.categoryId?.id
  if (!categoryId) {
    toast.error('No category assigned to todo.')
    return
  }
  
  const category = store.getCategoryById(categoryId)
  if (category === null) {
    toast.error('Category not found.')
    return
  }

  selectedCategory.value = category
  selectedTodo.value = todo
  dialogMode.value = DialogModes.UPDATE
  isDialogCreateUpdate.value = true
}


async function handleCompleteTodo(todo: ToDo) {

  if (!todo.id) {
    toast.error('No category assigned to todo.')
    return
  }
  
  const result = await store.setTodoCompleted(todo.id, true)

  if (result.success) {
    toast.success('Todo marked as completed!')
  } else {
    toast.error('Error marking todo as completed')
  }
}

async function handleToggleDueToday(todo: ToDo, value: boolean) {

  if (!todo.id) {
    toast.error('No category assigned to todo.')
    return
  }

  const result = await store.setTodoDueToday(todo.id, value)
  
  if (result.success) {
    const message = result.data?.dueToday ? 'Todo marked for today!' : 'Todo unmarked for today!'
    toast.success(message)
  } else {
    toast.error('Error updating todo')
  }
}



// Category
async function saveNewCategory(categoryName: string, buildingBlockIds: number[], callback: Function) {
  if (categoryName.trim().length == 0) {
    toast.error('The input field cannot be empty.')
    return
  }
  
  const result = await store.createNewCategory(categoryName, buildingBlockIds)

  if (result.success) {
    callback()
  } else if (result.status === 409) {
    toast.info('Category already exists.')
  } else {
    toast.error('Error saving category')
  }
}

async function removeCategory(id: number) {
  const result = await store.deleteCategoryById(id)

  if (result.success) {
    toast.success('Category deleted')
  } else if (result.status === 409) {
    toast.info('Complete and delete all todos in this category and try again.')
  } else {
    toast.error('Error deleting category')
  }
}

function selectCategory(id: number) {
  const foundCategory = store.categories.find(category => category.id == id)
  if (foundCategory) {
    selectedCategory.value = foundCategory
    dialogMode.value = DialogModes.CREATE
    isDialogCategoryShown.value = false
    isDialogCreateUpdate.value = true
  }
}


</script>