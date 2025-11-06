<template>
    <div id="item" v-if="todo" @click="handleClick" class="clickable-item">
        
        <ItemLabel @click.stop :label="getTodoName()" :weight="1.5" />
        <ItemLabel :label="getCategoryName()" :weight="1.5" />
        <ItemLabel 
            :label="formatDate( findBuildingblockById(todo.buildingBlockData, buildingBlockDeadlineId) )" 
            :weight="1" 
            style="text-align: center;"
        />
        <ItemLabel 
            style="text-align: center;"
            :label="todo.priority || 'UNKNOWN'"
            :weight="1" />

        <div class="col-flex-equal checkbox-container"> 
            <CheckBoxAtom :model-value="todo.dueToday || false" @update:model-value="handleDueTodayToggle"
                label="Today" @click.stop/>
        </div>

        <div style="flex-grow: 1.3;" class="col-flex-equal">
            <ButtonAtom  style="width: 50%;" :label="(showDeleteButton)? 'undo':'done'" @click.stop="(showDeleteButton) ? handleUndo() : handleDone()" />
            <ButtonAtom style="width: 50%;" v-if="showDeleteButton" @click.stop="handleDelete" label="Delete" variant="danger" />
        </div>
    </div>
</template>


<script setup lang="ts">
import type { ToDo, ToDoBuildingBlockDataLink } from '@/api'
import ButtonAtom from '../atoms/ButtonAtom.vue';
import ItemLabel from '../atoms/ItemLabel.vue';
import CheckBoxAtom from '../atoms/CheckBoxAtom.vue';
import { useTodoStore } from '@/stores/todoStore';
import { buildingBlockDeadlineId } from '@/composables/hardLoad';

const store = useTodoStore()

const props = defineProps<{
    todo?: ToDo
    showDeleteButton?: boolean
}>()

const emit = defineEmits(['edit-todo', 'complete-todo', 'delete-todo', 'toggle-due-today', 'uncomplete-todo'])

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

const handleUndo = () => {
    if (props.todo) {
        emit('uncomplete-todo', props.todo)
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

function findBuildingblockById(buildingBlock: ToDoBuildingBlockDataLink[] | undefined, id: number): string {

    if (buildingBlock === undefined) {
        return ""
    }

    const value = buildingBlock.find(
        (block) => block.id?.buildingBlockId === id
    )?.dataValue || ""

    console.log(value)
    return value
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
    if (!dateString) {
        return 'Not set'
    }

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
    min-width: 0; 
    gap: 20px;
}

.clickable-item {
    cursor: pointer;
    transition: background-color 0.2s ease;
}

#item.clickable-item:hover {
    background-color: var(--bg-gray-light-hover);
}

.col-flex-equal {
    flex-grow: 1;
    flex-basis: 0;
    flex-shrink: 0;
    min-width: 0;
    display: flex;
    justify-content: center;
    align-items: center; 
    overflow: hidden;
    text-overflow: ellipsis;
    gap: 10px;
}

.checkbox-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    padding-left: 0; 
    padding-right: 0;
}
</style>