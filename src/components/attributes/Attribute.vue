<script setup lang="ts">
import { defineProps } from 'vue';
interface Props {
  name: string
  description: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="attribute">
    <label>{{ name }}</label>
    <slot></slot>
    <span class="attribute-description">{{ description }}</span>
  </div>
</template>
