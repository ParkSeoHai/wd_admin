<script setup>
const props = defineProps(["text"]);
</script>
<template>
  <button type="button" class="btn-base">
    <span v-if="props.text">{{ props.text }}</span>
    <slot name="icon"></slot>
  </button>
</template>
