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
import {Draft as DraftItem} from '@/stuff/drafts/Draft';
import {nextTick, Ref, ref, UnwrapRef} from "vue";
import Attribute from "@/components/attributes/Attribute.vue";
import StringInput from "@/components/attributes/inputs/StringInput.vue";
import NumberInput from "@/components/attributes/inputs/NumberInput.vue";
import OptionalAttribute from "@/components/attributes/OptionalAttribute.vue";
import BooleanInput from "@/components/attributes/inputs/BooleanInput.vue";
import FrameInput from "@/components/attributes/inputs/FrameInput.vue";
import Draft from "@/components/Draft.vue";
import Multiselect from '@vueform/multiselect'
import Button from "@/components/elements/Button.vue";
import LevelInput from "@/components/attributes/inputs/LevelInput.vue";
import JSZip from "jszip";
import FileSaver from 'file-saver';
import {Manifest} from "@/stuff/Manifest";
import Documentation from "@/components/panels/DocumentationPanel.vue";
import ManifestC from "@/components/elements/ManifestComponent.vue";



import { Collapse } from 'vue-collapsed'
import {createDraftFromType, Types} from "@/stuff/Types";




function capitalizeFirstLetter(string: string) {
  let first_letter = string.charAt(0)
  return first_letter.toUpperCase() + string.substring(1)
}
var selected_type = null;

const typeSelector = ref(null);
const optionalAttributeSelector = ref(null);

function addNewDraft() {
    if (selected_type === null) {
      alert("Please select draft type")
    } else {
      let draft = createDraftFromType(selected_type as Types);

      if (!manifestObject.value.author.isEmpty())
        draft.author.value = manifestObject.value.author.value
      data.value.push(draft)
      typeSelector.value.clear()
      d.value.push([])
    }
}

const manifestObject: Ref<UnwrapRef<Manifest>> = ref(new Manifest());
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
  item.attribute.reset()
  await nextTick()
  optionalAttributeSelector.value[selector_index].deselect(item)
}

function isManifestValid(): boolean {
  return manifestObject.value.validate()
}

function isValid() {

  if (!isManifestValid()) return false;

  if (data.value.length === 0) {
    alert("Cannot export - the are no drafts")
    return false;
  }

  // Validate drafts
  let isValid = true;
  data.value.forEach((draft) => {
    if (!draft.validate()) isValid = false;
  });

  return isValid;
}

function getJsonBlob(): Blob {
  // @ts-ignore
  let content = `//File was created by plugin creator website ${__APP_VERSION__}\n`
  content += JSON.stringify(data.value, null, 2)

  let blob = new Blob([content], {
    type: "application/json;charset=utf-8"
  });
  return blob;
}

function getManifestBlob(): Blob {
  // @ts-ignore
  let content = `//File was created by plugin creator website ${__APP_VERSION__}\n`
  content += JSON.stringify(manifestObject.value, null, 2)

  let blob = new Blob([content], {
    type: "text/plain;charset=utf-8"
  });
  return blob;
}

function exportToJson() {
  if (!isValid()) return;
  FileSaver.saveAs(getJsonBlob(), "code.json")
}

function exportToManifest() {
  if (!isManifestValid()) return;
  FileSaver.saveAs(getManifestBlob(), "plugin.manifest")
}

function createZipArchive() {
  const zip = new JSZip();
  zip.file("code.json", getJsonBlob())
  zip.file("plugin.manifest", getManifestBlob())

  data.value.forEach(draft => {
    draft.getFiles().forEach(file => {
      zip.file(file.name, file)
    })
  })
  return zip
}

function exportToZip() {
  if (!isValid()) return;

  const zip = createZipArchive();

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    FileSaver.saveAs(content, 'plugin.zip');
  });
}


function exportToEncryptedPlugin() {
  return alert("Feature coming soon")
  if (!isValid()) return;

  const zip = createZipArchive();
}

</script>

<template>
  <div class="page-container">

    <div class="main-content">
      <div class="documentation-panel">
        <Documentation/>
      </div>

      <div class="generator-panel">



        <div class="generator-header">

          <p>To begin creating your plugin, please create a manifest of the plugin first:</p>

          <b></b>
          <Collapse :when="true" class="collapse">
            <ManifestC :manifest="manifestObject"/>
          </Collapse>






          <p>Once you've finished writing the manifest, you can begin adding drafts.</p>

          <!-- Type selector for new draft object -->
          <div class="type-selector">
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
            <Button @click="addNewDraft">Create</Button>
          </div>
        </div>




      <div class="drafts">
        <Draft v-bind:index="index" @pop="removeDraftAtIndex(index)" v-bind:object="obj" v-for="(obj, index) in data">
          <div v-for="(attr) in obj.getRequiredAttributes()">
            <Attribute v-bind:name="attr.name" v-bind:description="attr.description" v-bind:errors="attr.errors">
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
              :options="Array.from(obj.getOptionalAttributes(), (attr) => ({
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

          <div :key="item.attribute.id" v-for="item in d[index]">
            <OptionalAttribute
                v-bind:name="item.attribute.name"
                v-bind:description="item.attribute.description"
                :errors="item.attribute.errors"
                @pop="deselectOptionalAttribute(index, item)"
            >
              <component
                  :attribute="item.attribute"
                  :name="item.attribute.id+obj.id.value"
                  v-model:value="item.attribute.value"
                  :is="Inputs[item.attribute.element]"
              ></component>
            </OptionalAttribute>
          </div>
        </Draft>
      </div>

        <div class="controls">
          <Button @click="exportToJson()">Export JSON file</Button>
          <Button @click="exportToManifest()">Export plugin.manifest file</Button>
          <Button @click="exportToZip()">Export as a zip archive</Button>
          <Button @click="exportToEncryptedPlugin()">Export as encrypted .plugin file</Button>
        </div>

      </div>

      <div class="preview-panel">
        <h2>Live preview of the generated JSON:</h2>
        <h3>plugin.manifest</h3>
        <pre>{{ manifestObject }}</pre>
        <h3>code.json</h3>
        <pre>{{ data }}</pre>
      </div>
    </div>

    <div class="footer">
      &copy; <a href="https://github.com/JustAnyones/Plugin-creator-website">JustAnyone</a> 2023
    </div>
  </div>

</template>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
/*.page-container {
  display: flex;
  align-items: stretch;
}*/

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 99vh;
}

.main-content {
  display: flex;
  flex: 1;
}

.documentation-panel {
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #ccc;
}

.generator-panel {
  flex: 5; /* Adjust the flex ratio for central panel size */
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.generator-header {
  margin-bottom: 20px;
}

.type-selector {
  display: flex;
  align-items: center;
}

.drafts {
  margin-bottom: 20px;
}

.controls {
  display: block;
  justify-content: stretch;
  margin-bottom: 20px;
}

.controls button {
  margin-bottom: 10px;
  margin-right: 10px;
}

.collapse {
  transition: height var(--vc-auto-duration) cubic-bezier(0.3, 0, 0.6, 1);
}

.preview-panel {
  flex: 2;
  background-color: #f5f5f5;
  padding: 20px;
  border-left: 1px solid #ccc;
  overflow-x: auto;
}

.preview-panel pre {

}

.footer {
  margin-top: auto;
  text-align: center;
  background-color: #f5f5f5;
  color: #999;
  padding: 10px 0;
}

@media (max-width: 800px) {
  .page-container {
    flex-direction: column;
  }

  .main-content {
    flex-direction: column;
  }

  .generator-panel {
    flex: 1;
    border-right: none;
    margin-bottom: 20px;
  }

  .documentation-panel,
  .preview-panel {
    border: none;
    padding: 10px;
  }
}
</style>

