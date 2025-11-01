<template>

    <DialogFrame :info="'for Category ' + props.category.name" @close-dialog="$emit('reset-state')"
        :dialog-title="isUpdateMode ? 'Update Todo' : 'Create Todo'">

        <template #content>
            <InputFieldAtom place-holder="Todo Name" v-model="todoName.value" :error-message="todoName.error" />

            <div id="default-props">
                <CheckBoxAtom v-model="isTodoToday" label="Task for Today" />
                <DropdownAtom :items="mappedPriorityArray()" v-model="priority" />
            </div>

            <div v-for="buildingBlock in buildingBlocks">

                <InputFieldAtom v-if="buildingBlock.dataType === DataTypes.TEXT"
                    v-model="buildingBlockFormulaData[buildingBlock.id!]!.value"
                    :error-message="buildingBlockFormulaData[buildingBlock.id!]!.error"
                    :label="`${buildingBlock.name}`" />

                <DatePicker v-if="buildingBlock.dataType === DataTypes.DATE"
                    v-model="buildingBlockFormulaData[buildingBlock.id!]!.value"
                    :error-message="buildingBlockFormulaData[buildingBlock.id!]!.error"
                    :label="`${buildingBlock.name}`" />

                <NumberInput v-if="buildingBlock.dataType === DataTypes.INTEGER"
                    v-model="buildingBlockFormulaData[buildingBlock.id!]!.value"
                    :error-message="buildingBlockFormulaData[buildingBlock.id!]!.error" :label="`${buildingBlock.name}`"
                    placeholder="e. g. 30" />



            </div>
        </template>

        <template #action-buttons>
            <ButtonAtom :label="isUpdateMode ? 'Update' : 'Save'" @click="saveTodo" />
            <ButtonAtom label="Cancel" @click="$emit('reset-state')" />
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
import type { Category, ToDo, ToDoCreationDto } from '@/api';
import { ref, computed, watch } from 'vue';
import { type FormField } from '../../composables/models';
import { DataTypes, priorityArray } from '../../composables/hardLoad';
import { toTodoCreationObject } from '@/composables/modelGenerator';

const emit = defineEmits(['reset-state', 'save-todo', 'update-todo']);


const props = defineProps<{
    category: Category
    todo?: ToDo
}>();

const isUpdateMode = computed(() => !!props.todo)

const buildingBlocks = props.category.buildingBlocks


const todoName = ref<FormField>({
    value: "",
    error: ""
})

const isTodoToday = ref<boolean>(false)
const priority = ref<string>("")


const initialData = buildingBlocks!.reduce((accumulator, currentBlock) => {
    accumulator[currentBlock.id!] = { value: "", error: "" };
    return accumulator;
}, {} as Record<number, FormField>);

const buildingBlockFormulaData = ref<Record<number, FormField>>(initialData)

function initializeFormFromTodo(todo: ToDo) {
    todoName.value.value = todo.title ?? ""
    isTodoToday.value = todo.dueToday ?? false
    priority.value = todo.priority || ""

    if (todo.buildingBlockData) {
        for (const blockData of todo.buildingBlockData) {

            const id = blockData.id?.buildingBlockId
            if (id && blockData.dataValue) {
                buildingBlockFormulaData.value[id!]!.value = blockData.dataValue
            }
        }
    }
}

watch(() => props.todo, (newTodo) => {
    if (newTodo) {
        initializeFormFromTodo(newTodo)
    }
}, { immediate: true })


function mappedPriorityArray(): Array<string> {
    return priorityArray.map(item => item.name);
}



function validateForm(): boolean {

    let isValid = true;

    todoName.value.error = ""
    for (const id in buildingBlockFormulaData.value) {
        buildingBlockFormulaData.value[id]!.error = "";
    }

    if (!todoName.value.value.trim()) {
        todoName.value.error = 'A name for the todo is required.';
        isValid = false;
        console.log("Todo Name empty")
    }

    for (const block of buildingBlocks!) {
        const field = buildingBlockFormulaData.value[block.id!];

        if (block.dataType === DataTypes.INTEGER && parseInt(field!.value) < 0) {
            field!.error = `${block.name} must be greater than 0.`;
            isValid = false;
            console.log(block.name + " not a number")
        }

        if (!field!.value.trim()) {
            field!.error = `${block.name} cannot be empty.`;
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
    console.log("Priority: " + priority.value)


    const isFormValid = validateForm();
    if (!isFormValid) {
        return;
    }

    console.log("Form is valid. Saving...");

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

    if (isUpdateMode.value && props.todo?.id) {
        emit("update-todo", props.todo.id, newTodo);
    } else {
        emit("save-todo", newTodo);
    }
}

</script>

<style scoped>
#default-props {
    display: flex;
    justify-content: space-evenly;
}
</style>