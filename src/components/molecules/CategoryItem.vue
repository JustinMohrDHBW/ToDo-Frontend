<template>

<div id="item-frame" @click.self="selectItem">
    <p>{{ categoryName }}</p>
    <ButtonAtom label="X" @click="deleteCategory"/>
</div>

</template>

<script setup lang="ts">
import ButtonAtom from '../atoms/ButtonAtom.vue';

const emit = defineEmits(['selectCategory', 'deleteCategory'])

const props = defineProps({
    categoryName: String,
    categoryId: {type: String, required: true}
})

function selectItem(){
    emit('selectCategory', props.categoryId);
}

function deleteCategory() {
    emit('deleteCategory', props.categoryId)
}

</script>

<style scoped>

#item-frame{
    display: flex;
    background-color: var(--bg-gray-medium);
    justify-content: space-between;
    align-items: center;
    border-radius: var(--border-radius-md);
    padding: var(--padding-sm);
    font-size: 0.9rem;
}

#item-frame:hover{
    background-color: var(--bg-gray-medium-hover);
}

</style>