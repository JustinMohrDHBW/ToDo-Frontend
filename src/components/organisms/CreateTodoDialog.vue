<template>

    <DialogFrame :info="'for Category ' + props.category.name" @close-dialog="$emit('reset-state')" dialog-title="Create Todo">

    <template #content>
        <InputFieldAtom place-holder="Todo Name"
        v-model="todoName.value"
        :error-message="todoName.error"
        />

        <div id="default-props">
            <CheckBoxAtom v-model="isTodoToday" label="Do Today"/>
            <DropdownAtom
            :items="priorityArray"
            v-model="priority"/>
        </div>

        <div v-for="buildingBlock in buildingBlocks">

            <InputFieldAtom 
            v-if="buildingBlock.dataType === DataTypes.TEXT" 
            v-model="buildingBlockFormulaData[buildingBlock.id]!.value"
            :error-message="buildingBlockFormulaData[buildingBlock.id]!.error"
            :label="`${buildingBlock.name}`"
            />

            <DatePicker 
            v-if="buildingBlock.dataType === DataTypes.DATE" 
            v-model="buildingBlockFormulaData[buildingBlock.id]!.value" 
            :error-message="buildingBlockFormulaData[buildingBlock.id]!.error"
            :label="`${buildingBlock.name}`"
            />

            <NumberInput 
            v-if="buildingBlock.dataType === DataTypes.INTEGER"
            v-model="buildingBlockFormulaData[buildingBlock.id]!.value"
            :error-message="buildingBlockFormulaData[buildingBlock.id]!.error"
            :label="`${buildingBlock.name}`" 
            placeholder="e. g. 30"
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
import type { Category, ToDoCreationDto } from '@/api';
import { ref } from 'vue';
import type { FormField } from '../../composables/Models';
import { DataTypes, priorityArray } from '../../composables/HardLoad';
import { toTodoCreationObject } from '@/composables/ModelGenerator';

const emit = defineEmits(['reset-state', 'save-todo']);


const props = defineProps<{
    category: Category
}>();

const buildingBlocks = props.category.buildingBlocks


const todoName = ref<FormField>({
    value: "",
    error: ""
})

const isTodoToday = ref<boolean>(false)
const priority = ref<string>("")


const initialData = buildingBlocks.reduce((accumulator, currentBlock) => {
    accumulator[currentBlock.id] = { value: "", error: "" };
    return accumulator;
}, {} as Record<number, FormField>);

const buildingBlockFormulaData = ref<Record<number, FormField>>(initialData)




function validateForm(): boolean {

    let isValid = true;

    todoName.value.error = ""
    for (const id in buildingBlockFormulaData.value) {
        buildingBlockFormulaData.value[id]!.error = "";
    }

    if(!todoName.value.value.trim()){
        todoName.value.error = 'Ein Name für das Todo ist erforderlich.';
        isValid = false;
        console.log("Todo Name empty")
    }

    for (const block of buildingBlocks) {
        const field = buildingBlockFormulaData.value[block.id];
        
        if (block.dataType === DataTypes.INTEGER && parseInt(field!.value) < 0) {
            field!.error = `${block.name} muss größer als 0 sein.`;
            isValid = false;
            console.log(block.name + " not a number")
        }

        if (!field!.value.trim()) {
             field!.error = `${block.name} darf nicht leer sein.`;
             isValid = false;
             console.log(block.name + " empty")
        }
        
    }

    return isValid
}




function saveTodo() {
    for (const [key, value] of Object.entries(buildingBlockFormulaData.value)) {
        console.log(`Key: ${key}, Value: ${value.value}`)
    }
    console.log("Priority: " +priority.value)


    const isFormValid = validateForm();
    if (!isFormValid) {
        return; 
    }

    console.log("Formular ist gültig. Speichern...");

    const buildingBlockValues: Record<number, string> = {};
    for (const id in buildingBlockFormulaData.value) {
        buildingBlockValues[id] = buildingBlockFormulaData.value[id]!.value;
    }

    const newTodo: ToDoCreationDto = toTodoCreationObject(
        todoName.value.value,
        priority.value,
        isTodoToday.value,
        props.category,
        buildingBlockValues
    );

    emit("save-todo", newTodo);
}

</script>

<style scoped>

#default-props {
  display: flex;
  justify-content: space-evenly;
}

</style>