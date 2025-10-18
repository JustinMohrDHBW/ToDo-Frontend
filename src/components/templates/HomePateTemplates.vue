<template>
    <OptionsBar @switchDialogShowState="switchDialogShoState"/>
    <ItemViewArea>
      <TodoItem/>
      <TodoItem/>
      <TodoItem/>
      <TodoItem/>
      <TodoItem/>
    </ItemViewArea>

</template>


<script setup lang="ts">
import ItemViewArea from '@/components/atoms/ItemViewArea.vue';
import TodoItem from '@/components/molecules/TodoItem.vue';
import OptionsBar from '../organisms/OptionsBar.vue';

const emits = defineEmits(['switchDialogShowState'])

function switchDialogShoState() {
    emits('switchDialogShowState')
}

</script>


<style scoped>


</style>