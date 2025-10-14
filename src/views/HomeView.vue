<script setup lang="ts">
import ItemViewArea from '@/components/atoms/ItemViewArea.vue';
import TodoItem from '@/components/molecules/TodoItem.vue';
import OptionsBar from '@/components/organisms/OptionsBar.vue';


// Removed test.json fetch - file doesn't exist

</script>

<template>
  <main>
    <OptionsBar/>
    <ItemViewArea>
      <TodoItem/>
      <TodoItem/>
      <TodoItem/>
      <TodoItem/>
      <TodoItem/>
    </ItemViewArea>
  </main>
</template>

<style scoped>


</style>