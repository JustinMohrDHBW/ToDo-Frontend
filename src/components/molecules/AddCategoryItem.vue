<template>

<div id="input-frame">
    <InputFieldAtom :place-holder="hintText" v-model="newCategoryName"/>
    <ButtonAtom 
    label="+"
    @click="addCategoryItem"
    :disabled="newCategoryName.trim() === ''"/>
</div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputFieldAtom from '../atoms/InputFieldAtom.vue';
import ButtonAtom from '../atoms/ButtonAtom.vue';

const emit = defineEmits(['add-category']);

const newCategoryName = ref('');

const props = defineProps({
    hintText: String
})

function addCategoryItem() {

  emit('add-category', newCategoryName.value);

}

</script>

<style scoped>

#input-frame{
    display: flex;
    justify-content: space-between;
    gap: 30px;
}

</style>