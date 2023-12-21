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
import {NumberAttribute} from '@/core/attribute/NumberAttribute';
interface Props {
  attribute: NumberAttribute,
}
const props = defineProps<Props>()

let displayedValue = props.attribute.value;
function onInput(event) {
    let inputValue = event.target.value;
    let isInteger = props.attribute.isInteger;
    let parsedValue;

    //console.log("Input changed", inputValue, isInteger)

    if (isInteger) {
      parsedValue = Number.parseInt(inputValue);
    } else {
      displayedValue = inputValue;
      parsedValue = Number.parseFloat(inputValue)
    }


    //console.log("Parsed", parsedValue)

    if (parsedValue !== null && !Number.isNaN(parsedValue)) {

      if (isInteger)
        displayedValue = parsedValue;

      //a = inputValue;
      props.attribute.value = parsedValue
    } else {
      displayedValue = inputValue;
      props.attribute.value = null
    }
  return;
}
</script>

<template>
  <!-- type=text, because type=number trims "1." to "1" when querying value -->
  <input
      type="text"
      class="attribute-input"
      :value="displayedValue"
      @input="onInput($event)"
  />
</template>
