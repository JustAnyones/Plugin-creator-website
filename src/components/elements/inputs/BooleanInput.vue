<script setup lang="ts">
import {defineProps} from 'vue';
import {BooleanAttribute} from '@/stuff/attribute/BooleanAttribute';
interface Props {
  attribute: BooleanAttribute,
  name: string
  value: boolean | null,

  labelTrue?: string
  labelFalse?: string
}
const props = defineProps<Props>()
</script>

<template>
  <div class="attribute-input">
    <label>
      <input
        type="radio"
        :name="props.name"
        :checked="value === true"
        @input="$emit('update:value', true)"
      />
      {{ labelTrue || "True" }}
    </label>

    <label>
      <input
        type="radio"
        :name="props.name"
        :checked="value === false"
        @input="$emit('update:value', false)"
      />
      {{ labelFalse || "False" }}
    </label>
  </div>
</template>

<style scoped>

</style>