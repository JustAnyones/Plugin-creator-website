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

import {Ref, ref, UnwrapRef} from "vue";
import Draft from "@/components/Draft.vue";
import Multiselect from '@vueform/multiselect'
import Button from "@/components/elements/Button.vue";
import JSZip from "jszip";
import FileSaver from 'file-saver';
import FileUpload from "primevue/fileupload";

import Documentation from "@/components/panels/DocumentationPanel.vue";
import ManifestC from "@/components/elements/ManifestComponent.vue";


import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

import {Collapse} from 'vue-collapsed'

import {Plugin} from "@/core/Plugin";
import {Types} from "@/core/Types";
import {Draft as DraftItem, DraftFactory} from '@/core/drafts/Draft';
import {PluginFile} from "@/core/PluginFile";


function capitalizeFirstLetter(string: string) {
  let first_letter = string.charAt(0)
  return first_letter.toUpperCase() + string.substring(1)
}
var selected_type = null;

const toast = useToast();


const typeSelector = ref(null);
const showManifest = ref(true);
const showPreviewPanel = ref(NODE_ENV === "development");

function showErrorToast(summary: string, detail: string, life: number = 10000) {
  toast.add({
    severity: 'error',
    summary: summary,
    detail: detail,
    life: life
  })
}

function showWarningToast(summary: string, detail: string, life: number = 10000) {
  toast.add({
    severity: 'warn',
    summary: summary,
    detail: detail,
    life: life
  })
}

function addNewDraft() {
    if (selected_type === null) {
      showErrorToast(
          "No draft type specified",
          "Please specify a draft type before trying to add one."
      )
    } else {
      let draft = DraftItem.fromType(selected_type)
      if (!plugin.value.manifest.author.isEmpty())
        draft.author.value = plugin.value.manifest.author.value

      plugin.value.addDraft(draft);
      typeSelector.value.clear()
    }
}

const plugin: Ref<Plugin> = ref(null);
plugin.value = new Plugin();

function isValid() {

  if (plugin.value.drafts.length === 0) {
    showErrorToast(
        "Cannot export an empty plugin",
        "Before exporting, make sure you have defined at least one draft."
    )
    return false;
  }

  // Validate drafts
  let isValid = true;
  plugin.value.drafts.forEach((draft) => {
    if (!draft.validate()) isValid = false;
  });

  return isValid;
}

function exportToJson() {
  if (!isValid()) return showErrorToast(
      "Could not export JSON",
      "Please ensure all draft attributes are correct."
  );
  FileSaver.saveAs(plugin.value.getJsonBlob(), "code.json")
}

function exportToManifest() {
  if (!plugin.value.isManifestValid()) return showErrorToast(
      "Could not export manifest",
      "Please ensure all manifest attributes are correct."
  );
  FileSaver.saveAs(plugin.value.getManifestBlob(), "plugin.manifest")
}

function createZipArchive(): JSZip {
  const zip = new JSZip();
  zip.file("code.json", plugin.value.getJsonBlob())
  zip.file("plugin.manifest", plugin.value.getManifestBlob())

  Object.keys(plugin.value.fileMapping).forEach(key => {
    zip.file(key, plugin.value.fileMapping[key].raw)
  })
  return zip
}

function exportToZip() {
  if (!isValid() || !plugin.value.isManifestValid()) return showErrorToast(
      "Could not export archive",
      "Please ensure all plugin attributes are correct."
  );

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
  if (!isValid() || !plugin.value.isManifestValid()) return showErrorToast(
      "Could not export plugin file",
      "Please ensure all plugin attributes are correct."
  );

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
    .catch(
        error => showErrorToast(
            "Failed to encrypt your plugin, try again later",
            error
        ));
  });
}

function getFilename(path: string) {
  return path.split("/").pop()
}

async function loadFromZip(event) {

  // TODO: optional attributes do not get shown on UI

  if (event.files.length == 0) {
    return showErrorToast(
        "Project loading failed",
        "Cannot load from a non zip file."
    );
  }

  let archive = new JSZip();
  plugin.value = new Plugin()

  let zip = await archive.loadAsync(event.files[0])

  const codeFile = zip.file("code.json")
  const manifestFile = zip.file("plugin.manifest")

  if (codeFile === null || manifestFile === null) {
    return showErrorToast(
        "Project loading failed",
        "Selected zip is not a PCA project."
    );
  }

  // Load the code.json file
  let codeContent = await codeFile.async("string")
  let jsonObject = JSON.parse(codeContent);

  if (!Array.isArray(jsonObject)) {
    return showErrorToast(
        "Project loading failed",
        "Error loading code: not array"
    );
  }

  jsonObject.forEach((obj) => {
    const draft = new DraftFactory().fromJSON(obj);
    if (draft === null) {
      showWarningToast(
          "Draft loading failed",
          "Unsupported draft type encountered: " + obj["type"] + " for " + obj["id"]
      );
    } else {
      plugin.value.addDraft(draft)
    }
  })

  // Load the manifest
  let manifestContent = await manifestFile.async("string")
  jsonObject = JSON.parse(manifestContent);
  console.log(jsonObject)
  plugin.value.manifest.id.value = jsonObject["id"]
  plugin.value.manifest.version.value = jsonObject["version"]
  plugin.value.manifest.title.value = jsonObject["title"]
  plugin.value.manifest.text.value = jsonObject["text"]
  plugin.value.manifest.author.value = jsonObject["author"]


  for (const fileKey in zip.files) {
    const file = zip.files[fileKey]
    // Ignore PCA files
    const fileName = getFilename(file.name)
    if (fileName === "code.json" || fileName === "plugin.manifest") {
      console.log("Ignoring " + file.name)
      continue
    }

    let data = await file.async("uint8array")
    plugin.value.addFile(
        file.name,
        new PluginFile(file.name, data)
    )
  }

  let alreadyVisited = {}
  for (let i = 0; i < plugin.value.drafts.length; i++) {
    const draft = plugin.value.drafts[i]
    for (const file of draft.getFiles()) {
      if (alreadyVisited[file] !== true) {
        plugin.value.getFile(file).owners--;
        alreadyVisited[file] = true
      }
      plugin.value.addFile(file, null)
    }
  }

  return true;
}

window.addEventListener('unhandledrejection', function(event) {
  alert("Error happened while handling promise: " + JSON.stringify(event.reason))
  console.log(event.reason)
  //handle error here
  //event.promise contains the promise object
  //event.reason contains the reason for the rejection
});


window.onerror = function (msg, url, line, col, error) {
  alert("Unexpected error encountered: " + msg)
  //code to handle or report error goes here
}

</script>

<template>
  <Toast position="bottom-right" />

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
              <ManifestC :manifest="plugin.manifest" @raise-error="showManifest = true"/>
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
              :options="Array.from(Types.getTypes(), (draftType) => draftType.tag)"
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




        <div v-if="plugin.drafts.length > 0" class="drafts">
            <Draft
                :index="index"
                :draftObject="obj"
                v-for="(obj, index) in plugin.drafts"
                class="backdrop"
                @pop="plugin.removeDraftAtIndex(index)"
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
          <p>
            It is recommended to export the zip archive. It will act as a project restoration file
            for future versions of PCA as .plugin files encrypted.
          </p>

          <FileUpload v-if="showPreviewPanel"
              mode="basic"
              accept="application/zip"
              @select="loadFromZip($event)"
          >
          </FileUpload>

          <!-- <Button @click="loadFromZip()">Load from zip</Button> -->
          <Button @click="exportToJson()">Export JSON file</Button>
          <Button @click="exportToManifest()">Export plugin.manifest file</Button>
          <Button @click="exportToZip()">Export as a zip archive</Button>
          <Button @click="exportToEncryptedPlugin()">Export as encrypted .plugin file</Button>
        </div>


      </div>

      <div v-if="showPreviewPanel" class="preview-panel">
        <h2>Files:</h2>
        <pre>{{ plugin.fileMapping }}</pre>
        <h2>Live preview of the generated JSON:</h2>
        <h3>plugin.manifest</h3>
        <pre>{{ plugin.manifest }}</pre>
        <h3>code.json</h3>
        <pre>{{ plugin.drafts }}</pre>
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

