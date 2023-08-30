<!--
  - MIT License
  -
  - Copyright (c) 2023 JustAnyone
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  - copies of the Software, and to permit persons to whom the Software is
  - furnished to do so, subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  - IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  - FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  - AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  - LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  - OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  - SOFTWARE.
  -
  -->

<script setup lang="ts">
import {defineProps} from 'vue';
import {NumberAttribute} from '@/stuff/attribute/NumberAttribute';
  interface Props {
    attribute: NumberAttribute,
    name: string
    value: number | null
  }
//$emit('update:value', $event.target.value)
  const props = defineProps<Props>()
  console.log(props.attribute)


  function test(a, val) {
    console.log(typeof val)
    console.log(val.target.value)

    let parsed = Number.parseInt(val.target.value)
    console.log(val.target.value, parsed)
    if (parsed != null) {
      a('update:value', parsed)
    }
  }

</script>

<template>
  <input
      type="number"
      class="attribute-input"
      required
      :min="props.attribute.minValue"
      :max="props.attribute.maxValue"
      :value="props.value"
      @input="test($emit, $event)"
  />
</template>
