import { getCategories } from "@/composables/fetchApi/get";
import type { Category } from "@/composables/models/Category";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoStore = defineStore('todos', () => {

    const categories = ref<Category[]>([])

    const loadCategories = async () => {
        categories.value = await getCategories()
        console.log(categories.value)
    }

    const deleteCategory = (id:String) => {
        categories.value = categories.value.filter(
            (item) => id != item.id
        );
        console.log(`filtering done`)
    }


    const initializeStore = async () => {
        await Promise.all([
          loadCategories()
        ])
    }



    return{
        categories,

        initializeStore,
        deleteCategory
    }

})