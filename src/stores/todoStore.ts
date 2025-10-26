import type { BuildingBlock, Category } from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoStore = defineStore('todos', () => {

    const areCategoriesLoaded = ref(false)
    const categories = ref<Category[]>([])

    const areBuldingBlocksLoaded = ref(false)
    const buildingBlocks = ref<BuildingBlock[]>([])




    // Category operations
    const addCategory = (category:Category) => {
        categories.value.push(category)

        console.log(category)
    }

    const deleteCategory = (id:number) => {
        categories.value = categories.value.filter(
            (item) => id != item.id
        );
        console.log(`filtering done`)
    }


    // BuildingBlock operations
    const addBuildingBlock = (buildingBlock:BuildingBlock) => {
        buildingBlocks.value.push(buildingBlock)

        console.log(buildingBlock)
    }



    return{
        categories,
        areCategoriesLoaded,
        addCategory,
        deleteCategory,

        buildingBlocks,
        areBuldingBlocksLoaded,

    }

})