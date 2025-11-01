<template>

    <div id="item" v-if="todo">
        <ItemLabel :label="todo.categoryId?.name || 'Unbekannt'" :width-in-percent="60"/>
        <ItemLabel :label="formatDate(todo.createdAt)" :width-in-percent="10"/>
        <ItemLabel :label="todo.priority || 'MEDIUM'" :width-in-percent="10"/>
        <div>
            <ButtonAtom label="edit"/>
            <ButtonAtom label="done"/>
        </div>
    </div>

</template>


<script setup lang="ts">
import type { ToDo } from '@/api'
import ButtonAtom from '../atoms/ButtonAtom.vue';
import ItemLabel from '../atoms/ItemLabel.vue';

const props = defineProps<{
    todo?: ToDo
}>()

const formatDate = (dateString?: string) => {
    if (!dateString) return 'Noch nicht gesetzt'
    
    try {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    } catch (error) {
        return 'Ungültiges Datum'
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

</style>