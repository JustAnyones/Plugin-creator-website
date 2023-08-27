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
import {Types, createDraftFromType as cd} from '@/stuff/Testing'
import {Draft as DraftItem} from '@/stuff/drafts/Draft';
import {nextTick, Ref, ref} from "vue";
import Attribute from "@/components/attributes/Attribute.vue";
import StringInput from "@/components/elements/inputs/StringInput.vue";
import NumberInput from "@/components/elements/inputs/NumberInput.vue";
import OptionalAttribute from "@/components/attributes/OptionalAttribute.vue";
import BooleanInput from "@/components/elements/inputs/BooleanInput.vue";
import FrameInput from "@/components/elements/inputs/FrameInput.vue";
import Draft from "@/components/Draft.vue";
import Multiselect from '@vueform/multiselect'
import Button from "@/components/elements/Button.vue";
import LevelInput from "@/components/elements/inputs/LevelInput.vue";
import JSZip from "jszip";
import FileSaver from 'file-saver';


function capitalizeFirstLetter(string: string) {
  let first_letter = string.charAt(0)
  return first_letter.toUpperCase() + string.substring(1)
}
var selected_type = null;

const typeSelector = ref(null);
const optionalAttributeSelector = ref(null);

function createDraftFromType() {
    if (selected_type === null) {
      alert("Please select draft type")
    } else {
      let draft = cd(selected_type as Types);
      data.value.push(draft)
      typeSelector.value.clear()
      d.value.push([])
    }
}


const files: Ref<Array<File>> = ref([]);

const data: Ref<Array<DraftItem>> = ref([]);
const d: Ref<Array<Array<any>>> = ref([]);

const Inputs = {
  StringInput,
  NumberInput,
  BooleanInput,
  FrameInput,
  LevelInput,
}

function removeDraftAtIndex(index: number) {
  data.value.splice(index, 1) // Remove item
  d.value.splice(index, 1)
}


async function deselectOptionalAttribute(selector_index: number, item: Attribute) {
  item.reset()
  await nextTick()
  optionalAttributeSelector.value[selector_index].deselect(item)
}

function validate() {

}

function isValid() {
  return true;
}

function getJsonBlob(): Blob {
  let content = `//File was created by plugin creator website ${window['__APP_VERSION__']}\n`
  content += JSON.stringify(data.value)

  let blob = new Blob([content], {
    type: "text/plain;charset=utf-8"
  });
  return blob;
}

function exportToJson() {
  if (!isValid()) return;
  FileSaver.saveAs(getJsonBlob(), "code.json")
}

function exportToZip() {

  if (!isValid()) return;

  let json = getJsonBlob()

  const zip = new JSZip();
  zip.file("code.json", json)

  data.value.forEach(draft => {
    draft.getFiles().forEach(file => {
      zip.file(file.name, file)
    })
  })

  //for (let i = 0; i < files.value.length; i++) {
  //  zip.file(files.value[i].name, files.value[i])
  //}
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    FileSaver.saveAs(content, 'plugin.zip');
  });
}

</script>

<template>

  <div class="flex-container">

    <div class="documentation">
    </div>

    <div class="generator">


   <!-- <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Vue’s shit
    <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.-->

    <p class="bloody-disclaimer">
      This is a preview version of plugin creator website V4, feature parity and compatibility
      is not assured with the previous versions.
    </p>

    <p>To begin, please select the draft type</p>

    <!-- Type selector for new draft object -->
    <div class="flex-container2">
      <multiselect
          ref="typeSelector"
          v-model="selected_type"
          :options="Array.from(Object.keys(Types), (key) => Types[key])"
          :show-labels="false"
          :searchable="true"
          placeholder="Select draft type"
      >
        <template v-slot:option="{ option }">
          {{ capitalizeFirstLetter(option.label) }}
        </template>
      </multiselect>
      <Button @click="createDraftFromType">Create</Button>
    </div>




    <div class="drafts">
      <Draft v-bind:index="index" @pop="removeDraftAtIndex(index)" v-bind:object="obj" v-for="(obj, index) in data">
        <div v-for="(attr) in obj.getRequiredAttributes()">
          <Attribute v-bind:name="attr.name" v-bind:description="attr.description">
            <component
                v-bind:attribute="attr"
                v-bind:name="attr.id+obj.id.value"
                v-model:value="attr.value"
                :is="Inputs[attr.element]"
                @updateFiles="attr.internalFileList=$event"
            />
          </Attribute>
        </div>

        <h3>Optional attributes</h3>
        <p>These are optional attributes</p>
        <multiselect
            ref="optionalAttributeSelector"
            v-model="d[index]"
            mode="multiple"
            :options="obj.getOptionalAttributes()"
            :object="true"
            :show-labels="false"
            :searchable="true"
            :close-on-select="true"
            placeholder="Select optional attributes"
            :canClear="false"
            trackBy="name"
            @deselect="console.log('deselect', $event);"
        >
          <template v-slot:option="{ option }">
            {{ option.name }}
          </template>
        </multiselect>

        <div :key="item.id" v-for="item in d[index]">
          <OptionalAttribute
              v-bind:name="item.name"
              v-bind:description="item.description"
              @pop="deselectOptionalAttribute(index, item)"
          >
            <component v-bind:attribute="item" v-bind:name="item.id+obj.id.value" v-model:value="item.value" :is="Inputs[item.element]"></component>
          </OptionalAttribute>
        </div>
      </Draft>
    </div>

      <div class="controls">
        <Button @click="exportToJson()">Export JSON file</Button>
        <Button>Export plugin.manifest file</Button>
        <Button @click="exportToZip()">Export as a zip archive</Button>
      </div>

    </div>

    <div class="preview">
      <h2>Live preview of the generated JSON:</h2>
      <pre>
      {{ data }}
    </pre>
    </div>
  </div>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>


.bloody-disclaimer {
  color: red;
}


.flex-container2 {
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: end;
  padding-bottom: 10px;
}

.flex-container {
  display: flex;
  //align-items: center;
  gap: 30px;
  justify-content: space-around;
}
</style>
