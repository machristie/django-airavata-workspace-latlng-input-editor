<template>
  <div id="app">
    <div class="container">
      <b-card title="Input Configuration">
        <b-form-group label="Input Name" label-for="input-name">
          <b-form-input id="input-name" type="text" v-model="experimentInput.name"
            :state="nameState"/>
        </b-form-group>
        <b-form-group label="User Friendly Description" label-for="input-user-friendly-description">
          <b-form-input id="input-user-friendly-description" type="text" v-model="experimentInput.userFriendlyDescription"/>
        </b-form-group>
        <b-form-checkbox id="input-required" v-model="experimentInput.isRequired">
          Required?
        </b-form-checkbox>
        <b-form-group label="Metadata" label-for="input-metadata" description="Use 'config' to provide configuration values to the input editor, accessible in the input editor as 'editorConfig'.">
            <b-form-textarea id="input-metadata"
                     v-model="metadataString"
                     :rows="4"
                     :state="metadataState"
                     @input="metadataUpdated"
                     @blur.native="metadataString = formatJSON(metadataString)">
            </b-form-textarea>
        </b-form-group>
      </b-card>
      <b-card title="Input Editor" class="mt-3">
        <b-form-group :label="experimentInput.name" :label-for="experimentInput.name" :state="state">
          <lat-lng-input-editor v-model="experimentInput.value"
            :id="experimentInput.name"
            :experiment="experiment"
            :experiment-input="experimentInput"
            @input="valueChanged"/>
          <ul v-if="feedbackMessages && feedbackMessages.length > 1">
              <li v-for="feedback in feedbackMessages" :key="feedback">{{ feedback }}</li>
          </ul>
          <div v-else-if="feedbackMessages && feedbackMessages.length === 1">
              {{ feedbackMessages[0] }}
          </div>
        </b-form-group>
      </b-card>
      <b-card title="Input Value Preview" class="mt-3">
        <b-form-textarea id="input-value-preview"
                  :value="previewValue"
                  :rows="10"
                  :max-rows="20"
                  :disabled="true">
        </b-form-textarea>
      </b-card>
    </div>
  </div>
</template>

<script>
import LatLngInputEditor from './components/LatLngInputEditor.vue'
import {models} from 'django-airavata-api'

export default {
  name: 'app',
  components: {
    LatLngInputEditor,
  },
  data: function() {
    const experimentInput = new models.InputDataObjectType();
    experimentInput.name = "name1";
    experimentInput.userFriendlyDescription = "Type the value here";
    experimentInput.isRequired = true;
    experimentInput.metaData = {editor: {config:{}}};
    experimentInput.value = "51.505, -0.09";
    return {
      experiment: new models.Experiment(),
      experimentInput: experimentInput,
      state: null,
      feedbackMessages: [],
      metadataString: JSON.stringify(experimentInput.metaData, null, 4),
      previewValue: experimentInput.value,
    }
  },
  computed: {
    metadataState: function() {
      try {
        JSON.parse(this.metadataString);
        return true;
      } catch (e) {
        return false;
      }
    },
    nameState: function() {
      return this.experimentInput.name.trim().length > 0;
    }
  },
  methods: {
    metadataUpdated: function(value) {
      if (this.metadataState) {
        this.experimentInput.metaData = JSON.parse(value);
      }
    },
    formatJSON: function(jsonString) {
      return this.metadataState ? JSON.stringify(JSON.parse(jsonString), null, 4) : jsonString;
    },
    valueChanged: function(value) {
      if (typeof value === 'object' && value instanceof File) {
        if (/^text\//.test(value.type)) {
          const reader = new FileReader();
          reader.addEventListener("loadend", () => this.previewValue = reader.result);
          reader.readAsText(value);
        } else {
          this.previewValue = "No preview exists for files of type " + value.type;
        }
      } else if (typeof value === 'string') {
        this.previewValue = value;
      }
    }
  }
}
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
