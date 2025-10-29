<template>

    <DialogFrame :info="'for Category ' + props.category.name" @close-dialog="$emit('reset-state')" dialog-title="Create Todo">

    <template #content>
        <InputFieldAtom place-holder="Todo Name" v-model="todoName"
        :is-white="true"/>

        <div id="default-props">
            <CheckBoxAtom v-model="isTodoToday" label="Do Today"/>
            <DropdownAtom/>
        </div>

        <div v-for="buildingBlock in buildingBlocks">

            <InputFieldAtom 
            v-if="isBuildingBlockInput(buildingBlock.id, buildingBlocks)" 
            v-model="buildingBlockFormulaData[buildingBlock.id]"
            :label="`${buildingBlock.name}`"
            />

            <DatePicker 
            v-if="isBuildingBlockDate(buildingBlock.id, buildingBlocks)" 
            v-model="buildingBlockFormulaData[buildingBlock.id]" 
            label="Select Deadline"
            />

            <NumberInput 
            v-if="isBuildingBlockNumber(buildingBlock.id, buildingBlocks)"
            v-model="buildingBlockFormulaData[buildingBlock.id]"
            label="Estimated Time in Minutes" 
            placeholder="30"
            />

            

        </div>
    </template>

    <template #action-buttons>
    <ButtonAtom label="Save" @click="saveTodo"/>
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
import { isBuildingBlockDate, isBuildingBlockInput, isBuildingBlockNumber } from '@/composables/Mapper';


defineEmits(['reset-state', 'save-todo']);


const props = defineProps<{
    category: Category
}>();

console.log(props.category)
const buildingBlocks = props.category.buildingBlocks

const todoName = ref("")
const isTodoToday = ref(false)

const initialData = buildingBlocks.reduce((accumulator, currentBlock) => {
    accumulator[currentBlock.id] = "";
    return accumulator;
}, {} as Record<number, string>);

const buildingBlockFormulaData = ref<Record<number, string>>(initialData)


function saveTodo() {
    for (const [key, value] of Object.entries(buildingBlockFormulaData.value)) {
        console.log(`Key: ${key}, Value: ${value}`)
}

}

</script>

<style scoped>

#default-props {
  display: flex;
  justify-content: space-evenly;
}

</style>