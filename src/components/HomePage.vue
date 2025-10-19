<template>

    <HomePateTemplates @switchDialogShowState="switchDialogShowState"/>

    <DialogFrame v-if="isDialogShown" @close-dialog="switchDialogShowState" dialog-title="Select a Category">

      <template #content>

        <AddCategoryItem 
        hint-text="New Category"
        @add-category="saveNewCategory" 
        />

        <div id="category-item">
            <CategoryItem v-for="(category, index) in store.categories" :key="index"
            :categoryId="String(category.id)"
            :categoryName="String(category.name)"
            @selectCategory="selectCategory"
            @deleteCategory="deleteCategory"/>
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
import { addCategory, getAllCategories, type AddCategoryData, type Category } from '@/api';


  const store = useTodoStore()

  const isDialogShown = ref(false)

  onMounted(() => {
    fetchCategories()
  })

  async function fetchCategories(){

    const response = await getAllCategories()

    if(response.data){


        const categories: Array<Category> = response.data
        for (const category of categories) {
          store.categories.push(category);
        }

        
        
  

    }

  }

  async function saveNewCategory(categoryName:string) {
    console.log('Speichere:', categoryName);

    const response = await addCategory({
      body: {
        name: categoryName,
        user_id: 1,
        buildingBlockIds: [1, 2, 3]
      }
    });

    if(!response.response.ok){
      response.response.status
    }
  
  }

  function switchDialogShowState(){
    isDialogShown.value = !isDialogShown.value;
  }

  function selectCategory(name:string){
    console.log(`slecet: ${name}`)
  }

  function deleteCategory(id:number){
    console.log(`delete: ${id}`)
    store.deleteCategory(id)
    console.log('Categories after delete:', store.getCategoryLength());
  }

  </script>




<style scoped>

#category-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

</style>