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
import {LevelAttribute} from '@/stuff/attribute/LevelAttribute';
interface Props {
  attribute: LevelAttribute,
  name: string
  value: number | null
}
const props = defineProps<Props>()
</script>

<template>
  <label>
    <input
        type="radio"
        :name="props.name"
        :checked="value === 1"
        @input="$emit('update:value', 1)"
    />
    Poor
  </label>

  <label>
    <input
        type="radio"
        :name="props.name"
        :checked="value === 2"
        @input="$emit('update:value', 2)"
    />
    Middle
  </label>

  <label>
    <input
        type="radio"
        :name="props.name"
        :checked="value === 3"
        @input="$emit('update:value', 3)"
    />
    Rich
  </label>
</template>

<style scoped>
input {

}
</style>