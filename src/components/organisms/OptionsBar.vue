<template>
  <div id="options-bar">
    <div id="stack-container">
      <DropdownAtom :items="filterMenu" v-model="sortBy" label="Sort by" />
      <DropdownAtom :items="categoryFilterItems" v-model="selectedCategoryId" label="Category" />
      <CheckBoxAtom label="Tasks for Today" v-model="filterDueToday" />
    </div>
    <div id="button-container">
      <ButtonAtom label="New Todo" @click="showDialogCategory" />
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
const selectedCategoryId = defineModel<string>('selectedCategoryId', { default: 'All' })

const categoryFilterItems = computed(() => {
  const items: string[] = ['All']
  store.categories.forEach(category => {
    if (category.name) {
      items.push(category.name)
    }
  })
  return items
})

function showDialogCategory() {
  emit('showDialogCategory')
}

</script>



<style scoped>
#stack-container {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 150px;
}

.checkbox-group {
  align-self: flex-end;
  padding-bottom: 4px;
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

#options-bar {
  display: flex;
  padding-inline: 60px;
  padding-block: 30px;
  justify-content: space-between;
  align-items: center;
}

#button-container {
  display: flex;
  align-items: center;
}
</style>