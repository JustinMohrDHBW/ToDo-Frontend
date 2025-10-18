<template>

    <HomePateTemplates @switchDialogShowState="switchDialogShowState"/>

    <DialogFrame v-if="isDialogShown" @close-dialog="switchDialogShowState" dialog-title="Select a Category">

      <template #content>

        <AddCategoryItem hint-text="New Category"/>

        <div id="category-item">
            <CategoryItem v-for="(category, index) in store.categories" :key="index"
            :categoryId="String(category.id)"
            :categoryName="String(category.name)"
            @selectCategory="selectCategory"
            @deleteCategory="deleteCategory"/>
        </div>
      </template>

        <template #action-buttons>
          <ButtonAtom label="Speichern"/>
          <ButtonAtom label="Abbrechen"/>
        </template>

    </DialogFrame>

</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore';
import { ref } from 'vue';
import DialogFrame from './organisms/DialogFrame.vue';
import AddCategoryItem from './molecules/AddCategoryItem.vue';
import HomePateTemplates from './templates/HomePateTemplates.vue';
import ButtonAtom from './atoms/ButtonAtom.vue';
import CategoryItem from './molecules/CategoryItem.vue';


  const store = useTodoStore()

  const isDialogShown = ref(false)

  function switchDialogShowState(){
    isDialogShown.value = !isDialogShown.value;
  }

  function selectCategory(name:string){
    console.log(`slecet: ${name}`)
  }

  function deleteCategory(id:string){
    console.log(`delete: ${id}`)
    store.deleteCategory(id)
    console.log('Categories after delete:', store.categories.length);
  }

  </script>




<style scoped>

#category-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

</style>