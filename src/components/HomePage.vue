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
import { addCategory, deleteCategory, getAllBuildingBlocks, getAllCategories, type BuildingBlock, type Category } from '@/api';
import { toCategoryCreationObject, toCategoryObject } from '@/composables/ModelGenerator';
import { toastError } from '@/composables/Toast';
import CategorySelectionDialog from './organisms/CategorySelectionDialog.vue';
import CreateTodoDialog from './organisms/CreateTodoDialog.vue';


const store = useTodoStore()

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
})

function showDialogCategory() {
  isDialogCategoryShown.value = true
}

function resetState() {
  isDialogCategoryShown.value = false
  isDialogBuildingBlocksShown.value = false
}


function saveTodo() {
  console.log('Speichere Todo...');
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
    toastError('Das Eingabefeld darf nicht leer sein.')
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
    toastError()
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
    toastError()
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