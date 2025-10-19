import type { Category } from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoStore = defineStore('todos', () => {

    const areCategoriesLoaded = ref(false)
    const categories = ref<Category[]>([])

    const getCategoryLength = () => {
        return categories.value.length
    }

    const addCategory = (category:Category) => {
        categories.value.push()
    }

    const deleteCategory = (id:number) => {
        categories.value = categories.value.filter(
            (item) => id != item.id
        );
        console.log(`filtering done`)
    }



    return{
        categories,
        areCategoriesLoaded,
        getCategoryLength,
        addCategory,
        deleteCategory
    }

})