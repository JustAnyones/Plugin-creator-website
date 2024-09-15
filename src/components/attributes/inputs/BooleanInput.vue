<script setup lang="ts">
import {defineProps} from 'vue';
import {BooleanAttribute} from '@/core/attribute/BooleanAttribute';
interface Props {
  attribute: BooleanAttribute,
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
        :disabled="props.attribute.readOnly"
        :checked="props.attribute.value === true"
        @input="props.attribute.value = true"
      />
      {{ labelTrue || "True" }}
    </label>

    <label>
      <input
        type="radio"
        :disabled="props.attribute.readOnly"
        :checked="props.attribute.value === false"
        @input="props.attribute.value = false"
      />
      {{ labelFalse || "False" }}
    </label>
  </div>
</template>
