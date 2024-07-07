<!--
  - MIT License
  -
  - Copyright (c) 2024 JustAnyone
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

import {defineProps, ref} from 'vue';

import Panel from 'primevue/panel';
import Button from 'primevue/button';

interface Props {
  title: String,
  removable?: boolean,
  heading?: "h1" | "h2" | "h3" | "h4"
}
const props = defineProps<Props>()

const isCollapsed = ref(false);

defineEmits(['pop'])
</script>

<template>

  <Panel :collapsed="isCollapsed" toggleable>
    <template #header>
      <div class="compact">
        <component :is="props.heading ?? 'h3'" @click="isCollapsed = !isCollapsed">{{ props.title }}</component>
      </div>
    </template>
    <template #icons>
      <Button v-if="props.removable ?? false" icon="pi pi-times" severity="danger" rounded text @click="(e) => {
        e.preventDefault();
        $emit('pop')
      }" />
    </template>
    <slot></slot>
  </Panel>
</template>

<style scoped>
h1, h2, h3, h4, h5, h6 {
  word-wrap: anywhere;
  margin: 10px 10px 10px 0px;
}
</style>
