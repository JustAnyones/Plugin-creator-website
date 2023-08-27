<script setup lang="ts">
import {defineProps} from 'vue';
import {BooleanAttribute} from '@/stuff/Testing';
  interface Props {
    attribute: BooleanAttribute,
    name: string
    value: boolean
  }
//$emit('update:value', $event.target.value)
  const props = defineProps<Props>()
  console.log(props.attribute)


  function test(a, val, xd) {
    console.log(typeof val)
    console.log(val.target.value)

    a('update:value', val.target.value === "true")
  }

</script>

<template>
  <input
      type="radio"
      :name="props.name"
      value="true"
      @input="test($emit, $event, true)"
  />
  <input
      type="radio"
      :name="props.name"
      value="false"
      @input="test($emit, $event, false)"
      checked
  />
</template>

<style scoped>

</style>