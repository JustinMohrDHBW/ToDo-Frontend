<template>

    <div id="item" v-if="todo" @click="handleClick" class="clickable-item">
        <ItemLabel :label="getTodoName()" :width-in-percent="40"/>
        <ItemLabel :label="getCategoryName()" :width-in-percent="25"/>
        <ItemLabel :label="formatDate(todo.createdAt)" :width-in-percent="10"/>
        <ItemLabel :label="todo.priority || 'MEDIUM'" :width-in-percent="10"/>
        <div>
            <button v-if="showDeleteButton" @click.stop="handleDelete" class="delete-button">delete</button>
            <ButtonAtom v-else label="done" @click.stop="handleDone"/>
        </div>
    </div>

</template>


<script setup lang="ts">
import type { ToDo } from '@/api'
import ButtonAtom from '../atoms/ButtonAtom.vue';
import ItemLabel from '../atoms/ItemLabel.vue';
import { useTodoStore } from '@/stores/todoStore';

const store = useTodoStore()

const props = defineProps<{
    todo?: ToDo
    showDeleteButton?: boolean
}>()

const emit = defineEmits(['edit-todo', 'complete-todo', 'delete-todo'])

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
    background-color: rgb(235, 235, 235);
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
}

.clickable-item {
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.clickable-item:hover {
    background-color: rgb(220, 220, 220);
}

.delete-button {
    padding: 10px 20px;
    background-color: #ef4444;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
}

.delete-button:hover {
    background-color: #dc2626;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.delete-button:active {
    transform: scale(0.96);
}

</style>