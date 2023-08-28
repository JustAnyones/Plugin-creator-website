<script setup lang="ts">
import { defineProps } from 'vue';
import Button from "@/components/elements/Button.vue";
import Attribute from "@/components/attributes/Attribute.vue";
interface Props {
  name: string
  description: string
  errors: Array<string>
}

const props = defineProps<Props>()
defineEmits(['pop'])
</script>

<template>
  <Attribute
      :name="props.name"
      :description="props.description"
      :errors="props.errors"
  >
    <a href="#" class="remove-hyperlink" @click="(e) => {
      e.preventDefault();
      $emit('pop')
    }">
      <font-awesome-icon :icon="['fas', 'trash']" />
    </a>
    <slot></slot>
  </Attribute>
</template>

<style scoped>

</style>