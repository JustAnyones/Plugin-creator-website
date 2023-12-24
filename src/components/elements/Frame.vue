<script setup lang="ts">

import {Collapse} from "vue-collapsed";
import {EmptyFrame, Frame as fra} from "@/core/objects/Frame";
import {defineProps, ref} from "vue";
import OptionalAttributeSelector from "@/components/elements/OptionalAttributes.vue";
import RequiredAttributes from "@/components/elements/RequiredAttributes.vue";

interface Props {
  index: Number
  frame: fra
}
const props = defineProps<Props>()

const collapsed = ref(false);

let name;
if (props.frame instanceof EmptyFrame) {
  name = "(Empty frame)"
}

defineEmits(['pop'])
</script>

<template>
  <div class="background">
    <div class="compact">
      <h4 @click="collapsed = !collapsed">Frame {{props.index}} {{name}}</h4>
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
          v-if="props.frame.getOptionalAttributes().length > 0"
          name="Optional attributes"
          description="These are optional attributes that you can add to your frame for aligning the frame or splitting frames."
          v-model:object="props.frame"
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
h4 {
  margin: 10px
}

.background {
  background-color: #f0f0f0;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-right: 5px;
  padding-left: 5px;
}
</style>