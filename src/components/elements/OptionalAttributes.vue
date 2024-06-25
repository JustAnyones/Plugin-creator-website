<script setup lang="ts">

import OptionalAttribute from "@/components/attributes/OptionalAttribute.vue";
import Multiselect from "@vueform/multiselect";
import {defineProps, nextTick, Ref, ref} from 'vue';
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


const showDraftContent = ref(true);
const optionalAttributeSelector = ref(null);
const selectedOptionalAttributes: Ref<Array<any>> = ref([]);

async function deselectOptionalAttribute(item) {
  item.attribute.reset()
  await nextTick()
  optionalAttributeSelector.value.deselect(item)
}

// Load optional attributes on initialization of the container
console.log("Initializing OptionalAttributes")
for (const attr of props.object.getOptionalAttributes()) {
  if (!attr.isDefault()) {
    selectedOptionalAttributes.value.push({
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

</script>
<template>
  <h3>Optional attributes</h3>
  <p>{{ props.description }}</p>
  <multiselect
      class="optional-attribute-multiselect"
      ref="optionalAttributeSelector"
      v-model="selectedOptionalAttributes"
      mode="multiple"
      :options="Array.from(props.object.getOptionalAttributes(), (attr) => ({
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
.optional-attribute-multiselect {
  margin-bottom: 20px;
}
</style>