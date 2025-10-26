<template>

    <HomePateTemplates @switchDialogShowState="switchDialogShowState"/>

    <DialogFrame v-if="isDialogShown" @close-dialog="switchDialogShowState" dialog-title="Select a Category">

      <template #content>

        <AddCategoryItem 
        hint-text="New Category"
        @add-category="saveNewCategory" 
        />

        <div id="buildingBlock-item">
          <CheckBoxAtom v-for="buildingBlock in store.buildingBlocks" :key="buildingBlock.id"
          :id="buildingBlock.id"
          :selected-set="selectedBuildingBlocks"
          :label="String(buildingBlock.name)"
          />
        </div>

        <div id="category-item">
            <CategoryItem v-for="category in store.categories" :key="category.id"
            :categoryId="String(category.id)"
            :categoryName="String(category.name)"
            @selectCategory="selectCategory"
            @deleteCategory="removeCategory"/>
        </div>
      </template>

        <template #action-buttons>
          <ButtonAtom label="Abbrechen" @click="switchDialogShowState"/>
        </template>

    </DialogFrame>

</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore';
import { onMounted, ref } from 'vue';
import DialogFrame from './organisms/DialogFrame.vue';
import AddCategoryItem from './molecules/AddCategoryItem.vue';
import HomePateTemplates from './templates/HomePateTemplates.vue';
import ButtonAtom from './atoms/ButtonAtom.vue';
import CategoryItem from './molecules/CategoryItem.vue';
import { addCategory, deleteCategory, getAllBuildingBlocks, getAllCategories, type AddCategoryData, type BuildingBlock, type Category } from '@/api';
import { toCategoryObject } from '@/composables/ModelGenerator';
import { toastDefaultError } from '@/composables/Toast';
import ItemLabel from './atoms/ItemLabel.vue';
import CheckBoxAtom from './atoms/CheckBoxAtom.vue';


  const store = useTodoStore()

  const isDialogShown = ref(false)
  const selectedBuildingBlocks = ref(new Set<number>())

  onMounted(() => {
    fetchCategories()
    fetchBuildingBlocks()
  })

  function switchDialogShowState(){
    isDialogShown.value = !isDialogShown.value;
  }

  // Category operations
  async function fetchCategories(){

    if(store.areCategoriesLoaded){
      return
    }

    const response = await getAllCategories()

    if(response.data){
        const categories: Array<Category> = response.data
        for (const category of categories) {
          store.categories.push(category);
        }
        store.areCategoriesLoaded = true
    }

  }

  async function saveNewCategory(categoryName:string, buildingBlocks:Array<BuildingBlock>) {
    console.log('Speichere:', categoryName);

    const response = await addCategory({
      body: toCategoryObject(categoryName, buildingBlocks)
    });

    if(response.response.ok){
      store.addCategory(
        toCategoryObject(categoryName, buildingBlocks, response.data?.id)
      )
    }else {
      toastDefaultError()
    }
  
  }

  async function removeCategory(id:number){

    const response = await deleteCategory({
      path: {
        id: id
      }
    })

    if(response.response.ok){
      console.log(`delete: ${id}`)
      store.deleteCategory(id)
    }else{
      toastDefaultError()
    }

  }


  function selectCategory(id:number){
    console.log(`slecet: ${id}`)
    console.log(selectedBuildingBlocks.value)
  }







  // BuildingBlock operations
  async function fetchBuildingBlocks(){

    if(store.areBuldingBlocksLoaded){
      return
    }

    const response = await getAllBuildingBlocks()

    if(response.data){
        const buildingBlocks: Array<BuildingBlock> = response.data

        for (const buildingBlock of buildingBlocks) {
          store.buildingBlocks.push(buildingBlock);
        }
        store.areBuldingBlocksLoaded = true
    }

  }




  </script>




<style scoped>

#category-item {
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 10px;
  }

#buildingBlock-item{
  display: flex;
  flex-direction: row;
  gap: 15px;
  overflow: auto;
}

</style>