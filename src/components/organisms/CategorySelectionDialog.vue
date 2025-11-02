<template>

  <DialogFrame @close-dialog="$emit('reset-state')" dialog-title="Select a Category">

    <template #content>

      <AddCategoryItem hint-text="New Category" @add-category="addCategory" />

      <div id="buildingBlock-item">
        <State v-if="!store.areBuldingBlocksLoaded" variant="popup" message="Loading building blocks..." />
        <CheckBoxAtom v-else-if="store.buildingBlocks.length > 0" v-for="buildingBlock in store.buildingBlocks"
          :key="buildingBlock.id" :id="buildingBlock.id" :select-set="selectedBuildingBlocksSet"
          :label="buildingBlock.name" />
        <State v-else-if="store.areBuldingBlocksLoaded && store.buildingBlocks.length === 0" variant="popup"
          message="No building blocks available" />
      </div>

      <div id="category-item">
        <State v-if="!store.areCategoriesLoaded" variant="popup" message="Loading categories..." />
        <CategoryItem v-else-if="store.categories.length > 0" v-for="category in store.categories" :key="category.id"
          :categoryId="String(category.id)" :categoryName="String(category.name)"
          @selectCategory="$emit('selectCategory', category.id)"
          @deleteCategory="$emit('deleteCategory', category.id)" />
        <State v-else-if="store.areCategoriesLoaded && store.categories.length === 0" variant="popup"
          message="No categories available" />
      </div>
    </template>

    <template #action-buttons>
      <ButtonAtom label="Cancel" @click="$emit('reset-state')" />
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
import State from '../atoms/State.vue'

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
  const buildingBlockIdArray: number[] = Array.from(selectedBuildingBlocksSet.value.values())

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
  min-height: 100px;
  gap: 10px;
}

#buildingBlock-item {
  display: flex;
  flex-direction: row;
  gap: 15px;
  flex-wrap: wrap;
  flex-shrink: 0;
}
</style>