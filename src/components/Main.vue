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
import {Ref, ref, UnwrapRef} from "vue";
import Draft from "@/components/Draft.vue";
import Multiselect from '@vueform/multiselect'
import Button from "@/components/elements/Button.vue";
import JSZip from "jszip";
import FileSaver from 'file-saver';
import {Manifest} from "@/stuff/Manifest";
import Documentation from "@/components/panels/DocumentationPanel.vue";
import ManifestC from "@/components/elements/ManifestComponent.vue";


import {Collapse} from 'vue-collapsed'
import {createDraftFromType, Types} from "@/stuff/Types";


function capitalizeFirstLetter(string: string) {
  let first_letter = string.charAt(0)
  return first_letter.toUpperCase() + string.substring(1)
}
var selected_type = null;

const typeSelector = ref(null);
const showManifest = ref(true);
const showPreviewPanel = ref(false);

function addNewDraft() {
    if (selected_type === null) {
      alert("Please select draft type")
    } else {
      let draft = createDraftFromType(selected_type as Types);

      if (!manifestObject.value.author.isEmpty())
        draft.author.value = manifestObject.value.author.value
      drafts.value.push(draft)
      typeSelector.value.clear()
    }
}

const manifestObject: Ref<Manifest> = ref(null);
manifestObject.value = new Manifest();
const drafts: Ref<Array<DraftItem>> = ref([]);

function removeDraftAtIndex(index: number) {
  drafts.value.splice(index, 1) // Remove item
}

function isManifestValid(): boolean {
  return manifestObject.value.validate()
}

function isValid() {

  if (drafts.value.length === 0) {
    alert("Cannot export - the are no drafts")
    return false;
  }

  // Validate drafts
  let isValid = true;
  drafts.value.forEach((draft) => {
    if (!draft.validate()) isValid = false;
  });

  return isValid;
}

function getJsonBlob(): Blob {
  // @ts-ignore
  let content = `//File was created by plugin creator website ${__APP_VERSION__}\n`
  content += JSON.stringify(drafts.value, null, 2)

  return new Blob([content], {
    type: "application/json;charset=utf-8"
  });
}

function getManifestBlob(): Blob {
  // @ts-ignore
  let content = `//File was created by plugin creator website ${__APP_VERSION__}\n`
  content += JSON.stringify(manifestObject.value, null, 2)

  return new Blob([content], {
    type: "text/plain;charset=utf-8"
  });
}

function exportToJson() {
  if (!isValid()) return;
  FileSaver.saveAs(getJsonBlob(), "code.json")
}

function exportToManifest() {
  if (!isManifestValid()) return;
  FileSaver.saveAs(getManifestBlob(), "plugin.manifest")
}

function createZipArchive(): JSZip {
  const zip = new JSZip();
  zip.file("code.json", getJsonBlob())
  zip.file("plugin.manifest", getManifestBlob())

  drafts.value.forEach(draft => {
    draft.getFiles().forEach(file => {
      zip.file(file.name, file)
    })
  })
  return zip
}

function exportToZip() {
  if (!isValid() || !isManifestValid()) return;

  createZipArchive().generateAsync({ type: 'blob' }).then(function (content) {
    FileSaver.saveAs(content, 'plugin.zip');
  });
}

// https://stackoverflow.com/a/16245768
function Base64ToBlob(encodedData, contentType='', sliceSize=512) {
  const byteCharacters = atob(encodedData);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, {type: contentType});
}


async function exportToEncryptedPlugin() {
  if (!isValid() || !isManifestValid()) return;

  createZipArchive().generateAsync({type: 'blob'}).then(async function (content) {
    let formData = new FormData();
    formData.append(
        "file",
        content,
        "plugin.zip"
    );

    fetch(
      "https://api.svetikas.lt/v1/theotown/encrypt",
      {
        method: 'POST',
        body: formData,
      }
    )
    .then(response => response.json())
    .then(result => {
      if (!result.success) throw new Error(result.details)
      FileSaver.saveAs(Base64ToBlob(result.data), 'plugin.plugin');

    })
    .catch(error => alert(`An error has occurred while trying to encrypt your plugin: ${error}`));
  });

  

}

</script>

<template>
  <div class="page-container">

    <div class="main-content">
      <div class="documentation-panel">
        <Documentation/>
      </div>

      <div class="generator-panel">
        <h2>Plugin creator</h2>

        <div class="generator-header">

          <div class="backdrop">
            <h3 @click="showManifest = !showManifest">Manifest</h3>
            <Collapse :when="showManifest" class="collapse">
              <p>
                To begin creating your plugin, please create a manifest of the plugin first. Manifest is a file that
                helps TheoTown to identify and manage your plugin through a graphical interface. Your plugin will also
                show up under local plugins list and the plugins toolbar.
              </p>
              <ManifestC :manifest="manifestObject" @raise-error="showManifest = true"/>
            </Collapse>
          </div>







          <p>
            Once you've finished writing the manifest, you can begin adding drafts to your plugin.
          </p>
          <p>
            Draft is a general term used to refer to a plugin object inside the game. What the draft can do
            is defined by the draft type.
          </p>

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
            <Button @click="addNewDraft">Add</Button>
          </div>
        </div>




        <div v-if="drafts.length > 0" class="drafts">
            <Draft
                :index="index"
                :draftObject="obj"
                v-for="(obj, index) in drafts"
                class="backdrop"
                @pop="removeDraftAtIndex(index)"
            />
        </div>




        <div class="controls">
          <p>
            Now you can export your plugin to be loaded into the game. If you just want the JSON
            file that was generated or the manifest, you can download them separately and put
            it all together by yourself.
          </p>
          <p>
            If you want something that you can just load into the game and it just works,
            you can use the export as a zip or as .plugin file. .plugin file in this case
            encrypts the plugin and protects its contents from others.
          </p>
          <Button @click="exportToJson()">Export JSON file</Button>
          <Button @click="exportToManifest()">Export plugin.manifest file</Button>
          <Button @click="exportToZip()">Export as a zip archive</Button>
          <Button @click="exportToEncryptedPlugin()">Export as encrypted .plugin file</Button>
        </div>


      </div>

      <div v-if="showPreviewPanel" class="preview-panel">
        <h2>Live preview of the generated JSON:</h2>
        <h3>plugin.manifest</h3>
        <pre>{{ manifestObject }}</pre>
        <h3>code.json</h3>
        <pre>{{ drafts }}</pre>
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

.backdrop {
  background-color: #f5f5f5;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-right: 10px;
  padding-left: 10px;
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
  /*justify-content: space-between;*/
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

