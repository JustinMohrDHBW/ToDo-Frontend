<template>

<DialogFrame @close-dialog="$emit('reset-state')" dialog-title="Select a Category">

<template #content>

  <AddCategoryItem 
  hint-text="New Category"
  @add-category="addCategory" 
  />

  <div id="buildingBlock-item">
    <CheckBoxAtom v-for="buildingBlock in store.buildingBlocks" :key="buildingBlock.id"
    :id="buildingBlock.id"
    :select-set="selectedBuildingBlocksSet"
    :label="buildingBlock.name"
    />
  </div>

  <div id="category-item">
      <CategoryItem v-for="category in store.categories" :key="category.id"
      :categoryId="String(category.id)"
      :categoryName="String(category.name)"
      @selectCategory="$emit('selectCategory', category.id)"
      @deleteCategory="$emit('deleteCategory', category.id)"/>
  </div>
</template>

  <template #action-buttons>
    <ButtonAtom label="Cancel" @click="$emit('reset-state')"/>
  </template>

</DialogFrame>

</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore'
import { ref } from 'vue'
import CheckBoxAtom from '../atoms/CheckBoxAtom.vue'
import AddCategoryItem from '../molecules/AddCategoryItem.vue'
import CategoryItem from '../molecules/CategoryItem.vue'
import DialogFrame from './DialogFrame.vue'
import ButtonAtom from '../atoms/ButtonAtom.vue'
import { categoryNameMapper } from '@/composables/Mapper'

const store = useTodoStore()

const emit = defineEmits([
  'reset-state',
  'add-category',
  'selectCategory',
  'deleteCategory'
])

const props = defineProps({
  buildingBlocks: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
})

const selectedBuildingBlocksSet = ref<Set<number>>(new Set())

function addCategory(categoryName: string) {
  const buildingBlockIdArray:Array<number> = Array.from(selectedBuildingBlocksSet.value.values())

    const callback = () => {
        selectedBuildingBlocksSet.value.clear(); 
    };

  emit('add-category', categoryName, buildingBlockIdArray, callback)
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
  /* overflow: auto; */
  flex-wrap: wrap;
  flex-shrink: 0;
}
</style>