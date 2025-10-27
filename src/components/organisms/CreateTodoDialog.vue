<template>

    <DialogFrame :info="'for Category ' + categoryName" @close-dialog="$emit('reset-state')" dialog-title="Create Todo">

    <template #content>
        <InputFieldAtom place-holder="Todo Name" v-model="todoName"/>

        <div id="default-props">
            <DropdownAtom/>
            <CheckBoxAtom :model-value="isToDoToday" label="Do Today"/>
        </div>

        <div v-for="buildingBlockId in selectedBuildingBlocks">

            <InputFieldAtom 
            v-if="isBuildingBlockInput(buildingBlockId, store.buildingBlocks)" 
            v-model="buildingBlockFormulaData[buildingBlockId]" 
            />

            <DatePicker 
            v-if="isBuildingBlockDate(buildingBlockId, store.buildingBlocks)" 
            v-model="buildingBlockFormulaData[buildingBlockId]" 
            />

            <NumberInput 
            v-if="isBuildingBlockNumber(buildingBlockId, store.buildingBlocks)"
            v-model="buildingBlockFormulaData[buildingBlockId]"
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
import type { BuildingBlock } from '@/api';


defineEmits(['reset-state', 'save-todo']);


const props = defineProps({
    categoryName: String,
    selectedBuildingBlocksSet: Set<number>,
    buildingBlocks: Array<BuildingBlock>,
    isToDoToday: Boolean,
});

</script>