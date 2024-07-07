<script setup lang="ts">

import OptionalAttribute from "@/components/attributes/OptionalAttribute.vue";
import MultiSelect from 'primevue/multiselect';
import {defineProps, nextTick, Ref, ref, watch} from 'vue';
import StringInput from "@/components/attributes/inputs/StringInput.vue";
import NumberInput from "@/components/attributes/inputs/NumberInput.vue";
import BooleanInput from "@/components/attributes/inputs/BooleanInput.vue";
import LevelInput from "@/components/attributes/inputs/LevelInput.vue";
import FileInput from "@/components/attributes/inputs/FileInput.vue";
import ListInput from "@/components/attributes/inputs/ListInput.vue";
import { AttributeOwner } from "@/core/plugin/AttributeOwner";
import FactoryInput from "../attributes/inputs/FactoryInput.vue";

interface Props {
  description: String
  object: AttributeOwner
}

const props = defineProps<Props>()


const availableAttributes = Array.from(props.object.getOptionalAttributes(), (attr) => ({
  value: attr.name, label: attr.name, attribute: attr
}));

const showDraftContent = ref(true);
const selectedAttributes: Ref<Array<any>> = ref([]);

function deselectAttribute(index: number) {
  selectedAttributes.value[index].attribute.reset()
  selectedAttributes.value.splice(index, 1);
}

// Load optional attributes on initialization of the container
console.log("Initializing OptionalAttributes")
for (const attr of props.object.getOptionalAttributes()) {
  if (!attr.isDefault()) {
    selectedAttributes.value.push({
      value: attr.name, label: attr.name, attribute: attr
    })
  }
}

const Inputs = {
  StringInput,
  NumberInput,
  BooleanInput,
  LevelInput,
  FileInput,
  ListInput,
  FactoryInput
}

// We need to scan the list to find if anything was removed and reset it
watch(() => selectedAttributes.value, async (newObj, oldObj) => {
  for (let i = 0; i < oldObj.length; i++) {
    let found = false;
    for (let j = 0; j < newObj.length; j++) {
      if (oldObj[i].attribute === newObj[j].attribute) {
        found = true
        break
      }
    }

    if (!found) {
      oldObj[i].attribute.reset()
    }
  }
})

</script>
<template>
  <h3>Optional attributes</h3>
  <p>{{ props.description }}</p>

  <MultiSelect
    v-model="selectedAttributes"
    :options="availableAttributes"
    filter
    optionLabel="label"
    placeholder="Select optional attributes"
    style="width: 100%"
    :virtualScrollerOptions="{ itemSize: 50 }"
  >
    <template #option="slotProps">
      <div class="flex items-center">
        <div>{{ slotProps.option.label }}</div>
      </div>
    </template>
    <template #value>
      <div v-if="selectedAttributes.length > 0">{{ selectedAttributes.length }} attributes selected</div>
    </template>
  </MultiSelect>

  <!-- Actually list all the optional attributes -->
  <div :key="item.attribute.id" v-for="(item, index) in selectedAttributes">
    <OptionalAttribute
        :name="item.attribute.name"
        :description="item.attribute.description"
        :errors="item.attribute.errors"
        @pop="deselectAttribute(index)"
        @raise-error="showDraftContent = true"
    >
      <component
          v-model:attribute="item.attribute"
          :is="Inputs[item.attribute.getComponent()]"
      ></component>
    </OptionalAttribute>
  </div>
</template>

<style scoped>
h1, h2, h3, h4, h5, h6 {
  word-wrap: anywhere;
  margin: 10px 10px 10px 0px;
}
</style>