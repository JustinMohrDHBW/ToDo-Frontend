<template>
    <div id="options-bar">
        <div id="stack-container">
            <DropdownAtom :items="filterMenu" v-model="sortBy" />
            <DropdownAtom :items="categoryFilterItems" v-model="selectedCategoryId" />
            <CheckBoxAtom label="Heute zu erledigen" v-model="filterDueToday" />
        </div>
        <div id="button-container">
            <ButtonAtom label="neues Tdodo" @click="showDialogCategory"/>
        </div>
    </div>

  </template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { filterMenu } from '@/composables/hardLoad';
import ButtonAtom from '../atoms/ButtonAtom.vue';
import CheckBoxAtom from '../atoms/CheckBoxAtom.vue';
import DropdownAtom from '../atoms/DropdownAtom.vue';

const store = useTodoStore()
const emit = defineEmits(['showDialogCategory'])

const sortBy = defineModel<string>('sortBy', { default: 'Priority' })
const filterDueToday = defineModel<boolean>('filterDueToday', { default: false })
const selectedCategoryId = defineModel<string>('selectedCategoryId', { default: 'Alle' })

const categoryFilterItems = computed(() => {
  const items = ['Alle']
  store.categories.forEach(category => {
    items.push(category.name)
  })
  return items
})

function showDialogCategory(){
  emit('showDialogCategory')
}

</script>
  

  
<style scoped>
  #stack-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 200px;
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

</style>
  