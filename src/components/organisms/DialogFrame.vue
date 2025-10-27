<template>

<div id="dialog-overlay" @click="closeDialog">
    <div id="dialog-frame" @click.stop>
        <div id="dialog-content">
            <DialogHeader :title="props.dialogTitle"/>
            <p v-if="info">{{ info }}</p>
        </div>

        <slot name="content"></slot>

        <div id="button-div">
            <slot name="action-buttons"></slot>
        </div>

    </div>
</div>

</template>

<script setup lang="ts">
import DialogHeader from '../atoms/DialogHeader.vue';

const props = defineProps({
    dialogTitle: String,
    info: {required: false, type: String}
})

const emit = defineEmits(['closeDialog'])


function closeDialog(){
    console.log('click');
    emit('closeDialog')
}

</script>

<style scoped>


#dialog-overlay {

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

#dialog-frame {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 400px;
  max-width: 25vw;
  max-height: 80vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  overflow: auto;
}

#dialog-content{
    display: flex;
    flex-direction: column;
}

#button-div{
    display: flex;
    justify-content: space-evenly;    
}

</style>