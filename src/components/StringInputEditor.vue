<template>
    <input-editor-form-group :label="experimentInput.name" :label-for="experimentInput.name"
        :state="validationState" :feedback-messages="validationFeedback">
        Custom StringInputEditor
        <b-form-input :id="experimentInput.name" type="text" v-model="data"
            :placeholder="experimentInput.userFriendlyDescription"
            :state="validationState"
            @input="valueChanged"/>
    </input-editor-form-group>
</template>

<script>
import InputEditorFormGroup from 'django-airavata-workspace-views/static/django_airavata_workspace/js/components/experiment/input-editors/InputEditorFormGroup'
import InputEditorMixin from 'django-airavata-workspace-views/static/django_airavata_workspace/js/components/experiment/input-editors/InputEditorMixin'
// import InputEditorMixin from './InputEditorMixin'

export default {
    name: 'string-input-editor',
    mixins: [InputEditorMixin],
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    components: {
        InputEditorFormGroup,
    },
}
</script>
