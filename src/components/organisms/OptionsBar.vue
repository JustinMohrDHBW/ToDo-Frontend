<template>
  <div id="options-bar">
    <div id="stack-container">
      <DropdownAtom :items="filterMenu" v-model="sortBy" label="Sort by" />
      <DropdownAtom :items="categoryFilterItems" v-model="selectedCategoryId" label="Category" />
      <CheckBoxAtom label="Tasks for Today" v-model="filterDueToday" />
    </div>
    <div id="button-container">
      <ButtonAtom style="width: 100px;" label="New Todo" @click="showDialogCategory" />
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
  flex-wrap: nowrap;
}

#button-container {
  display: flex;
  align-items: center;
}

/*
 * Ab einer Bildschirmbreite von 800px (oder weniger) 
 * wird dieses Layout aktiv.
 * Passe den Wert (800px) ggf. an.
*/
@media (max-width: 800px) {
  #options-bar {
    /* Stapelt Filter-Container und Button-Container vertikal */
    flex-direction: column;
    
    /* Richtet beides linksbündig aus */
    align-items: flex-start; 
    
    /* Reduziert den seitlichen Abstand für mobile Geräte */
    padding-inline: 20px;
    
    /* Fügt einen Abstand zwischen den gestapelten Blöcken hinzu */
    gap: 24px; 
  }

  #button-container {
    /* Sorgt dafür, dass der Button die volle Breite einnimmt */
    width: 100%; 
  }
  
  /* Diese Regel ist nötig, damit der <ButtonAtom> 
     im Container auch die volle Breite nutzt.
     Du musst evtl. tiefer selektieren, wenn der Button
     noch ein Wrapper-div hat.
  */
  #button-container > :deep(button) {
    width: 100%;
  }
}
</style>