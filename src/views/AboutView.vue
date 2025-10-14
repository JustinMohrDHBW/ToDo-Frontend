<script setup lang="ts">
import ItemViewArea from '@/components/atoms/ItemViewArea.vue';
import TodoItem from '@/components/molecules/TodoItem.vue';

</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ItemViewArea>
      <TodoItem/>
      <TodoItem/>
      <TodoItem/>
    </ItemViewArea>
  </div>
</template>

<style>
</style>
