<script setup>
const props = defineProps({
  text: { type: String, default: "" },
  loading: { type: Boolean, default: false },
});
</script>
<template>
  <button type="button" class="btn-base">
    <v-progress-circular
      v-if="props.loading"
      :width="3"
      color="#fff"
      style="width: 24px; height: 24px"
      indeterminate
    ></v-progress-circular>
    <span v-if="props.text">{{ props.text }}</span>
    <slot name="icon"></slot>
  </button>
</template>
