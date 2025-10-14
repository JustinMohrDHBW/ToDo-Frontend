<template>
    <div id="options-bar">
        <div id="stack-container">
            <DropdownAtom :items="['Todo', 'In Progress', 'Done']" modelValue="Filter" />
            <CheckboxAtom label="Heute zu erledigen" />
        </div>
        <div id="button-container">
            <ButtonAtom label="neues Tdodo"/>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import DropdownAtom from '../atoms/Dropdown.vue'
  import CheckboxAtom from '../atoms/CheckBoxAtom.vue'
  import ButtonAtom from '../atoms/ButtonAtom.vue';

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
  