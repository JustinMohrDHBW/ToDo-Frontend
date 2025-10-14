<template>
    <div id="options-bar">
        <div id="stack-container">
            <DropdownAtom :items="['Todo', 'In Progress', 'Done']" modelValue="Filter" />
            <CheckboxAtom label="Heute zu erledigen" />
        </div>
        <div id="button-container">
            <ButtonAtom label="neues Tdodo" @emit="switchDialogShowState"/>
        </div>
    </div>

    <DialogFrame v-if="isDialogShown" @closeDialog="switchDialogShowState" dialogTitle="Select a Category:">

      <AddCategoryItem hintText="New Category"/>

      <div v-if="store.categories.length > 0" id="category-item">
        <CategoryItem  v-for="(category, index) in store.categories" :key="index" :index="index" :categoryName="String(category.name)" @emit="selectCategory"/>
      </div>
      <div v-else>
      </div>

    </DialogFrame>

  </template>
  
<script setup lang="ts">
  import DropdownAtom from '../atoms/Dropdown.vue'
  import CheckboxAtom from '../atoms/CheckBoxAtom.vue'
  import ButtonAtom from '../atoms/ButtonAtom.vue';
  import DialogFrame from '../organisms/DialogFrame.vue';
  import { ref } from 'vue';
  import { useTodoStore } from '@/stores/todoStore';
  import CategoryItem from '../molecules/CategoryItem.vue';
  import AddCategoryItem from '../molecules/AddCategoryItem.vue';

  const store = useTodoStore()

  const isDialogShown = ref(false)

  function switchDialogShowState(){
    isDialogShown.value = !isDialogShown.value;
  }

  function selectCategory(name:string){
    console.log(name)
  }

  </script>
  
  <style scoped>
  #stack-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 250px;
  }

  #options-bar{
    display: flex;
    padding-inline: 60px;
    padding-block: 30px;
    justify-content: space-between;
  }

  #button-container{
    display: flex;
    align-items: center;
  }

  #category-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  </style>
  