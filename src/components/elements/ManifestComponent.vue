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
import {Manifest} from "@/stuff/Manifest";
import {defineProps} from "vue";
import Attribute from "@/components/attributes/Attribute.vue";
import StringInput from "../attributes/inputs/StringInput.vue";

interface Props {
  manifest: Manifest
}
const props = defineProps<Props>()
</script>

<template>
  <div>
    <Attribute
        :name="props.manifest.id.name"
        :description="props.manifest.id.description"
        :errors="props.manifest.id.errors"
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
    >
      <StringInput
        :attribute="props.manifest.author"
        :name="props.manifest.author.name"
        v-model:value="props.manifest.author.value"
      />
    </Attribute>
  </div>
</template>

<style scoped>

</style>