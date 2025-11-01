<template>

    <div id="item" v-if="todo" @click="handleClick" class="clickable-item">
        <ItemLabel :label="getTodoName()" :width-in-percent="35" />
        <ItemLabel :label="getCategoryName()" :width-in-percent="25" />
        <ItemLabel :label="formatDate(todo.createdAt)" :width-in-percent="20" />
        <ItemLabel :label="todo.priority || 'UNKNOWN'" :width-in-percent="10" />
        <div class="checkbox-container" @click.stop>
            <CheckBoxAtom :model-value="todo.dueToday || false" @update:model-value="handleDueTodayToggle"
                label="Today" />
        </div>
        <div>
            <ButtonAtom v-if="showDeleteButton" @click.stop="handleDelete" label="Delete" variant="danger" />
            <ButtonAtom v-else label="done" @click.stop="handleDone" />
        </div>
    </div>

</template>


<script setup lang="ts">
import type { ToDo } from '@/api'
import ButtonAtom from '../atoms/ButtonAtom.vue';
import ItemLabel from '../atoms/ItemLabel.vue';
import CheckBoxAtom from '../atoms/CheckBoxAtom.vue';
import { useTodoStore } from '@/stores/todoStore';

const store = useTodoStore()

const props = defineProps<{
    todo?: ToDo
    showDeleteButton?: boolean
}>()

const emit = defineEmits(['edit-todo', 'complete-todo', 'delete-todo', 'toggle-due-today'])

const handleClick = () => {
    if (props.todo) {
        emit('edit-todo', props.todo)
    }
}

const handleDone = () => {
    if (props.todo) {
        emit('complete-todo', props.todo)
    }
}

const handleDelete = () => {
    if (props.todo) {
        emit('delete-todo', props.todo)
    }
}

const handleDueTodayToggle = (value: boolean) => {
    if (props.todo) {
        emit('toggle-due-today', props.todo, value)
    }
}

const getTodoName = () => {
    if (props.todo?.title) {
        return props.todo.title
    }
    if (props.todo?.buildingBlockData && props.todo.buildingBlockData.length > 0) {
        const firstData = props.todo.buildingBlockData[0]?.dataValue
        if (firstData) {
            return firstData
        }
    }
    return 'Unknown Todo'
}

const getCategoryName = () => {
    return store.getCategoryById(props.todo?.categoryId?.id!)?.name || 'Unknown'
}

const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set'

    try {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    } catch (error) {
        return 'Invalid date'
    }
}
</script>

<style scoped>
#item {
    display: flex;
    background-color: var(--bg-gray-light);
    justify-content: space-between;
    align-items: center;
    padding: var(--padding-md);
    border-radius: var(--border-radius-md);
}

.clickable-item {
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.clickable-item:hover {
    background-color: var(--bg-gray-light-hover);
}

.checkbox-container {
    display: flex;
    align-items: center;
    padding: 0 10px;
    padding-left: 100px;
    padding-right: 100px;
    justify-content: center
}
</style>