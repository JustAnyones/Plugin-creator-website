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
import RequiredAttributes from "@/components/elements/RequiredAttributes.vue";
import OptionalAttributes from "@/components/elements/OptionalAttributes.vue";

import {defineProps} from 'vue';
import { AttributeOwner } from "@/core/plugin/AttributeOwner";

interface Props {
  attributeOwner: AttributeOwner
}
const props = defineProps<Props>()


defineEmits(['pop'])
</script>

<template>
  <RequiredAttributes
      v-model:object="props.attributeOwner"
  />
  <OptionalAttributes
      v-if="props.attributeOwner.getOptionalAttributes().length > 0"
      :description="props.attributeOwner.getOptionalAttributeDescription()"
      v-model:object="props.attributeOwner"
  />
</template>
