<script setup lang="ts">

import OptionalAttribute from "@/components/attributes/OptionalAttribute.vue";
import Multiselect from "@vueform/multiselect";
import {Frame} from "@/core/objects/Frame";
import {Draft} from "@/core/drafts/Draft";
import {defineProps, nextTick, Ref, ref} from 'vue';
import Attribute from "@/components/attributes/Attribute.vue";
import StringInput from "@/components/attributes/inputs/StringInput.vue";
import NumberInput from "@/components/attributes/inputs/NumberInput.vue";
import BooleanInput from "@/components/attributes/inputs/BooleanInput.vue";
import LevelInput from "@/components/attributes/inputs/LevelInput.vue";
import FrameInput from "@/components/attributes/inputs/FrameInput.vue";

interface Props {
  name?: String
  description?: String
  object: Draft | Frame
}

const props = defineProps<Props>()


const showDraftContent = ref(true);
const optionalAttributeSelector = ref(null);
const selectedOptionalAttributes: Ref<Array<any>> = ref([]);

async function deselectOptionalAttribute(item: Attribute) {
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
  FrameInput
}

</script>

<template>
  <h3>{{props.name ?? "Optional attributes"}}</h3>
  <p>{{props.description ?? "These are optional attributes that you can add to your object."}}</p>
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
          :is="Inputs[item.attribute.element]"
      ></component>
    </OptionalAttribute>
  </div>
</template>

<style scoped>
.optional-attribute-multiselect {
  margin-bottom: 20px;
}
</style>