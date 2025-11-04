import { addCategory, createToDo, deleteCategory, deleteToDo, getAllBuildingBlocks, getAllCategories, getAllToDos, setCompleted, setDueToday, updateLinkData, type BuildingBlock, type Category, type ToDo, type ToDoCreationDto } from "@/api";
import { toCategoryCreationObject, toCategoryObject, toLinkDataDtoObject } from "@/composables/modelGenerator";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoStore = defineStore('todos', () => {

    const areCategoriesLoaded = ref(false)
    const categories = ref<Category[]>([])

    const areBuldingBlocksLoaded = ref(false)
    const buildingBlocks = ref<BuildingBlock[]>([])

    const areTodosLoaded = ref(false)
    const todos = ref<ToDo[]>([])

    const reset= () => {
        areCategoriesLoaded.value = false
        areBuldingBlocksLoaded.value = false
        areTodosLoaded.value = false

        categories.value = []
        buildingBlocks.value = []
        todos.value = []
    }



    // Load Actions
    async function loadCategories() {

        if(areCategoriesLoaded.value){
            return
        }

        try { 
            const response = await getAllCategories()
            const data = response.data

            if(response.response.ok && data) {
                categories.value = data
                areCategoriesLoaded.value = true
            } else {
                throw new Error('Failed to fetch categories')
            }
        } catch (error) {
            console.error(error);
            throw error
        }

    }


    async function loadTodos() {
        if (areTodosLoaded.value) {
            return;
        }
        try {
          const response = await getAllToDos();
          const data = response.data

          if (response.response.ok && data) {
            todos.value = data
            areTodosLoaded.value = true
          } else {
            throw new Error('Failed to fetch todos');
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
      }


      async function loadBuildingBlocks() {
        if (areBuldingBlocksLoaded.value){
            return
        }

        try {
          const response = await getAllBuildingBlocks();
          const data = response.data

          if (response.response.ok && data) {
            buildingBlocks.value = data;
            areBuldingBlocksLoaded.value = true;
          } else {
            throw new Error('Failed to fetch building blocks');
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
      }



      // Category Manipulation
      async function createNewCategory(categoryName: string, buildingBlockIds: number[]) {
        
        const response = await addCategory({
            body: toCategoryCreationObject(categoryName, buildingBlockIds)
        })
        const data = response.data
        
        if(response.response.ok && response.data) {
            categories.value.push(
                toCategoryObject(categoryName, response.data.buildingBlocks!, response.data.id!)
            )
            return { success: true, status: response.response.status }
        } else {
            return { success: false, status: response.response.status }
        }
      }


      async function deleteCategoryById(id: number) {

        const response = await deleteCategory({ path: { id: id } })

        if (response.response.ok) {
          deleteLocalCategoryById(id)
          return { success: true }
        } else {
          return { success: false, status: response.response.status }
        }
      }


      // Todo
      async function createNewTodo(todo: ToDoCreationDto) {

        const response = await createToDo({ body: todo });
        const data = response.data

        if (response.response.ok && data) {
          todos.value.push(data)
          return { success: true, data: data };
        }
        return { success: false, status: response.response.status }
      }


      async function updateExistingTodo(todoId: number, updateData: ToDoCreationDto) {
        
        const updateLinkDataDto = toLinkDataDtoObject(updateData.title!, updateData.priority!, updateData.dueToday!, updateData.buildingBlockData!)
        const response = await updateLinkData({
            path: { id: todoId },
            body: updateLinkDataDto
        });
        const data = response.data
    
        if (response.response.ok && data) {
          console.log(data)
          updateTodo(todoId, data)
          return { success: true, data: data }
        }
        return { success: false }
      }


      async function setTodoCompleted(todoId: number) {

        const response = await setCompleted({ path: { id: todoId } })
        const data = response.data

        if (response.response.ok && data) {
          updateTodo(todoId, data)
          return { success: true, data: data };
        }
        return { success: false };
      }


      async function setTodoDueToday(todoId: number, value: boolean) {

        const response = await setDueToday({ path: { id: todoId }, body: value });
        const data = response.data

        if (response.response.ok && data) {
          updateTodo(todoId, data);
          return { success: true, data: data };
        }
        return { success: false };
      }


      async function deleteExistingTodo(todoId: number) {
        try {
          const response = await deleteToDo({
            path: { id: todoId }
          })
      
          if (response.response.ok) {
            deleteLocalTodoById(todoId);
            return { success: true };
          }

          throw new Error('Failed to delete categories') 

        } catch (error) {
          console.error('Error deleting todo:', error);
          return { success: false };
        }
      }






      function deleteLocalTodoById(id: number) {
        todos.value = todos.value.filter(t => t.id !== id);
      }


    const deleteLocalCategoryById = (id: number) => {
        categories.value = categories.value.filter(
            (item) => id != item.id
        );
    }

    const getCategoryById = (id: number): Category | null => {
        return categories.value.find(category => category.id == id) || null
    }

    const updateTodo = (id: number, updatedTodo: Partial<ToDo>) => {
        const index = todos.value.findIndex(todo => todo.id === id)
        if (index !== -1) {
            todos.value[index] = { ...todos.value[index], ...updatedTodo }
        }
    }

    return {

        categories,
        todos,
        buildingBlocks,

        areCategoriesLoaded,
        areBuldingBlocksLoaded,
        areTodosLoaded,

        reset,
        loadCategories,
        loadBuildingBlocks,
        loadTodos,

        createNewCategory,
        deleteCategoryById,
        createNewTodo,
        updateExistingTodo,
        setTodoCompleted,
        setTodoDueToday,
        deleteExistingTodo,

        getCategoryById
    }

})