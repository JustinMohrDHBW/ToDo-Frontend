<template>

    <div id="container" :style="{ flexBasis: width + '%', width: width + '%'}">
        <p>{{ props.label }}</p>
    </div>

</template>

<script setup lang="ts">
const props = defineProps<{ label: string; widthInPercent: number }>();
const width = props.widthInPercent;

</script>

<style scoped>

p {
    white-space: normal;
    overflow-wrap: anywhere;
    margin: 0;
    color: #333333;
}

</style>