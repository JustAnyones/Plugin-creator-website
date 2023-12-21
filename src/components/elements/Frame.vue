<script setup lang="ts">

import {Collapse} from "vue-collapsed";
import {Frame as fra} from "@/core/attribute/FrameAttribute";
import {defineProps, ref} from "vue";
import OptionalAttributeSelector from "@/components/elements/OptionalAttributes.vue";
import RequiredAttributes from "@/components/elements/RequiredAttributes.vue";

interface Props {
  index: Number
  frame: fra
}
const props = defineProps<Props>()

const collapsed = ref(false);

defineEmits(['pop'])
</script>

<template>
  <div class="compact">
    <h3 @click="collapsed = !collapsed">Frame {{props.index}}</h3>
    <a class="remove-hyperlink" href="#" @click="(e) => {
        e.preventDefault();
        $emit('pop')
      }">
      <font-awesome-icon :icon="['fas', 'trash']" />
    </a>
  </div>
  <Collapse :when="!collapsed" class="collapse">

    <RequiredAttributes
        v-model:object="props.frame"
    />

    <OptionalAttributeSelector
        name="Optional attributes"
        description="These are optional attributes that you can add to your frame for aligning the frame or splitting frames."
        v-model:object="props.frame"
    />

  </Collapse>
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
</style>