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
import {OptionalFileAttr} from "@/core/attribute/OptionalFileAttr";
import {PluginFile} from "@/core/PluginFile";

interface Props {
  attribute: OptionalFileAttr,
}
const props = defineProps<Props>()

function onSelect(event) {
  const files: FileList  = event.target.files;

  if (props.attribute.multiple) {
    throw new Error("OptionalFileInput does not support multiple files")
  }

  const file = files[0]

  props.attribute.errors = []
  if (!file.name.endsWith(".png")) {
    return props.attribute.addError("File is not a .PNG file")
  }

  if (file.size > 1024*1024*7) {
    return props.attribute.addError("File size exceeds 7 MB")
  }

  file.arrayBuffer().then(buffer => {
    let rawData = new Uint8Array(buffer);

    let pluginFile = new PluginFile(file.name, rawData)

    props.attribute.owner.plugin.addFile(file.name, pluginFile)
    props.attribute.value = file.name
    props.attribute.selected = true
  });
}

function remove() {
  props.attribute.owner.plugin.removeFile(props.attribute.value)
  props.attribute.value = null
  props.attribute.selected = false
}

</script>

<template>
  <label v-if="attribute.value === null">
    <input
        type="file"
        v-bind:multiple="props.attribute.multiple"
        accept="image/png"
        class="attribute-input"
        @input="onSelect($event)"
    >
  </label>

  <div v-else class="compact">
    <p>Selected: {{ props.attribute.value }}</p>
    <a class="remove-hyperlink" href="#" @click="(e) => {
        e.preventDefault();
        remove()
      }">
      <font-awesome-icon :icon="['fas', 'trash']" />
    </a>
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
</style>
