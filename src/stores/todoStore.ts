import type { BuildingBlock, Category, ToDo } from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoStore = defineStore('todos', () => {

    const areCategoriesLoaded = ref(false)
    const categories = ref<Category[]>([])

    const areBuldingBlocksLoaded = ref(false)
    const buildingBlocks = ref<BuildingBlock[]>([])

    const areTodosLoaded = ref(false)
    const todos = ref<ToDo[]>([])

    // Category operations
    const addCategory = (category:Category) => {
        categories.value.push(category)

        console.log(category)
    }

    const deleteCategory = (id:number) => {
        categories.value = categories.value.filter(
            (item) => id != item.id
        );
    }

    const getCategoryById = (id:number) : Category | null => {
        return categories.value.find(category => category.id == id) || null
    }

    // Todo operations
    const addTodo = (todo: ToDo) => {
        todos.value.push(todo)
    }

    const deleteTodo = (id: number) => {
        todos.value = todos.value.filter(
            (item) => id != item.id
        )
    }

    const updateTodo = (id: number, updatedTodo: Partial<ToDo>) => {
        const index = todos.value.findIndex(todo => todo.id === id)
        if (index !== -1) {
            todos.value[index] = { ...todos.value[index], ...updatedTodo }
        }
    }

    return{
        categories,
        areCategoriesLoaded,
        addCategory,
        deleteCategory,
        getCategoryById,

        buildingBlocks,
        areBuldingBlocksLoaded,

        todos,
        areTodosLoaded,
        addTodo,
        deleteTodo,
        updateTodo,

    }

})