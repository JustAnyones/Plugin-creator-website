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
import {StringAttribute} from "@/core/attribute/StringAttribute";
interface Props {
  attribute: StringAttribute,
}

const props = defineProps<Props>()

const long = props.attribute.id === "text"

function onInput(value) {
  props.attribute.value = value
  if (props.attribute.id == "author") {
    localStorage.setItem('authorName', value)
  }
}

</script>

<template>
  <input
      v-if="!long"
      type="text"
      required
      :disabled="props.attribute.readOnly"
      :value="props.attribute.value"
      class="attribute-input"
      @input="onInput($event.target.value)"
  />
  <textarea
      v-if="long"
      required
      :disabled="props.attribute.readOnly"
      :value="props.attribute.value"
      class="attribute-input"
      @input="onInput($event.target.value)"
  />
</template>
