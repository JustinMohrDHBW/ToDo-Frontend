<template>
    <div id="dialog-header">
        <h3 id="header-title">{{ title }}</h3>
    </div>
</template>


<script setup lang="ts">

const props = defineProps({
    title: String
})

</script>


<style scoped>
#dialog-header {
    padding: 20px 24px;
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    border-radius: 8px 8px 0 0;
}

#header-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    letter-spacing: -0.01em;
}
</style>