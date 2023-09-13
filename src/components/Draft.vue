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
import {defineProps, nextTick, Ref, ref} from 'vue';
import {Draft as DraftObject} from "@/stuff/drafts/Draft";
import Attribute from "@/components/attributes/Attribute.vue";
import StringInput from "@/components/attributes/inputs/StringInput.vue";
import NumberInput from "@/components/attributes/inputs/NumberInput.vue";
import BooleanInput from "@/components/attributes/inputs/BooleanInput.vue";
import FrameInput from "@/components/attributes/inputs/FrameInput.vue";
import LevelInput from "@/components/attributes/inputs/LevelInput.vue";
import Multiselect from "@vueform/multiselect";
import OptionalAttribute from "@/components/attributes/OptionalAttribute.vue";
import {Collapse} from "vue-collapsed";

interface Props {
  draftObject: DraftObject
  index: number
}
const props = defineProps<Props>()

const Inputs = {
  StringInput,
  NumberInput,
  BooleanInput,
  FrameInput,
  LevelInput,
}

const showDraftContent = ref(true);
const optionalAttributeSelector = ref(null);
const selectedOptionalAttributes: Ref<Array<any>> = ref([]);

async function deselectOptionalAttribute(item: Attribute) {
  item.attribute.reset()
  await nextTick()
  optionalAttributeSelector.value.deselect(item)
}

defineEmits(['pop'])
</script>

<template>
  <div class="draft">
    <!-- Buttons to delete and collapse the draft -->
    <div class="compact">
      <h2 @click="showDraftContent = !showDraftContent">
        {{props.index + 1}}. ({{props.draftObject.type}})
      </h2>
      <a class="remove-hyperlink" href="#" @click="(e) => {
        e.preventDefault();
        $emit('pop')
      }">
        <font-awesome-icon :icon="['fas', 'trash']" />
      </a>
    </div>

    <!-- Actual draft element, that can be collapsed -->
    <Collapse :when="showDraftContent" class="collapse">

      <!-- The required attributes -->
      <div v-for="(attr) in props.draftObject.getRequiredAttributes()">
        <Attribute
            :name="attr.name"
            :description="attr.description"
            :errors="attr.errors"
        >
          <component
              v-bind:attribute="attr"
              v-bind:name="attr.id+props.draftObject.id.value"
              v-model:value="attr.value"
              :is="Inputs[attr.element]"
              @updateFiles="attr.internalFileList=$event"
          />
        </Attribute>
      </div>


      <!-- The optional attribute selector -->
      <h3>Optional attributes</h3>
      <p>These are optional attributes</p>
      <multiselect
          class="optional-attribute-multiselect"
          ref="optionalAttributeSelector"
          v-model="selectedOptionalAttributes"
          mode="multiple"
          :options="Array.from(props.draftObject.getOptionalAttributes(), (attr) => ({
            value: attr.name, label: attr.name, attribute: attr
          }))"
          :object="true"
          :show-labels="false"
          :searchable="true"
          :close-on-select="true"
          placeholder="Select optional attributes"
          :canClear="false"
      >
        <template v-slot:option="{ option }">
          {{ option.label }}
        </template>
      </multiselect>

      <!-- Actually list all the optional attributes -->
      <div :key="item.attribute.id" v-for="item in selectedOptionalAttributes">
        <OptionalAttribute
            :name="item.attribute.name"
            :description="item.attribute.description"
            :errors="item.attribute.errors"
            @pop="deselectOptionalAttribute(item)"
        >
          <component
              :attribute="item.attribute"
              :name="item.attribute.id+draftObject.id.value"
              v-model:value="item.attribute.value"
              :is="Inputs[item.attribute.element]"
          ></component>
        </OptionalAttribute>
      </div>
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

.draft {
  background-color: #f5f5f5;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}

.optional-attribute-multiselect {
  margin-bottom: 20px;
}

</style>