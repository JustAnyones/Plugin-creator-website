<script setup lang="ts">

import FrameInput from "@/components/attributes/inputs/FrameInput.vue";
import Attribute from "@/components/attributes/Attribute.vue";
import {Draft} from "@/core/drafts/Draft";
import {Frame} from "@/core/attribute/FrameAttribute";
import {defineProps, nextTick, Ref, ref} from 'vue';
import StringInput from "@/components/attributes/inputs/StringInput.vue";
import NumberInput from "@/components/attributes/inputs/NumberInput.vue";
import BooleanInput from "@/components/attributes/inputs/BooleanInput.vue";
import LevelInput from "@/components/attributes/inputs/LevelInput.vue";
import OptionalFileInput from "@/components/attributes/inputs/OptionalFileInput.vue";


interface Props {
  name?: String
  description?: String
  object: Draft | Frame
}

const props = defineProps<Props>()
const showDraftContent = ref(true);

const Inputs = {
  StringInput,
  NumberInput,
  BooleanInput,
  LevelInput,
  FrameInput,
  OptionalFileInput
}

</script>

<template>
  <div v-for="(attr, i) in props.object.getRequiredAttributes()">
    <Attribute
        :name="attr.name"
        :description="attr.description"
        :errors="attr.errors"
        @raise-error="showDraftContent = true"
    >
      <component
          v-model:attribute="props.object.getRequiredAttributes()[i]"
          :is="Inputs[attr.element]"
      />
    </Attribute>
  </div>
</template>

<style scoped>

</style>