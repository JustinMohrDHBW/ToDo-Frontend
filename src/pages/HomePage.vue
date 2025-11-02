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
import { useTodoStore } from '@/stores/todoStore';
import { onMounted, ref } from 'vue';
import { addCategory, createToDo, deleteCategory, getAllBuildingBlocks, getAllCategories, getAllToDos, updateLinkData, setCompleted, setDueToday, type BuildingBlock, type Category, type CreateToDoData, type ToDo, type ToDoCreationDto } from '@/api';
import { toCategoryCreationObject, toCategoryObject } from '@/composables/modelGenerator';
import { useToast } from 'vue-toast-notification';
import CreateTodoDialog from '@/components/organisms/CreateTodoDialog.vue';
import HomePageTemplates from '@/components/templates/HomePageTemplates.vue';
import CategorySelectionDialog from '@/components/organisms/CategorySelectionDialog.vue';
import { DialogModes } from '@/composables/hardLoad';


const store = useTodoStore()
const toast = useToast()

const isDialogCategoryShown = ref(false)
const isDialogCreateUpdate = ref(false)
const dialogMode = ref<DialogModes>()

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
  isDialogCreateUpdate.value = false
  selectedTodo.value = undefined
}


async function saveTodo(todo: ToDoCreationDto) {
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
  dialogMode.value = DialogModes.UPDATE
  console.log(dialogMode.value)
  isDialogCreateUpdate.value = true;
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

async function handleToggleDueToday(todo: ToDo, value: boolean) {
  if (!todo.id) {
    toast.error('Todo ID is missing')
    return
  }

  try {
    const response = await setDueToday({
      path: {
        id: todo.id
      }
    })

    if (response.response.ok && response.data) {
      store.updateTodo(todo.id, { dueToday: value })
      const message = value ? 'Todo marked for today!' : 'Todo unmarked for today!'
      toast.success(message)
    } else {
      toast.error('Error updating todo')
    }
  } catch (error) {
    console.error('Error toggling due today:', error)
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

async function saveNewCategory(categoryName: string, buildingBlockIds: Array<number>, callback: Function) {
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
  } else if (response.response.status === 409) {
    toast.info('Category already exists.')
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
  } else if (response.response.status === 500) {
    toast.info('Complete and delete all todos in this category.')
  } else {
    toast.error('Error deleting category')
  }

}


function selectCategory(id: number) {
  console.log(`selected id: ${id}`)
  console.log(store.categories)

  selectedCategory.value = store.categories.find(category => category.id == id)!
  console.log(selectedCategory.value)
  console.log("dialogmode change")

  dialogMode.value = DialogModes.CREATE
  console.log("dialogmode", dialogMode.value)
  isDialogCategoryShown.value = false
  isDialogCreateUpdate.value = true
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