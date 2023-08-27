<script setup lang="ts">
import { defineProps } from 'vue';
import Button from "@/components/elements/Button.vue";
interface Props {
  name: string
  description: string
}

const props = defineProps<Props>()
defineEmits(['pop'])
</script>

<template>
  <div>
    <Button @click="$emit('pop')">Delete</Button>
    <span>{{ props.name }}</span>
    <slot></slot>
    <p>{{ props.description }}</p>
  </div>
</template>

<style scoped>

</style>