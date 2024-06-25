<script setup lang="ts">
import { defineProps } from 'vue';
import Attribute from "@/components/attributes/Attribute.vue";
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
    <a href="#" class="remove-hyperlink" @click="(e) => {
      e.preventDefault();
      $emit('pop')
    }">
      <font-awesome-icon :icon="['fas', 'trash']" />
    </a>
    <slot></slot>
  </Attribute>
</template>
