<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col">
          <b-form novalidate>
            <b-form-group :label="experimentInput.name" :label-for="experimentInput.name" :state="state">
              <string-input-editor v-model="experimentInput.value"
                :id="experimentInput.name"
                :experiment="experiment"
                :experiment-input="experimentInput"/>
              <ul v-if="feedbackMessages && feedbackMessages.length > 1">
                  <li v-for="feedback in feedbackMessages" :key="feedback">{{ feedback }}</li>
              </ul>
              <div v-else-if="feedbackMessages && feedbackMessages.length === 1">
                  {{ feedbackMessages[0] }}
              </div>
            </b-form-group>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StringInputEditor from './components/StringInputEditor.vue'
import {models} from 'django-airavata-api'

export default {
  name: 'app',
  components: {
    StringInputEditor,
  },
  data: function() {
    const experimentInput = new models.InputDataObjectType();
    experimentInput.name = "name1";
    experimentInput.userFriendlyDescription = "Type the value here";
    experimentInput.isRequired = true;
    experimentInput.metadata = {};
    experimentInput.value = "";
    return {
      experiment: new models.Experiment(),
      experimentInput: experimentInput,
      state: null,
      feedbackMessages: [],
    }
  },
}
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
