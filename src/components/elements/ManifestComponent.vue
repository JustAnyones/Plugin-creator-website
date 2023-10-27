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
import {Manifest} from "@/core/Manifest";
import {computed, defineProps} from "vue";
import Attribute from "@/components/attributes/Attribute.vue";
import StringInput from "../attributes/inputs/StringInput.vue";

interface Props {
  manifest: Manifest
}

const authorName = computed({
  get() {
    return props.manifest.author.value
  },
  set(value) {
    emit('update:value', value)
    props.manifest.author.value = value;
    localStorage.setItem('authorName', props.manifest.author.value)
  }
})

const props = defineProps<Props>()
const emit = defineEmits(['raiseError', 'update:value'])
</script>

<template>
  <div>
    <Attribute
        :name="props.manifest.id.name"
        :description="props.manifest.id.description"
        :errors="props.manifest.id.errors"
        @raise-error="$emit('raiseError')"
    >
      <StringInput
        :attribute="props.manifest.id"
        :name="props.manifest.id.name"
        v-model:value="props.manifest.id.value"
      />
    </Attribute>

    <Attribute
        :name="props.manifest.version.name"
        :description="props.manifest.version.description"
        :errors="props.manifest.version.errors"
        @raise-error="$emit('raiseError')"
    >
      <input
          type="number"
          class="attribute-input"
          min="1"
          :value="props.manifest.version.value"
          @input="props.manifest.version.value = Number.parseInt($event.target.value)"
      >
    </Attribute>

    <Attribute
        :name="props.manifest.title.name"
        :description="props.manifest.title.description"
        :errors="props.manifest.title.errors"
        @raise-error="$emit('raiseError')"
    >
      <StringInput
        :attribute="props.manifest.title"
        :name="props.manifest.title.name"
        v-model:value="props.manifest.title.value"
      />
    </Attribute>

    <Attribute
        :name="props.manifest.text.name"
        :description="props.manifest.text.description"
        :errors="props.manifest.text.errors"
        @raise-error="$emit('raiseError')"
    >
      <StringInput
        :attribute="props.manifest.text"
        :name="props.manifest.text.name"
        v-model:value="props.manifest.text.value"
      />
    </Attribute>

    <Attribute
        :name="props.manifest.author.name"
        :description="props.manifest.author.description"
        :errors="props.manifest.author.errors"
        @raise-error="$emit('raiseError')"
    >
      <StringInput
        :attribute="props.manifest.author"
        :name="props.manifest.author.name"
        v-model:value="authorName"
      />
    </Attribute>
  </div>
</template>

<style scoped>

</style>