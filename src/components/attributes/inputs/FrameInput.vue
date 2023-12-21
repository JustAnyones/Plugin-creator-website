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
import {BmpFrame, FrameAttribute} from "@/core/attribute/FrameAttribute";
import Frame from "@/components/elements/Frame.vue";
interface Props {
  attribute: FrameAttribute
}
const props = defineProps<Props>()

function addFrame() {
  props.attribute.addFrame(new BmpFrame(props.attribute.owner))
}

function removeFrame(index: number) {
  props.attribute.removeFrame(index)
}

</script>

<template>
  <button @click="addFrame()">Add frame</button>
  <Frame v-for="(frame, i) in props.attribute.frames" @pop="removeFrame(i)"
         v-bind:index="i"
         v-model:frame="props.attribute.frames[i]">
  </Frame>
</template>
