<template>
    <b-form-input :id="id" type="text" v-model="data"
        :placeholder="experimentInput.userFriendlyDescription"
        :state="componentValidState"
        @input="valueChanged"/>
    <!-- textarea example: shows how to use editorConfig -->
    <!-- <b-form-textarea :id="id" v-model="data"
        :placeholder="experimentInput.userFriendlyDescription"
        :state="componentValidState"
        :rows="editorConfig.rows"
        @input="valueChanged"/> -->
</template>

<script>
import {InputEditorMixin} from 'django-airavata-workspace-plugin-api'

export default {
    name: 'custom-input-editor',
    mixins: [InputEditorMixin],
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    computed: {
        editorConfig: function() {
            return this.experimentInput.editorConfig;
        }
    }
}
</script>
