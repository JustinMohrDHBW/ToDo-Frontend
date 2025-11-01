<template>

  <HomePateTemplates 
    @show-dialog-category="showDialogCategory"
    @edit-todo="handleEditTodo"
    @complete-todo="handleCompleteTodo" />

  <CategorySelectionDialog v-if="isDialogCategoryShown"
  :building-blocks="store.buildingBlocks"
  :categories="store.categories"

  @reset-state="resetState"
  @add-category="saveNewCategory"
  @select-category="selectCategory" 
  @delete-category="removeCategory" />


  <CreateTodoDialog 
    v-if="isDialogBuildingBlocksShown"
    :category="selectedCategory"
    :todo="selectedTodo"
    @reset-state="resetState"
    @save-todo="saveTodo"
    @update-todo="updateTodo" />

</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore';
import { onMounted, ref, type Ref } from 'vue';
import HomePateTemplates from './templates/HomePateTemplates.vue';
import { addCategory, createToDo, deleteCategory, getAllBuildingBlocks, getAllCategories, getAllToDos, updateLinkData, setCompleted, type BuildingBlock, type Category, type CreateToDoData, type ToDo, type ToDoCreationDto } from '@/api';
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

const selectedTodo = ref<ToDo | undefined>(undefined)

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
  selectedTodo.value = undefined
}


async function saveTodo(todo:ToDoCreationDto) {
  console.log('Saving Todo...');


  console.log(JSON.stringify(todo))

  const response = await createToDo({
    body: todo
  })

  if (response.response.ok && response.data) {
    store.addTodo(response.data)
    toast.success('Todo successfully created!')
    resetState()
  } else {
    toast.error('Error saving todo')
  }
  
}

async function updateTodo(todoId: number, updateData: ToDoCreationDto) {

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
    toast.success('Todo successfully updated!')
    resetState()
  } else {
    toast.error('Error updating todo')
  }
}

function handleEditTodo(todo: ToDo) {
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
  isDialogBuildingBlocksShown.value = true;
}

async function handleCompleteTodo(todo: ToDo) {
  if (!todo.id) {
    toast.error('Todo ID is missing')
    return
  }

  try {
    const response = await setCompleted({
      path: {
        id: todo.id
      }
    })

    if (response.response.ok && response.data) {
      store.updateTodo(todo.id, response.data)
      toast.success('Todo marked as completed!')
    } else {
      toast.error('Error marking todo as completed')
    }
  } catch (error) {
    console.error('Error completing todo:', error)
    toast.error('Error marking todo as completed')
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
    toast.error('The input field cannot be empty.')
    return
  }
  const response = await addCategory({
    body: toCategoryCreationObject(categoryName, buildingBlockIds)
  });
  if (response.response.ok && response.data) {
    store.addCategory(
      toCategoryObject(categoryName, response.data?.buildingBlocks!, response.data?.id!)
    )
    callback()
  } else {
    toast.error('Error saving category')
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
    toast.info('Complete and delete all todos in this category.')
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