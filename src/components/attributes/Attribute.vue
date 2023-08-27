<script setup lang="ts">
import { defineProps } from 'vue';
interface Props {
  name: string
  description: string
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    <span><b>{{ name }}</b></span>
    <slot></slot>
    <p>{{ description }}</p>
  </div>
</template>

<style scoped>

</style>