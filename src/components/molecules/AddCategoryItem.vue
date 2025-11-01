<template>

    <div id="input-frame">
        <InputFieldAtom :place-holder="hintText" v-model="newCategoryName" />
        <ButtonAtom label="+" @click="emit('add-category', newCategoryName)"
            :disabled="newCategoryName.trim() === ''" />
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

</script>

<style scoped>
#input-frame {
    display: flex;
    justify-content: space-between;
    gap: 30px;
}
</style>