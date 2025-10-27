<template>

    <DialogFrame :info="'for Category ' + props.category.name" @close-dialog="$emit('reset-state')" dialog-title="Create Todo">

    <template #content>
        <InputFieldAtom place-holder="Todo Name" v-model="todoName"/>

        <div id="default-props">
            <CheckBoxAtom v-model="isTodoToday" label="Do Today"/>
            <DropdownAtom/>
        </div>

        <div v-for="buildingBlock in buildingBlocks">

            <InputFieldAtom 
            v-if="isBuildingBlockInput(buildingBlock.id, buildingBlocks)" 
            v-model="buildingBlockFormulaData[buildingBlock.id]" 
            />

            <DatePicker 
            v-if="isBuildingBlockDate(buildingBlock.id, buildingBlocks)" 
            v-model="buildingBlockFormulaData[buildingBlock.id]" 
            />

            <NumberInput 
            v-if="isBuildingBlockNumber(buildingBlock.id, buildingBlocks)"
            v-model="buildingBlockFormulaData[buildingBlock.id]"
            />

        </div>
    </template>

    <template #action-buttons>
    <ButtonAtom label="Create" @click="$emit('save-todo')"/>
    <ButtonAtom label="Cancel" @click="$emit('reset-state')"/>
    </template>

    </DialogFrame>

</template>

<script setup lang="ts">
import DialogFrame from './DialogFrame.vue';
import InputFieldAtom from '../atoms/InputFieldAtom.vue';
import DropdownAtom from '../atoms/DropdownAtom.vue';
import CheckBoxAtom from '../atoms/CheckBoxAtom.vue';
import ButtonAtom from '../atoms/ButtonAtom.vue';
import DatePicker from '../atoms/DatePicker.vue';
import NumberInput from '../atoms/NumberInput.vue';
import type { Category } from '@/api';
import { ref } from 'vue';
import { categoryNameMapper, isBuildingBlockDate, isBuildingBlockInput, isBuildingBlockNumber } from '@/composables/Mapper';


defineEmits(['reset-state', 'save-todo']);


const props = defineProps<{
    category: Category
}>();

console.log(props.category)
const buildingBlocks = props.category.buildingBlocks

const todoName = ref("")
const isTodoToday = ref(false)
const buildingBlockFormulaData = ref<Record<number, string>>({})

</script>

<style scoped>

#default-props {
  display: flex;
  justify-content: space-evenly;
}

</style>