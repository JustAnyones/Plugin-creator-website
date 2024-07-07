<script setup lang="ts">
import { defineProps } from 'vue';
import Attribute from "@/components/attributes/Attribute.vue";
import Button from 'primevue/button';
interface Props {
  name: string
  description: string
  errors: Array<string>
}

const props = defineProps<Props>()
defineEmits(['pop', 'raiseError'])
</script>

<template>
  <Attribute
      :name="props.name"
      :description="props.description"
      :errors="props.errors"
      @raise-error="$emit('raiseError')"
  >
    <Button icon="pi pi-times" severity="danger" rounded text @click="(e) => {
      e.preventDefault();
      $emit('pop')
    }" />
    <slot></slot>
  </Attribute>
</template>
