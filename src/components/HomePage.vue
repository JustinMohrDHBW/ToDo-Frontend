<template>

  <HomePateTemplates @show-dialog-category="showDialogCategory" />

  <CategorySelectionDialog v-if="isDialogCategoryShown"
  :building-blocks="store.buildingBlocks"
  :categories="store.categories"

  @reset-state="resetState"
  @add-category="saveNewCategory"
  @select-category="selectCategory" 
  @delete-category="removeCategory" />


  <CreateTodoDialog v-if="isDialogBuildingBlocksShown"
  :category="selectedCategory"
  @reset-state="resetState"
  @save-todo="saveTodo" />

</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore';
import { onMounted, ref, type Ref } from 'vue';
import HomePateTemplates from './templates/HomePateTemplates.vue';
import { addCategory, createToDo, deleteCategory, getAllBuildingBlocks, getAllCategories, getAllToDos, type BuildingBlock, type Category, type CreateToDoData, type ToDo, type ToDoCreationDto } from '@/api';
import { toCategoryCreationObject, toCategoryObject } from '@/composables/modelGenerator';
import CategorySelectionDialog from './organisms/CategorySelectionDialog.vue';
import CreateTodoDialog from './organisms/CreateTodoDialog.vue';
import { useToast } from 'vue-toast-notification';


const store = useTodoStore()
const toast = useToast()

const isDialogCategoryShown = ref(false)
const isDialogBuildingBlocksShown = ref(false)

const selectedCategory = ref<Category>({
    id: 0, 
    name: '', 
    buildingBlocks: []
});

onMounted(() => {
  fetchCategories()
  fetchBuildingBlocks()
  fetchTodos()
})

function showDialogCategory() {
  isDialogCategoryShown.value = true
}

function resetState() {
  isDialogCategoryShown.value = false
  isDialogBuildingBlocksShown.value = false
}


async function saveTodo(todo:ToDoCreationDto) {
  console.log('Speichere Todo muss gebaut werden');

  const response = await createToDo({
    body: todo
  })

  if (response.response.ok && response.data) {
    store.addTodo(response.data)
    toast.success('Todo erfolgreich erstellt!')
  } else {
    toast.error('Fehler beim Speichern des Todos')
  }
  
}

// Todo operations
async function fetchTodos() {
  if (store.areTodosLoaded) {
    return
  }

  const response = await getAllToDos()

  if (response.data) {
    const todos: Array<ToDo> = response.data
    for (const todo of todos) {
      store.todos.push(todo)
    }
    store.areTodosLoaded = true
  }
}







// Category operations
async function fetchCategories() {

  if (store.areCategoriesLoaded) {
    return
  }

  const response = await getAllCategories()

  if (response.data) {
    const categories: Array<Category> = response.data
    for (const category of categories) {
      store.categories.push(category);
    }
    store.areCategoriesLoaded = true
  }

}

async function saveNewCategory(categoryName: string, buildingBlockIds: Array<number>, callback:Function) {
  if (categoryName.trim().length == 0) {
    toast.error('Das Eingabefeld darf nicht leer sein.')
    return
  }
  const response = await addCategory({
    body: toCategoryCreationObject(categoryName, buildingBlockIds)
  });
  if (response.response.ok && response.data) {
    store.addCategory(
      toCategoryObject(categoryName, response.data?.buildingBlocks, response.data?.id)
    )
    callback()
  } else {
    toast.error('Fehler beim Speichern der Kategorie')
  }
}

async function removeCategory(id: number) {

  const response = await deleteCategory({
    path: {
      id: id
    }
  })

  if (response.response.ok) {
    store.deleteCategory(id)
  } else {
    toast.error('Fehler beim Löschen der Kategorie')
  }

}


function selectCategory(id: number) {
  console.log(`select: ${id}`)
  console.log(store.categories)

  selectedCategory.value = store.categories.find(category => category.id == id)!
  console.log(selectedCategory.value)

  isDialogCategoryShown.value = false
  isDialogBuildingBlocksShown.value = true
}


// BuildingBlock operations
async function fetchBuildingBlocks() {

  if (store.areBuldingBlocksLoaded) {
    return
  }

  const response = await getAllBuildingBlocks()

  if (response.data) {
    const buildingBlocks: Array<BuildingBlock> = response.data

    for (const buildingBlock of buildingBlocks) {
      store.buildingBlocks.push(buildingBlock);
    }
    store.areBuldingBlocksLoaded = true
  }
}

</script>