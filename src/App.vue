<template>
    <NavBarOrganismn/>
    <RouterView/>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue'
import NavBarOrganismn from './components/organisms/NavBarOrganismn.vue'
import { useTodoStore } from './stores/todoStore'

const todoStore = useTodoStore()

// Load data when app starts
onMounted(async () => {
  await todoStore.initializeStore()
})
</script>
<style scoped>

</style>
