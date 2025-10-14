<script setup lang="ts">
import ItemViewArea from '@/components/atoms/ItemViewArea.vue';
import TodoItem from '@/components/molecules/TodoItem.vue';
import OptionsBar from '@/components/organisms/OptionsBar.vue';


fetch('/test.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.error('Error:', error)
  })

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