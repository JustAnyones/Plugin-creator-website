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
import {defineProps, ref} from 'vue';
import {Draft as DraftObject} from "@/core/drafts/Draft";
import {Collapse} from "vue-collapsed";
import OptionalAttributeSelector from "@/components/elements/OptionalAttributes.vue";
import RequiredAttributes from "@/components/elements/RequiredAttributes.vue";

interface Props {
  draftObject: DraftObject
  index: number
}
const props = defineProps<Props>()

const showDraftContent = ref(true);
const optionalAttributeSelector = ref(null);

defineEmits(['pop'])
</script>

<template>
  <div>
    <!-- Buttons to delete and collapse the draft -->
    <div class="compact">
      <h3 @click="showDraftContent = !showDraftContent">
        {{ props.index + 1 }}.
        {{ props.draftObject.id.value ? props.draftObject.id.value : "No ID specified" }}
        (type: {{ props.draftObject.type.tag }})
      </h3>
      <a class="remove-hyperlink" href="#" @click="(e) => {
        e.preventDefault();
        $emit('pop')
      }">
        <font-awesome-icon :icon="['fas', 'trash']" />
      </a>
    </div>

    <!-- Actual draft element, that can be collapsed -->
    <Collapse :when="showDraftContent" class="collapse">

      <RequiredAttributes
          v-model:object="props.draftObject"
      />

      <OptionalAttributeSelector
          name="Optional attributes"
          description="These are optional attributes you can add to your plugin draft. They are not required, however useful such as adding a title, a description or a price for your building."
          v-model:object="props.draftObject"
      />
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

h3 {
  word-wrap: anywhere;
}
</style>