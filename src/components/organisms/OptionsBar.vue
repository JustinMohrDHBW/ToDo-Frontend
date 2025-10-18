<template>
    <div id="options-bar">
        <div id="stack-container">
            <DropdownAtom :items="['Todo', 'In Progress', 'Done']" modelValue="Filter" />
            <CheckBoxAtom label="Heute zu erledigen" />
        </div>
        <div id="button-container">
            <ButtonAtom label="neues Tdodo" @click="switchDialogShowState"/>
        </div>
    </div>

  </template>

<script setup lang="ts">
import ButtonAtom from '../atoms/ButtonAtom.vue';
import CheckBoxAtom from '../atoms/CheckBoxAtom.vue';
import DropdownAtom from '../atoms/DropdownAtom.vue';


const props = defineProps({

})

const emit = defineEmits(['switchDialogShowState'])

function switchDialogShowState(){
  emit('switchDialogShowState')
}

</script>
  

  
<style scoped>
  #stack-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 250px;
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
  