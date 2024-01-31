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

import {Collapse} from 'vue-collapsed'

interface Props {
  title: String,
  removable?: boolean,
  heading?: "h1" | "h2" | "h3" | "h4"
}
const props = defineProps<Props>()

const isCollapsed = ref(true);

defineEmits(['pop'])
</script>

<template>
    <div class="background">
        <div class="compact">
          <component :is="props.heading ?? 'h3'" @click="isCollapsed = !isCollapsed">{{ props.title }}</component>
          <a v-if="props.removable ?? false" class="remove-hyperlink" href="#" @click="(e) => {
            e.preventDefault();
            $emit('pop')
          }">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </a>
        </div>
        <Collapse :when="isCollapsed" class="collapse">
            <slot></slot>
        </Collapse>
    </div>
</template>

<style scoped>
.compact {
  display: flex;
}

a {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1, h2, h3, h4, h5, h6 {
  word-wrap: anywhere;
  margin: 10px 10px 10px 0px;
}

.background {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-right: 5px;
  padding-left: 5px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-right: 10px;
  padding-left: 10px;
}
</style>
