<script setup lang="ts">

import AttributeC from "@/components/attributes/Attribute.vue";
import {defineProps, nextTick, Ref, ref} from 'vue';
import StringInput from "@/components/attributes/inputs/StringInput.vue";
import NumberInput from "@/components/attributes/inputs/NumberInput.vue";
import BooleanInput from "@/components/attributes/inputs/BooleanInput.vue";
import LevelInput from "@/components/attributes/inputs/LevelInput.vue";
import FileInput from "@/components/attributes/inputs/FileInput.vue";
import ListInput from "@/components/attributes/inputs/ListInput.vue";
import {HasAttributes} from "@/core/attribute/interfaces/Interfaces";


interface Props {
  object: HasAttributes
}

const props = defineProps<Props>()
const showDraftContent = ref(true);

const Inputs = {
  StringInput,
  NumberInput,
  BooleanInput,
  LevelInput,
  FileInput,
  ListInput
}

</script>

<template>
  <div v-for="(attr, i) in props.object.getRequiredAttributes()">
    <AttributeC
        :name="attr.name"
        :description="attr.description"
        :errors="attr.errors"
        @raise-error="showDraftContent = true"
    >
      <component
          v-model:attribute="props.object.getRequiredAttributes()[i]"
          :is="Inputs[attr.getComponent()]"
      />
    </AttributeC>
  </div>
</template>

<style scoped>

</style>