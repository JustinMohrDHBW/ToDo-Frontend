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
    emit('selectCategory', props.categoryName);
}

function deleteCategory() {
    emit('deleteCategory', props.categoryId)
}

</script>

<style scoped>

#item-frame{
    display: flex;
    background-color: rgb(186, 186, 186);
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    padding: 5px;
    font-size: 0.9rem;
}

#item-frame:hover{
    background-color: rgb(135, 135, 135);
}

</style>